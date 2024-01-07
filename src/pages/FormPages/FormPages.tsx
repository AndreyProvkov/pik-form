import { useState } from "react";
import { FormAboutApartament } from "../../components/FormAboutApartament";
import { FormPersonalData } from "../../components/FormPersonalData";
import { AppButton } from "../../components/UI/AppButton/AppButton";
import style from "./FormPages.module.scss";

//TODO Создать отдельный layout с заголовком

const FormPages = () => {
  const [step, setStep] = useState("step1");

  const handlerClickButton = () => setStep("step2");

  return (
    <div className={style.container}>
      {step === "step1" ? (
        <>
          <h1 className={style.title}>Шаг 1 из 2 | Личная информация</h1>
          <FormPersonalData />
          <AppButton
            title="Далее"
            customStyle={style.buttonPageOne}
            onClick={handlerClickButton}
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
