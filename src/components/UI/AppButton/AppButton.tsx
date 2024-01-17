import classNames from "classnames";
import style from "./AppButton.module.scss";

type AppButtonType = "button" | "submit" | "reset";

type AppButtonProps = {
  title: string;
  type?: AppButtonType;
  mode?: "dark" | "light";
  disabled?: boolean;
  customStyle?: string;
  onClick: () => void;
};

const AppButton = ({
  title,
  type = "button",
  mode = "dark",
  disabled,
  customStyle,
  onClick,
}: AppButtonProps): JSX.Element => {
  return (
    <button
      className={classNames(
        style.button,
        { [style.buttonLight]: mode === "light" },
        customStyle
      )}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export { AppButton };
