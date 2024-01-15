import type { GetValidator } from "./index";

const required: GetValidator<string, string | File | undefined> = (
  message = "обязательное поле"
) => {
  return (value) => (value ? null : message);
};

export { required };
