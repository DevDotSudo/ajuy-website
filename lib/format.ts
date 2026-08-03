export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-PH").format(value);
}

export function formatPhone(value: string) {
  return value;
}
