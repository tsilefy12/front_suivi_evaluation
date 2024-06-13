export default function formatMontant(nb: number) {
  let n: number | string = nb;
  n = n
    .toLocaleString("en-EN", {
      style: "currency",
      currency: "USD",
      currencyDisplay: "symbol",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })
    .replace("$", "")
    .replaceAll(",", " ")
    .replace(".", ",");

  return n;
}
