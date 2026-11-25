const app = require("./app.json");

const demoApk = process.env.ROUTELY_DEMO_APK === "1";

module.exports = {
  ...app.expo,
  name: demoApk ? "Routely Demo" : app.expo.name,
  scheme: demoApk ? "routely-demo" : app.expo.scheme,
  android: { ...app.expo.android, package: demoApk ? "com.routely.demo" : "com.routely.entry" },
  extra: { ...app.expo.extra, demoApk },
};
