import InputMask from "react-input-mask";
import classNames from "classnames";
import style from "./AppInput.module.scss";

type AppInputProps = {
  title?: string;
  description?: string;
  warningText?: string;
  placeholder?: string;
  inputText?: string;
  type?: "text" | "date";
  name: string;
  value: string;
  mask?: string | RegExp[];
  maskChar?: string;
  customWrapperClass?: string;
  onInput: (value: string, type?: string) => void;
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
  onInput,
}: AppInputProps): JSX.Element => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // onInput(e.target.value, name);
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
          [style.warning]: warningText,
          [style.complete]: !warningText,
        })}
        type={type}
        name={name}
        mask={mask}
        maskChar={maskChar}
        placeholder={placeholder}
        onInput={handleInputChange}
      />
      {warningText && <span className={style.warningText}>{warningText}</span>}
    </label>
  );
};

export { AppInput };
