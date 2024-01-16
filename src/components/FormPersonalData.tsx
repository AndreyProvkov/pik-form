import { useState } from "react";
import { AppInput } from "./UI/AppInput/AppInput";
import { AppFileInput } from "./UI/AppFileInput/AppFileInput";
import style from "./FormPersonalData.module.scss";
import {
  requiredValidator,
  emailValidator,
  validate,
  dateValidator,
  minLengthValidator,
  passportEditionDateValidator,
  maxSizeFileValidator,
} from "../utils/validators";
import type { ValidationResult, Validator } from "../utils/validators";

type TYPE_INPUT_DEFAULT = {
  [key: string]: {
    error: ValidationResult;
  };
};

type TYPE_INPUT_DATA = {
  [key: string]: {
    value: string;
    validators: Validator<string>[];
  };
} & TYPE_INPUT_DEFAULT;

type TYPE_INPUT_FILE_DATA = {
  [key: string]: {
    value: File | undefined;
    validators: Validator<File | undefined>[];
  };
} & TYPE_INPUT_DEFAULT;

const MAX_SIZE_PHOTO_MB = 40;
const INIT_INPUT_DATA: TYPE_INPUT_DATA = {
  date: {
    value: "",
    error: "",
    validators: [requiredValidator(), dateValidator()],
  },
  name: {
    value: "",
    error: "",
    validators: [requiredValidator()],
  },
  email: {
    value: "",
    error: "",
    validators: [requiredValidator(), emailValidator()],
  },
  passportSeries: {
    value: "",
    error: "",
    validators: [
      requiredValidator(),
      minLengthValidator({ length: 4, message: "введите серию паспорта" }),
      minLengthValidator({ length: 11, message: "введите номер паспорта" }),
    ],
  },
  passportDepartament: {
    value: "",
    error: "",
    validators: [requiredValidator()],
  },
  passportEditionDate: {
    value: "",
    error: "",
    validators: [],
  },
  passportDepartamentCode: {
    value: "",
    error: "",
    validators: [
      minLengthValidator({
        length: 7,
        message: "код должен состоять из 6-ти цифр",
      }),
    ],
  },
};
const INIT_INPUT_FILE_DATA: TYPE_INPUT_FILE_DATA = {
  photoMainPagePassport: {
    value: undefined,
    error: "",
    validators: [
      requiredValidator(),
      maxSizeFileValidator({
        maxSizeInMb: MAX_SIZE_PHOTO_MB,
        message: `файл должен быть до ${MAX_SIZE_PHOTO_MB}Мб`,
      }),
    ],
  },
  photoOldPassport: {
    value: undefined,
    error: "",
    validators: [
      requiredValidator(),
      maxSizeFileValidator({
        maxSizeInMb: MAX_SIZE_PHOTO_MB,
        message: `файл должен быть до ${MAX_SIZE_PHOTO_MB}Мб`,
      }),
    ],
  },
  photoWithPassport: {
    value: undefined,
    error: "",
    validators: [
      requiredValidator(),
      maxSizeFileValidator({
        maxSizeInMb: MAX_SIZE_PHOTO_MB,
        message: `файл должен быть до ${MAX_SIZE_PHOTO_MB}Мб`,
      }),
    ],
  },
};

const FormPersonalData = () => {
  const [inputData, setInputData] = useState(INIT_INPUT_DATA);
  const [inputFileData, setInputFileData] = useState(INIT_INPUT_FILE_DATA);

  const onInput = (value: string, inputName: string): void => {
    // TODO переделать на более красивое решение
    if (inputName === "passportEditionDate") {
      inputData.passportEditionDate.validators = [
        requiredValidator(),
        passportEditionDateValidator({
          birthdayDate: inputData.date.value,
          message: "неверная дата выдачи",
        }),
      ];
    }
    if (inputName === "date") {
      inputData.passportEditionDate.validators = [
        passportEditionDateValidator({
          birthdayDate: value,
          message: "неверная дата выдачи",
        }),
      ];
    }

    setInputData((inputData) => ({
      ...inputData,
      [inputName]: {
        ...inputData[inputName],
        value,
        error: validate(value, inputData[inputName].validators),
      },
    }));
  };

  const onChange = (value: File | undefined, inputName: string): void => {
    const inputFile =
      value && value.size / 1024 / 1024 < MAX_SIZE_PHOTO_MB ? value : undefined;

    setInputFileData((inputData) => ({
      ...inputData,
      [inputName]: {
        ...inputData[inputName],
        value: inputFile,
        error: validate<File | undefined>(
          value,
          inputData[inputName].validators
        ),
      },
    }));
  };

  const deleteFile = (inputName: string): void => {
    setInputFileData((inputData) => ({
      ...inputData,
      [inputName]: { ...inputData[inputName], value: undefined },
    }));
    setInputFileData((inputData) => ({
      ...inputData,
      [inputName]: {
        ...inputData[inputName],
        error: validate(
          inputData[inputName].value,
          inputData[inputName].validators
        ),
      },
    }));
  };

  const onBlurFileInput = (inputName: string) => {
    setInputFileData((inputData) => ({
      ...inputData,
      [inputName]: {
        ...inputData[inputName],
        error: validate(
          inputData[inputName].value,
          inputData[inputName].validators
        ),
      },
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
          warningText={inputData.name.error}
          onInput={onInput}
        />
        <AppInput
          title="Дата рождения"
          placeholder="дд.мм.гггг"
          type="date"
          name="date"
          customWrapperClass={style.customWrapperInput}
          value={inputData.date.value}
          warningText={inputData.date.error}
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
          warningText={inputData.email.error}
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
          warningText={inputData.passportSeries.error}
          onInput={onInput}
        />
        <AppInput
          title="Кем выдан"
          placeholder="Заполните точно как в паспорте"
          type="text"
          name="passportDepartament"
          customWrapperClass={style.customWrapperInput}
          value={inputData.passportDepartament.value}
          warningText={inputData.passportDepartament.error}
          onInput={onInput}
        />
        <AppInput
          title="Когда выдан"
          placeholder="дд.мм.гггг"
          type="date"
          name="passportEditionDate"
          customWrapperClass={style.customWrapperInput}
          value={inputData.passportEditionDate.value}
          warningText={inputData.passportEditionDate.error}
          onInput={onInput}
        />
        <AppInput
          title="Код подразделения"
          placeholder="000-000"
          type="text"
          name="passportDepartamentCode"
          mask="999-999"
          customWrapperClass={style.customWrapperInput}
          value={inputData.passportDepartamentCode.value}
          warningText={inputData.passportDepartamentCode.error}
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
            name="photoMainPagePassport"
            file={inputFileData.photoMainPagePassport.value}
            warningText={inputFileData.photoMainPagePassport.error}
            onChange={onChange}
            onBlur={onBlurFileInput}
            deleteFile={deleteFile}
          />
          <AppFileInput
            text="Паспорт, 19 стр."
            accept=".png, .jpg, .jpeg, .pdf"
            name="photoOldPassport"
            file={inputFileData.photoOldPassport.value}
            warningText={inputFileData.photoOldPassport.error}
            onChange={onChange}
            onBlur={onBlurFileInput}
            deleteFile={deleteFile}
          />
          <AppFileInput
            text="Фото с паспортом"
            accept=".png, .jpg, .jpeg, .pdf"
            name="photoWithPassport"
            file={inputFileData.photoWithPassport.value}
            warningText={inputFileData.photoWithPassport.error}
            onChange={onChange}
            onBlur={onBlurFileInput}
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
