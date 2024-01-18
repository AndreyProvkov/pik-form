import { Validator } from "../utils/validators";
import { TYPE_INPUT_DEFAULT } from "./InputDefault";

type TYPE_INPUT_FILES_DATA = {
  [key: string]: {
    value: File[];
    validators: Validator<File[]>[];
  };
} & TYPE_INPUT_DEFAULT;

export type { TYPE_INPUT_FILES_DATA };
