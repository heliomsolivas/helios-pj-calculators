export function convertMoneyMaskToNumber(maskedMoney) {
  if (typeof maskedMoney === "string") {
    const thousandFixed = maskedMoney
      .replace(/(R\$)/g, "")
      .trim()
      .replace(/(.+)[.,](\d+)$/g, "$1x$2")
      .replace(/[.,]/g, "")
      .replace("x", ".");
    return parseFloat(thousandFixed);
  }
}
