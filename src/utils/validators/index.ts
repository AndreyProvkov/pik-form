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
    console.log(validationResult);
  }

  return validationResult;
};

export { required } from "./required";

export type { ValidationResult, Validator, GetValidator };
export { validate };
