import { useEffect, useState } from "react";
import { FormAboutApartament } from "../../components/FormAboutApartament";
import { FormPersonalData } from "../../components/FormPersonalData";
import { AppButton } from "../../components/UI/AppButton/AppButton";
import {
  requiredValidator,
  emailValidator,
  validate,
  dateValidator,
  minLengthValidator,
  passportEditionDateValidator,
  maxSizeFileValidator,
} from "../../utils/validators";
import { TYPE_INPUT_DATA } from "../../interfaces/InputData";
import { TYPE_INPUT_FILE_DATA } from "../../interfaces/InputFileData";
import style from "./FormPages.module.scss";

const MAX_SIZE_PHOTO_MB = 40;
const INIT_INPUT_PERSONAL_DATA: TYPE_INPUT_DATA = {
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
    validators: [requiredValidator()],
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
const INIT_INPUT_FILE_PERSONAL_DATA: TYPE_INPUT_FILE_DATA = {
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

//TODO Создать отдельный layout с заголовком и кнопками

const FormPages = () => {
  const [step, setStep] = useState("step1");
  const [isValidFieldsPersonalData, setIsValidFieldsPersonalData] =
    useState(true);
  const [isDisabledNextStep, setIsDisabledNextStep] = useState(true);
  const [inputPersonalData, setInputPersonalData] = useState(
    INIT_INPUT_PERSONAL_DATA
  );
  const [inputFilePersonalData, setInputFilePersonalData] = useState(
    INIT_INPUT_FILE_PERSONAL_DATA
  );

  useEffect(() => {
    // TODO DRY!!!!
    let isError = false;

    // Проверяем сперва один набор полей, потом другой
    for (const value of Object.values(inputPersonalData)) {
      if (value.error) {
        isError = true;
        break;
      }
    }
    for (const value of Object.values(inputFilePersonalData)) {
      if (value.error) {
        isError = true;
        break;
      }
    }

    if (isError) {
      setIsValidFieldsPersonalData(false);
      if (isDisabledNextStep) {
        setIsDisabledNextStep(false);
      }
    } else {
      setIsValidFieldsPersonalData(true);
    }
  }, [inputPersonalData, inputFilePersonalData]);

  const handleClickButtonPersonalData = () => {
    for (const inputName of Object.keys(inputPersonalData)) {
      setInputPersonalData((inputData) => ({
        ...inputData,
        [inputName]: {
          ...inputData[inputName],
          error: validate(
            inputData[inputName].value,
            inputData[inputName].validators
          ),
        },
      }));
    }
    for (const inputName of Object.keys(inputFilePersonalData)) {
      setInputFilePersonalData((inputData) => ({
        ...inputData,
        [inputName]: {
          ...inputData[inputName],
          error: validate(
            inputData[inputName].value,
            inputData[inputName].validators
          ),
        },
      }));
    }

    if (!isDisabledNextStep && isValidFieldsPersonalData) {
      setStep("step2");
    }
  };

  const onInputPersonalData = (value: string, inputName: string): void => {
    // TODO переделать на более красивое решение
    if (inputName === "passportEditionDate") {
      inputPersonalData.passportEditionDate.validators = [
        requiredValidator(),
        passportEditionDateValidator({
          birthdayDate: inputPersonalData.date.value,
          message: "неверная дата выдачи",
        }),
      ];
    }
    if (inputName === "date") {
      inputPersonalData.passportEditionDate.validators = [
        passportEditionDateValidator({
          birthdayDate: value,
          message: "неверная дата выдачи",
        }),
      ];
    }

    setInputPersonalData((inputData) => ({
      ...inputData,
      [inputName]: {
        ...inputData[inputName],
        value,
        error: validate(value, inputData[inputName].validators),
      },
    }));
  };

  const onChangePersonalData = (
    value: File | undefined,
    inputName: string
  ): void => {
    const inputFile =
      value && value.size / 1024 / 1024 < MAX_SIZE_PHOTO_MB ? value : undefined;

    setInputFilePersonalData((inputData) => ({
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

  const deleteFilePersonalData = (inputName: string): void => {
    setInputFilePersonalData((inputData) => ({
      ...inputData,
      [inputName]: { ...inputData[inputName], value: undefined },
    }));
    setInputFilePersonalData((inputData) => ({
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

  const onBlurFileInputPersonalData = (inputName: string) => {
    setInputFilePersonalData((inputData) => ({
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
    <div className={style.container}>
      {step === "step1" ? (
        <>
          <h1 className={style.title}>Шаг 1 из 2 | Личная информация</h1>
          <FormPersonalData
            inputFileData={inputFilePersonalData}
            inputData={inputPersonalData}
            maxSizeFile={MAX_SIZE_PHOTO_MB}
            onBlurFileInput={onBlurFileInputPersonalData}
            deleteFile={deleteFilePersonalData}
            onChange={onChangePersonalData}
            onInput={onInputPersonalData}
          />
          <AppButton
            title="Далее"
            customStyle={style.buttonPageOne}
            onClick={handleClickButtonPersonalData}
            disabled={!isValidFieldsPersonalData}
          />
        </>
      ) : (
        <>
          <h1 className={style.title}>Шаг 2 из 2 | О квартире</h1>
          <FormAboutApartament />
        </>
      )}
    </div>
  );
};

export { FormPages };
