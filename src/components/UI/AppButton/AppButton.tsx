import style from "./AppButton.module.scss";

type AppButtonType = "button" | "submit" | "reset";

type AppButtonProps = {
  title: string;
  type?: AppButtonType;
  disabled?: boolean;
};

const AppButton = ({
  title,
  type = "button",
  disabled,
}: AppButtonProps): JSX.Element => {
  return (
    <button className={style.button} type={type} disabled={disabled}>
      {title}
    </button>
  );
};

export { AppButton };
