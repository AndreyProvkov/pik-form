import type { GetValidator } from "./index";

type Options = {
  minPrice: number;
  message: string;
};

const minPriceValidator: GetValidator<Options, string> = (
  options = {
    minPrice: 0,
    message: ``,
  }
) => {
  return (value) => {
    const unmaskedValue = value.replace(/\s/g, "");
    const valueAsNumber = +unmaskedValue;

    return options.minPrice <= valueAsNumber ? null : options.message;
  };
};

export { minPriceValidator };
