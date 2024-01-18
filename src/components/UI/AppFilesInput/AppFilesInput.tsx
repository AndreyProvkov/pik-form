import { CrossIcon } from "../../../assets/icons/CrossIcon";
import { PdfIcon } from "../../../assets/icons/PdfIcon";
import { AnyFileIcon } from "../../../assets/icons/AnyFileIcon";
import { ValidationResult } from "../../../utils/validators";
import classNames from "classnames";
import style from "./AppFilesInput.module.scss";

// TODO Разбить на компоненты совместимые с AppFileInput (кароч все под тип File[] переделать)
// TODO Доделать добавление файлов, чтобы новые добавлялись к старым а не заменялись новыми

type Props = {
  text: string;
  title?: string;
  description?: string;
  name: string;
  files: File[];
  warningText: ValidationResult;
  accept?: string;
  onChange: (files: File[], inputName: string) => void;
  onBlur?: (inputName: string) => void;
  deleteFile: (inputName: string) => void;
};

type ImgBlockType = {
  alt?: string;
  src: File;
};

const IMAGE_TYPES: string[] = ["image/jpeg", "image/jpg", "image/png"];

const AppFilesInput: React.FC<Props> = ({
  text,
  title,
  description,
  accept,
  name,
  files,
  warningText,
  onChange,
  onBlur,
  deleteFile,
}) => {
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
      onChange(Array.from(e.target.files), name);
    }
  };

  const handleClickCrossButton = (index: number) => {
    const filesCopy = [...files];
    filesCopy.splice(index, 1);
    onChange(filesCopy, name);
    deleteFile(name);
  };

  const handleBlur = () => {
    onBlur && onBlur(name);
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
    <div className={style.container}>
      {(title || description) && (
        <div className={style.descriptionBlock}>
          <h2 className={style.title}>{title}</h2>
          <p className={style.description}>{description}</p>
        </div>
      )}
      <div className={style.fileBlocks}>
        <div
          className={classNames(style.fileContainer, {
            [style.warningLabel]: warningText,
          })}
        >
          <label className={style.label}>
            <input
              className={style.inputFile}
              name={name}
              type="file"
              accept={accept}
              multiple
              onChange={handleOnChangeFile}
              onBlur={handleBlur}
            />
            <span className={style.symbol}>&#43;</span>
            <span className={style.text}>{text}</span>
          </label>
          {warningText && <span className={style.warning}>{warningText}</span>}
        </div>
        {files &&
          files.map((file, index) => {
            return (
              <div
                key={index}
                className={classNames(style.fileContainer, {
                  [style.warningLabel]: warningText,
                })}
              >
                <div className={style.fileInnerContainer}>
                  <CrossIcon
                    customClass={style.crossButton}
                    onClick={() => handleClickCrossButton(index)}
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
              </div>
            );
          })}
      </div>
    </div>
  );
};

export { AppFilesInput };
