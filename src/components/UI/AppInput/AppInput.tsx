import InputMask from "react-input-mask";
import classNames from "classnames";
import style from "./AppInput.module.scss";
import type { ValidationResult } from "../../../utils/validators";

// TODO Вынести в отдельный компонент input type=date

type AppInputProps = {
  title?: string;
  description?: string;
  warningText: ValidationResult;
  placeholder?: string;
  inputText?: string;
  type?: "text" | "date";
  name: string;
  value: string;
  mask?: string | RegExp[];
  maskChar?: string;
  customWrapperClass?: string;
  minYear?: string;
  maxYear?: string;
  onInput: (value: string, inputName: string) => void;
};

const AppInput = ({
  title,
  description,
  warningText,
  placeholder,
  type = "text",
  name,
  value,
  maskChar = "",
  mask = "",
  customWrapperClass,
  minYear = "1920",
  maxYear = "2050",
  onInput,
}: AppInputProps): JSX.Element => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "date") {
      onInput(formatDate(e.target.value, e.type), name);
    } else if (name === "name") {
      e.target.value = e.target.value.replace(/[^а-яА-Яa-zA-Z\s]/g, "");
      onInput(e.target.value, name);
    } else {
      onInput(e.target.value, name);
    }
  };

  const formatDate = (value: string, eventType: string): string => {
    const date = value.split("-");
    let year = date[0];

    if (
      year &&
      +year < +minYear &&
      (Number(year).toString().length >= 4 || eventType === "blur")
    ) {
      year = minYear.toString();
    }
    if (+year > +maxYear && Number(year).toString().length >= 4) {
      year = maxYear.toString();
    }

    date[0] = year;
    return date.join("-");
  };

  const handlerBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInput(e.target.value.trim(), name);
  };

  return (
    <label className={classNames(style.wrapper, customWrapperClass)}>
      {(title || description) && (
        <div className={style.titleBlock}>
          {title && <h3 className={style.title}>{title}</h3>}
          {description && (
            <span className={style.description}>{description}</span>
          )}
        </div>
      )}
      <InputMask
        className={classNames(style.input, {
          [style.datePlaceholder]: !value && type === "date",
          [style.warning]: warningText,
          [style.complete]: !warningText,
        })}
        type={type}
        name={name}
        mask={mask}
        maskChar={maskChar}
        placeholder={placeholder}
        value={value}
        min={type === "date" ? `${minYear}-01-01` : ""}
        max={type === "date" ? `${maxYear}-01-01` : ""}
        onInput={handleInputChange}
        onBlur={type === "date" ? handleInputChange : handlerBlur}
      />
      {warningText && <span className={style.warningText}>{warningText}</span>}
    </label>
  );
};

export { AppInput };
