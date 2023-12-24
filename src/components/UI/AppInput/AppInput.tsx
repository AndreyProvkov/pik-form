import InputMask from "react-input-mask";
import classNames from "classnames";
import style from "./AppInput.module.scss";

type AppInputProps = {
  title?: string;
  description?: string;
  errorText?: string;
  placeholder?: string;
  inputText?: string;
  type: "text";
  name: string;
  value: string;
  required?: boolean;
  mask: string | RegExp[];
  onInput: (value: string) => void;
};

const AppInput = ({
  title,
  description,
  errorText,
  placeholder,
  type,
  name,
  value,
  required,
  mask,
  onInput,
}: AppInputProps): JSX.Element => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInput(e.target.value);
  };

  return (
    <div className={style.wrapper}>
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
          [style.error]: errorText,
          [style.complete]: !errorText,
        })}
        type={type}
        name={name}
        mask={mask}
        placeholder={placeholder}
        value={value}
        required={required}
        onInput={handleInputChange}
      />
      {errorText && <span className={style.errorText}>{errorText}</span>}
    </div>
  );
};

export { AppInput };
