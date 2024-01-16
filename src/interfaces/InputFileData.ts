import { Validator } from "../utils/validators";
import { TYPE_INPUT_DEFAULT } from "./InputDefault";

type TYPE_INPUT_FILE_DATA = {
  [key: string]: {
    value: File | undefined;
    validators: Validator<File | undefined>[];
  };
} & TYPE_INPUT_DEFAULT;

export type { TYPE_INPUT_FILE_DATA };
