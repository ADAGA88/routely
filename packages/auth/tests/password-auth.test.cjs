const assert = require("node:assert/strict");
const { test } = require("node:test");
const { PasswordAuthError, signInWithPassword } = require("../dist/index.js");

function client(response) {
  return { auth: { signInWithPassword: async () => response } };
}

test("password login requires a real provider session", async () => {
  await signInWithPassword(
    client({ data: { session: {} }, error: null }),
    { email: "rider@example.com" },
    "password",
  );
  await assert.rejects(
    signInWithPassword(
      client({ data: { session: null }, error: null }),
      { email: "rider@example.com" },
      "password",
    ),
    (error) => error instanceof PasswordAuthError && error.kind === "unknown",
  );
});

test("invalid inputs do not call the provider", async () => {
  const unused = {
    auth: {
      signInWithPassword: () => {
        throw new Error("unexpected call");
      },
    },
  };
  await assert.rejects(
    signInWithPassword(unused, { phone: "123" }, "password"),
    (error) => error instanceof PasswordAuthError && error.kind === "invalid_input",
  );
  await assert.rejects(
    signInWithPassword(unused, { email: "bad-email" }, "password"),
    (error) => error instanceof PasswordAuthError && error.kind === "invalid_input",
  );
});

test("provider credential errors do not reveal account existence", async () => {
  const messages = await Promise.all(
    ["User not found", "Wrong password"].map(async (message) => {
      try {
        await signInWithPassword(
          client({ data: {}, error: { status: 400, message } }),
          { email: "rider@example.com" },
          "password",
        );
      } catch (error) {
        assert.equal(error.kind, "credentials");
        return error.message;
      }
      assert.fail("Expected sign-in to fail");
    }),
  );
  assert.equal(messages[0], messages[1]);
});

test("network and rate-limit failures are surfaced separately", async () => {
  await assert.rejects(
    signInWithPassword(
      client({ data: {}, error: { status: 429 } }),
      { email: "rider@example.com" },
      "password",
    ),
    (error) => error instanceof PasswordAuthError && error.kind === "rate_limit",
  );
  await assert.rejects(
    signInWithPassword(
      {
        auth: {
          signInWithPassword: async () => {
            throw new TypeError("fetch failed");
          },
        },
      },
      { email: "rider@example.com" },
      "password",
    ),
    (error) => error instanceof PasswordAuthError && error.kind === "network",
  );
});
