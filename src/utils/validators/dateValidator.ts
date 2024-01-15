import { getAgeByDate } from "../getAgeByDate";
import type { GetValidator } from "./index";

type Options = {
  age: number;
  message: string;
};

const dateValidator: GetValidator<Options, string> = (
  options = {
    age: 18,
    message: "нельзя подписать договор, если вам меньше 18 лет",
  }
) => {
  return (value) =>
    getAgeByDate(value) >= options.age ? null : options.message;
};

export { dateValidator };
