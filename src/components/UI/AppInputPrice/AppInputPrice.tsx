import { AppInput } from "../AppInput/AppInput";
import type { ValidationResult } from "../../../utils/validators";
import { calculateInsurance } from "../../../utils/calculateInsurance";
import style from "./AppInputPrice.module.scss";

type AppInputPriceProps = {
  title?: string;
  description?: string;
  warningText: ValidationResult;
  maxLimit?: string;
  minLimit?: string;
  inputText?: string;
  name: string;
  value: string;
  customWrapperClass?: string;
  onInput: (value: string, inputName: string) => void;
};

const AppInputPrice: React.FC<AppInputPriceProps> = ({
  title,
  description,
  warningText,
  maxLimit = "100 000",
  minLimit = "20 000",
  name,
  value,
  onInput,
}) => {
  const limitValue = (value: string): string => {
    let currentValue;
    let formattedValue = "";
    const valueAsNumber = +value.replace(/\s/g, "");
    const maxLimitAsNumber = +maxLimit.replace(/\s/g, "");
    const minLimitAsNumber = +minLimit.replace(/\s/g, "");

    currentValue = valueAsNumber;

    if (valueAsNumber < minLimitAsNumber && value.length === minLimit.length) {
      currentValue = minLimitAsNumber;
    }
    if (valueAsNumber > maxLimitAsNumber && value.length >= minLimit.length) {
      currentValue = maxLimitAsNumber;
    }

    if (currentValue) {
      formattedValue = currentValue
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    return formattedValue;
  };

  const handleInput = (value: string, inputName: string) => {
    onInput(limitValue(value), inputName);
  };

  return (
    <div className={style.container}>
      <div className={style.innerContainer}>
        <AppInput
          title={title}
          description={description}
          placeholder={maxLimit}
          type="text"
          name={name}
          warningText={warningText}
          customWrapperClass={style.inputCustomWrapper}
          value={value}
          onInput={handleInput}
        />
        <p className={style.priceText}>
          Стоимость страховки
          <br />
          <span className={style.price}>
            {value.length >= 6 ? calculateInsurance(value) : " -- "}₽/мес
          </span>
          <br />
          (платит арендатор)
        </p>
      </div>
      <div className={style.attentionBlock}>
        <p className={style.attentionText}>
          Мы работаем с квартирами до {maxLimit}₽/мес.
        </p>
        <p className={style.attentionText}>
          Напишите на&nbsp;
          <a
            className={style.attentionLink}
            href="mailto:help@pik-arenda.ru"
            target="_blank"
          >
            help@pik-arenda.ru
          </a>
          &nbsp;и мы найдем решение
        </p>
      </div>
    </div>
  );
};

export { AppInputPrice };
