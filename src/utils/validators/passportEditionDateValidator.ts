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
    if (!value || !options.birthdayDate) {
      return null;
    }
    const inputDateInMs = new Date(value).getTime();
    return getAgeByDate(options.birthdayDate) - getAgeByDate(value) >= 14 &&
      inputDateInMs <= Date.now()
      ? null
      : options.message;
  };
};

export { passportEditionDateValidator };
