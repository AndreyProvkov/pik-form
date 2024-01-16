import { Validator } from "../utils/validators";
import { TYPE_INPUT_DEFAULT } from "./InputDefault";

type TYPE_INPUT_DATA = {
  [key: string]: {
    value: string;
    validators: Validator<string>[];
  };
} & TYPE_INPUT_DEFAULT;

export type { TYPE_INPUT_DATA };
