import type { GetValidator } from "./index";

const requiredValidator: GetValidator<string, string | File | undefined> = (
  message = "обязательное поле"
) => {
  return (value) => (value ? null : message);
};

export { requiredValidator };
