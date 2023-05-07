const convertCurrency = () => {};

const getSign = (currency: string) => {
  if (currency === "USD") return "$";
  if (currency === "ILS") return "₪";
  if (currency === "EUR") return "€";
};

export {convertCurrency, getSign};
