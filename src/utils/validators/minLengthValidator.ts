import type { GetValidator } from "./index";

type Options = {
  length: number;
  message: string;
};

const MIN_LENGTH = 1;

const minLengthValidator: GetValidator<Options, string> = (
  options = {
    length: MIN_LENGTH,
    message: `Символов не должно быть меньше ${MIN_LENGTH}`,
  }
) => {
  return (value) => {
    return value.length >= options.length ? null : options.message;
  };
};

export { minLengthValidator };
