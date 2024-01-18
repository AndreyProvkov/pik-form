import { AppInputPrice } from "./UI/AppInputPrice/AppInputPrice";
import { AppFilesInput } from "./UI/AppFilesInput/AppFilesInput";
import type { TYPE_INPUT_DATA } from "../interfaces/InputData";
import type { TYPE_INPUT_FILES_DATA } from "../interfaces/inputFilesData";
import style from "./FormAboutApartament.module.scss";

type Props = {
  inputData: TYPE_INPUT_DATA;
  inputFileData: TYPE_INPUT_FILES_DATA;
  onInput: (value: string, inputName: string) => void;
  onChange: (value: File[], inputName: string) => void;
  deleteFile: (inputName: string) => void;
  onBlurFileInput: (inputName: string) => void;
};

// TODO Можно вынести макс. лимит по аренде в отдельную переменную
// TODO Также вынести в utils функцию по разделению тысячных долей в числе

const FormAboutApartament: React.FC<Props> = ({
  inputData,
  inputFileData,
  onInput,
  onChange,
  deleteFile,
  onBlurFileInput,
}) => {
  return (
    <div className={style.blocks}>
      <AppInputPrice
        title="Стоимость аренды"
        warningText={inputData.price.error}
        name="price"
        value={inputData.price.value}
        onInput={onInput}
      />
      <AppFilesInput
        name="docs"
        title="Документы"
        description="договор аренды, доп. соглашение"
        text="выбрать файл"
        files={inputFileData.docs.value}
        warningText={inputFileData.docs.error}
        accept=".png, .jpg, .jpeg, .pdf"
        onChange={onChange}
        deleteFile={deleteFile}
        onBlur={onBlurFileInput}
      />
    </div>
  );
};

export { FormAboutApartament };
