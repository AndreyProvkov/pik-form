import style from "./AppFileInput.module.scss";
import { CrossIcon } from "../../../assets/icons/CrossIcon";
import { PdfIcon } from "../../../assets/icons/PdfIcon";
import { AnyFileIcon } from "../../../assets/icons/AnyFileIcon";
import { ValidationResult } from "../../../utils/validators";
import classNames from "classnames";

// TODO Можно еще разбить на более простые компоненты (выбор файла/когда файл выбран)
// TODO TYPE_FILE - возможно лучше использовать структуру Map
// TODO доработать поле для нескольких файлов (здесь же, либо создать отдельный компонент)
// TODO можно доделать открытие файла при нажатии на нем после загрузки

type Props = {
  text: string;
  name: string;
  file: File | undefined;
  warningText: ValidationResult;
  accept?: string;
  maxSizeMb?: number;
  onChange: (file: File | undefined, inputName: string) => void;
  onBlur?: () => void;
  deleteFile: (inputName: string) => void;
};

type ImgBlockType = {
  alt?: string;
  src: File;
};

const IMAGE_TYPES: string[] = ["image/jpeg", "image/jpg", "image/png"];

const AppFileInput: React.FC<Props> = ({
  text,
  accept,
  name,
  file,
  warningText,
  maxSizeMb = 512,
  onChange,
  onBlur,
  deleteFile,
}) => {
  const MAX_FILE_SIZE_BYTES = maxSizeMb * 1024 * 1024;
  const TYPE_FILE: { [index: string]: (arg0: ImgBlockType) => JSX.Element } = {
    ...Object.fromEntries(
      IMAGE_TYPES.map((key) => [
        key,
        (params: ImgBlockType) => (
          <ImgBlock alt={params.alt} src={params.src} />
        ),
      ])
    ),
    "application/pdf": () => <PdfIcon customClass={style.iconType} />,
  };

  const handleOnChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      if (e.target.files[0].size <= MAX_FILE_SIZE_BYTES) {
        onChange(e.target.files[0], name);
      } else {
        onChange(undefined, name);
      }
    }
  };

  const handleClickCrossButton = () => {
    deleteFile(name);
  };

  const ImgBlock: React.FC<ImgBlockType> = ({
    alt = "icon: миниатюра файла",
    src,
  }) => {
    return (
      <img
        className={style.imgMiniature}
        alt={alt}
        src={URL.createObjectURL(src)}
      />
    );
  };

  return (
    <div
      className={classNames(style.container, {
        [style.warningLabel]: warningText,
      })}
    >
      {file ? (
        <div className={style.fileContainer}>
          <CrossIcon
            customClass={style.crossButton}
            onClick={handleClickCrossButton}
          />
          <span className={style.fileType}>
            {TYPE_FILE[file.type] ? (
              TYPE_FILE[file.type]({ src: file })
            ) : (
              <AnyFileIcon customClass={style.iconType} />
            )}
          </span>
          <span title={file.name} className={style.fileName}>
            {file.name}
          </span>
        </div>
      ) : (
        <label className={style.label}>
          <input
            className={style.inputFile}
            name={name}
            type="file"
            accept={accept}
            value={file}
            onChange={handleOnChangeFile}
            onBlur={onBlur}
          />
          <span className={style.symbol}>&#43;</span>
          <span className={style.text}>{text}</span>
          {warningText && <span className={style.warning}>{warningText}</span>}
        </label>
      )}
    </div>
  );
};

export { AppFileInput };
