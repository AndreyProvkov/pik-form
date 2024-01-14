import { useState } from "react";
import { AppInput } from "./UI/AppInput/AppInput";
import { AppFileInput } from "./UI/AppFileInput/AppFileInput";
import style from "./FormPersonalData.module.scss";

type TYPE_INPUT_DATA = {
  [key: string]: {
    value: string;
    error: string;
  };
};

type TYPE_INPUT_FILE_DATA = {
  [key: string]: {
    value: File | undefined;
    error: string;
  };
};

const MAX_SIZE_PHOTO_MB = 40;
const INIT_INPUT_DATA: TYPE_INPUT_DATA = {
  date: {
    value: "",
    error: "",
  },
  name: {
    value: "",
    error: "",
  },
  email: {
    value: "",
    error: "",
  },
  passportSeries: {
    value: "",
    error: "",
  },
  passportDepartament: {
    value: "",
    error: "",
  },
  passportEditionDate: {
    value: "",
    error: "",
  },
};
const INIT_INPUT_FILE_DATA: TYPE_INPUT_FILE_DATA = {
  photoMainPagePassport: {
    value: undefined,
    error: "",
  },
  photoOldPassport: {
    value: undefined,
    error: "",
  },
  photoWithPassport: {
    value: undefined,
    error: "",
  },
};

const FormPersonalData = () => {
  const [inputData, setInputData] = useState(INIT_INPUT_DATA);
  const [inputFileData, setInputFileData] = useState(INIT_INPUT_FILE_DATA);

  const onInput = (value: string, inputName: string): void => {
    setInputData((inputData) => ({
      ...inputData,
      [inputName]: { ...inputData[inputName], value },
    }));
  };

  const onChange = (value: File | undefined, inputName: string): void => {
    setInputFileData((inputData) => ({
      ...inputData,
      [inputName]: { ...inputData[inputName], value },
    }));
  };

  const deleteFile = (inputName: string): void => {
    setInputFileData((inputData) => ({
      ...inputData,
      [inputName]: { ...inputData[inputName], value: undefined },
    }));
  };

  return (
    <div className={style.blocks}>
      <div className={style.block}>
        <AppInput
          title="Фамилия Имя Отчество"
          placeholder="Иванов Иван Иванович"
          name="name"
          customWrapperClass={style.customWrapperInput}
          value={inputData.name.value}
          onInput={onInput}
        />
        <AppInput
          title="Дата рождения"
          placeholder="дд.мм.гггг"
          type="date"
          name="date"
          customWrapperClass={style.customWrapperInput}
          value={inputData.date.value}
          onInput={onInput}
        />
        <AppInput
          title="Почта"
          description="на этот адрес мы пришлём страховой полис"
          placeholder="example@gmail.com"
          type="text"
          name="email"
          customWrapperClass={style.customWrapperInput}
          value={inputData.email.value}
          onInput={onInput}
        />
      </div>
      <div className={style.block}>
        <h2 className={style.title}>Паспортные данные</h2>
        <AppInput
          title="Серия и номер"
          description="только паспорт РФ"
          placeholder="0000 000000"
          type="text"
          name="passportSeries"
          mask="9999 999999"
          customWrapperClass={style.customWrapperInput}
          value={inputData.passportSeries.value}
          onInput={onInput}
        />
        <AppInput
          title="Кем выдан"
          placeholder="Заполните точно как в паспорте"
          type="text"
          name="passportDepartament"
          customWrapperClass={style.customWrapperInput}
          value={inputData.passportDepartament.value}
          onInput={onInput}
        />
        <AppInput
          title="Когда выдан"
          placeholder="дд.мм.гггг"
          type="date"
          name="passportEditionDate"
          customWrapperClass={style.customWrapperInput}
          value={inputData.passportEditionDate.value}
          onInput={onInput}
        />
      </div>
      <div className={style.block}>
        <h2 className={style.title}>Фото документов</h2>
        <div className={style.fileBlock}>
          {MAX_SIZE_PHOTO_MB > 0 && (
            <span className={style.fileDescription}>
              jpg, png, pdf, не больше {MAX_SIZE_PHOTO_MB} Мб
            </span>
          )}
          <AppFileInput
            text="Паспорт, 2-3 стр."
            accept=".png, .jpg, .jpeg, .pdf"
            // maxSizeMb={MAX_SIZE_PHOTO_MB}
            name="photoMainPagePassport"
            file={inputFileData.photoMainPagePassport.value}
            maxSizeMb={MAX_SIZE_PHOTO_MB}
            warningText={inputFileData.photoMainPagePassport.error}
            onChange={onChange}
            deleteFile={deleteFile}
          />
          <AppFileInput
            text="Паспорт, 19 стр."
            accept=".png, .jpg, .jpeg, .pdf"
            // maxSizeMb={MAX_SIZE_PHOTO_MB}
            name="photoOldPassport"
            file={inputFileData.photoOldPassport.value}
            maxSizeMb={MAX_SIZE_PHOTO_MB}
            warningText={inputFileData.photoOldPassport.error}
            onChange={onChange}
            deleteFile={deleteFile}
          />
          <AppFileInput
            text="Фото с паспортом"
            accept=".png, .jpg, .jpeg, .pdf"
            // maxSizeMb={MAX_SIZE_PHOTO_MB}
            name="photoWithPassport"
            file={inputFileData.photoWithPassport.value}
            maxSizeMb={MAX_SIZE_PHOTO_MB}
            warningText={inputFileData.photoWithPassport.error}
            onChange={onChange}
            deleteFile={deleteFile}
          />
        </div>
        <p className={style.fileText}>
          Мы надеждно храним и защищаем ваши личные данные и не передаем их
          третьим лицам
        </p>
      </div>
    </div>
  );
};

export { FormPersonalData };
