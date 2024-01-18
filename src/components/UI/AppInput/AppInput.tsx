import InputMask from "react-input-mask";
import {
  AddressSuggestions,
  DaDataAddress,
  DaDataSuggestion,
} from "react-dadata";
import classNames from "classnames";
import type { ValidationResult } from "../../../utils/validators";
import { CheckMark } from "../../../assets/icons/CheckMark";
import style from "./AppInput.module.scss";
import { useState } from "react";

// TODO Вынести в отдельный компонент input type=date
// TODO Для даты сделать нормальный максимальный и минимальный лимиты с выбором дня и месяца
// TODO добавить для адреса больше проверок на валидацию: повторный запрос (плохо), достать из компонента suggestion (хз как)

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
  dadataType?: "address" | "fio";
  onInput: (value: string, inputName: string) => void;
};

// TODO хз где хранить ключ но точно не тут
const API_KEY = "70984f274702eaf96bba357b60b21b82897d39ec";

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
  dadataType,
  onInput,
}: AppInputProps): JSX.Element => {
  const [suggestion, setSuggestion] = useState<
    DaDataSuggestion<DaDataAddress> | undefined
  >(undefined);

  // TODO сделать ввод более универсальным
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (type === "date") {
      onInput(formatDate(e.currentTarget.value, e.type), name);
    } else if (name === "name") {
      e.currentTarget.value = e.currentTarget.value.replace(
        /[^а-яА-Яa-zA-Z\s]/g,
        ""
      );
      onInput(e.currentTarget.value, name);
    } else if (name === "email") {
      e.currentTarget.value = e.currentTarget.value.replace(/[\s]/g, "");
      onInput(e.currentTarget.value, name);
    } else if (name === "price") {
      e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
      const unmaskedValue = e.currentTarget.value.replace(/\s/g, "");
      const formattedValue = unmaskedValue.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        " "
      );
      onInput(formattedValue, name);
    } else if (name === "address") {
      onInput("", name);
      setSuggestion(undefined);
    } else {
      onInput(e.currentTarget.value, name);
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

  const handlerBlur = (e: React.FormEvent<HTMLInputElement>) => {
    onInput(e.currentTarget.value.trim(), name);
  };

  const handleChange = (e: DaDataSuggestion<DaDataAddress> | undefined) => {
    if (e) {
      setSuggestion(e);
      onInput(e.value, name);
    }
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
      <>
        {dadataType === "address" && (
          <AddressSuggestions
            token={API_KEY}
            selectOnBlur={true}
            inputProps={{
              name,
              placeholder,
              className: classNames(style.input, {
                [style.datePlaceholder]: !value && type === "date",
                [style.warning]: warningText,
                [style.complete]: !warningText && value,
              }),
              onInput: (e) => handleInputChange(e),
              onBlur: (e) => handlerBlur(e),
            }}
            onChange={handleChange}
            value={suggestion}
          />
        )}
        {!dadataType && (
          <InputMask
            className={classNames(style.input, {
              [style.datePlaceholder]: !value && type === "date",
              [style.warning]: warningText,
              [style.complete]: !warningText && value,
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
        )}
        {!warningText && value && (
          <CheckMark
            customClass={classNames(style.checkMark, {
              [style.checkMarkForDate]: type === "date",
            })}
          />
        )}
      </>
      {warningText && <span className={style.warningText}>{warningText}</span>}
    </label>
  );
};

export { AppInput };
