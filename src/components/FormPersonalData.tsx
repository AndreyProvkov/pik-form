import { AppInput } from "./UI/AppInput/AppInput";
import style from "./FormPersonalData.module.scss";
import { AppFileInput } from "./UI/AppFileInput/AppFileInput";

const MAX_SIZE_PHOTO_MB = 40;

const FormPersonalData = () => {

  return (
    <div className={style.blocks}>
      <div className={style.block}>
        <AppInput
          title="Фамилия Имя Отчество"
          placeholder="Иванов Иван Иванович"
          name="name"
          customWrapperClass={style.customWrapperInput}
          value={""}
          onInput={() => {}}
        />
        <AppInput
          title="Дата рождения"
          placeholder="дд.мм.гггг"
          type="date"
          name="date"
          customWrapperClass={style.customWrapperInput}
          value={""}
          onInput={() => {}}
        />
        <AppInput
          title="Почта"
          description="на этот адрес мы пришлём страховой полис"
          placeholder="example@gmail.com"
          type="text"
          name="email"
          customWrapperClass={style.customWrapperInput}
          value=""
          onInput={() => {}}
        />
      </div>
      <div className={style.block}>
        <h2 className={style.title}>Паспортные данные</h2>
        <AppInput
          title="Серия и номер"
          description="только паспорт РФ"
          placeholder="0000 000000"
          type="text"
          name="passport"
          mask="9999 999999"
          customWrapperClass={style.customWrapperInput}
          value={""}
          onInput={() => {}}
        />
        <AppInput
          title="Кем выдан"
          placeholder="Заполните точно как в паспорте"
          type="text"
          name="department"
          customWrapperClass={style.customWrapperInput}
          value={""}
          onInput={() => {}}
        />
        <AppInput
          title="Когда выдан"
          placeholder="дд.мм.гггг"
          type="date"
          name="issue date"
          customWrapperClass={style.customWrapperInput}
          value=""
          onInput={() => {}}
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
            maxSizeMb={MAX_SIZE_PHOTO_MB}
          />
          <AppFileInput
            text="Паспорт, 19 стр."
            accept=".png, .jpg, .jpeg, .pdf"
            maxSizeMb={MAX_SIZE_PHOTO_MB}
          />
          <AppFileInput
            text="Фото с паспортом"
            accept=".png, .jpg, .jpeg, .pdf"
            maxSizeMb={MAX_SIZE_PHOTO_MB}
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
