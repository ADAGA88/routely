export const examplePricing = {
  minimum: 1500,
  suggested: 2000,
  maximum: 3000,
} as const;

export function isExamplePriceInRange(value: string): boolean {
  return (
    /^[1-9]\d{0,8}$/.test(value) &&
    Number(value) >= examplePricing.minimum &&
    Number(value) <= examplePricing.maximum
  );
}

export function formatExamplePrice(value: number): string {
  return `₦${value.toLocaleString("en-NG")}`;
}
