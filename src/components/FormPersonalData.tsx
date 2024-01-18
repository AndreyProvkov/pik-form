import { AppInput } from "./UI/AppInput/AppInput";
import { AppFileInput } from "./UI/AppFileInput/AppFileInput";
import type { TYPE_INPUT_DATA } from "../interfaces/InputData";
import type { TYPE_INPUT_FILE_DATA } from "../interfaces/InputFileData";
import style from "./FormPersonalData.module.scss";

type Props = {
  inputData: TYPE_INPUT_DATA;
  inputFileData: TYPE_INPUT_FILE_DATA;
  maxSizeFile: number;
  onBlurFileInput: (inputName: string) => void;
  deleteFile: (inputName: string) => void;
  onChange: (file: File | undefined, inputName: string) => void;
  onInput: (value: string, inputName: string) => void;
};

const FormPersonalData: React.FC<Props> = ({
  inputData,
  inputFileData,
  maxSizeFile,
  onBlurFileInput,
  deleteFile,
  onChange,
  onInput,
}) => {
  return (
    <div className={style.blocks}>
      <div className={style.block}>
        <AppInput
          title="Фамилия Имя Отчество"
          placeholder="Иванов Иван Иванович"
          name="name"
          dadataType="fio"
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
          {maxSizeFile > 0 && (
            <span className={style.fileDescription}>
              jpg, png, pdf, не больше {maxSizeFile} Мб
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
