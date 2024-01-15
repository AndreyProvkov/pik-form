// TODO можно сделать валидатор асинхронным
type ValidationResult = string | null;
type Validator<T> = (params: T) => ValidationResult;
type GetValidator<Options, Params> = (options?: Options) => Validator<Params>;

const validate = <T>(
  value: T,
  validators: Validator<T>[]
): ValidationResult => {
  let validationResult: ValidationResult = null;

  for (let i = 0; i < validators.length && validationResult === null; i++) {
    validationResult = validators[i](value);
  }

  return validationResult;
};

export { requiredValidator } from "./requiredValidator";
export { emailValidator } from "./emailValidator";
export { dateValidator } from "./dateValidator";

export type { ValidationResult, Validator, GetValidator };
export { validate };
