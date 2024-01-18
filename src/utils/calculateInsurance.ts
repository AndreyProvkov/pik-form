const calculateInsurance = (value: string | number): number => {
  let result = 0;
  let unmaskedValue;
  const priceThreshold = 45000;

  if (typeof value === "string") {
    unmaskedValue = +value.replace(/\s/g, "");
  } else {
    unmaskedValue = value;
  }

  if (unmaskedValue >= priceThreshold) {
    result =
      Math.floor(
        (654 + (unmaskedValue * 1.5 * 0.05) / 11 + unmaskedValue * 0.0097) / 10
      ) * 10;
  } else {
    result =
      Math.ceil(
        (454 + (unmaskedValue * 1.5 * 0.05) / 11 + unmaskedValue * 0.0097) / 10
      ) * 10;
  }

  return result;
};

export { calculateInsurance };
