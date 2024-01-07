import { useState } from "react";
import style from "./AppFileInput.module.scss";
import { CrossIcon } from "../../../assets/icons/CrossIcon";
import { PdfIcon } from "../../../assets/icons/PdfIcon";
import { AnyFileIcon } from "../../../assets/icons/AnyFileIcon";

// TODO Можно еще разбить на более простые компоненты (выбор файла/когда файл выбран)
// TODO TYPE_FILE - возможно лучше использовать структуру Map
// TODO доработать поле для нескольких файлов (здесь же, либо создать отдельный компонент)
// TODO можно доделать открытие файла при нажатии на нем после загрузки

type Props = {
  text: string;
  accept?: string;
  maxSizeMb?: number;
  onChange?: (files: FileList) => void;
};

type ImgBlockType = {
  alt?: string;
  src: File;
};

const IMAGE_TYPES: string[] = ["image/jpeg", "image/jpg", "image/png"];

const AppFileInput: React.FC<Props> = ({
  text,
  accept,
  maxSizeMb = 0,
  onChange,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [warningText, setWarningText] = useState<string>("");
  const MAX_SIZE_FILE = maxSizeMb * 1024 * 1024;
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
      if (MAX_SIZE_FILE > 0 && e.target.files[0].size <= MAX_SIZE_FILE) {
        setFiles([...e.target.files]);
      } else {
        setWarningText(`файл больше ${maxSizeMb} Мб`);
      }
    }
  };

  const removeFile = () => {
    setFiles([]);
  };

  const resetWarningText = () => setWarningText("");

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
      {files.length ? (
        <div className={style.fileContainer}>
          <CrossIcon customClass={style.crossButton} onClick={removeFile} />
          <span className={style.fileType}>
            {TYPE_FILE[files[0].type] ? (
              TYPE_FILE[files[0].type]({ src: files[0] })
            ) : (
              <AnyFileIcon customClass={style.iconType} />
            )}
          </span>
          <span title={files[0].name} className={style.fileName}>
            {files[0].name}
          </span>
        </div>
      ) : (
        <label className={style.label} onClick={resetWarningText}>
          <input
            className={style.inputFile}
            type="file"
            accept={accept}
            onChange={handleOnChangeFile}
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
