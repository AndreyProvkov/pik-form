import { AppInputPrice } from "./UI/AppInputPrice/AppInputPrice";
import type { TYPE_INPUT_DATA } from "../interfaces/InputData";
import style from "./FormAboutApartament.module.scss";

type Props = {
  inputData: TYPE_INPUT_DATA;
  onInput: (value: string, inputName: string) => void;
};

// TODO Можно вынести макс. лимит по аренде в отдельную переменную
// TODO Также вынести в utils функцию по разделению тысячных долей в числе

const FormAboutApartament: React.FC<Props> = ({ inputData, onInput }) => {
  return (
    <div className={style.blocks}>
      <AppInputPrice
        title="Стоимость аренды"
        warningText={inputData.price.error}
        name="price"
        value={inputData.price.value}
        onInput={onInput}
      />
    </div>
  );
};

export { FormAboutApartament };
