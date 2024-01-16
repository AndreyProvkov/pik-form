import { getAgeByDate } from "../getAgeByDate";
import type { GetValidator } from "./index";

type Options = {
  birthdayDate: string;
  message: string;
};

const passportEditionDateValidator: GetValidator<Options, string> = (
  options = {
    birthdayDate: "",
    message: "неверная дата выдачи",
  }
) => {
  return (value) => {
    const inputDateInMs = new Date(value).getTime();

    if (inputDateInMs >= Date.now()) {
      return options.message;
    }
    if (!value || !options.birthdayDate) {
      return null;
    }

    return getAgeByDate(options.birthdayDate) - getAgeByDate(value) >= 14
      ? null
      : options.message;
  };
};

export { passportEditionDateValidator };
