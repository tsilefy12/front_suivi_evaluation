export default function formatMontant(nb: number) {
  // if (!comptaFile.currency) return nb.toLocaleString();
  //   let n: number | string = nb > 0 ? nb : nb * -1;
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
