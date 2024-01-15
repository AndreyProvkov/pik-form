import type { GetValidator } from "./index";

const EMAIL_PATTERN_RFC2822 =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const emailValidator: GetValidator<string, string> = (
  message = "некорректный email"
) => {
  return (value) => (EMAIL_PATTERN_RFC2822.test(value) ? null : message);
};

export { emailValidator };
