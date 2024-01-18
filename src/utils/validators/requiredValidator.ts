import type { GetValidator } from "./index";

const requiredValidator: GetValidator<
  string,
  string | File | File[] | undefined
> = (message = "обязательное поле") => {
  return (value) => {
    if (Array.isArray(value)) {
      if (value.length) {
        return null;
      } else {
        return message;
      }
    }

    return value ? null : message;
  };
};

export { requiredValidator };
