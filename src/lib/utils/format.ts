export function formatInr(amount?: number | null) {
  if (amount == null || Number.isNaN(amount)) {
    return "—";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatJobType(type?: string) {
  if (!type) return "—";
  return type.charAt(0).toUpperCase() + type.slice(1);
}
