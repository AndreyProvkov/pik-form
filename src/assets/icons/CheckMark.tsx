type Props = {
  customClass: string;
};

const CheckMark: React.FC<Props> = ({ customClass }) => {
  return (
    <svg
      className={customClass}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
    >
      <path d="M4 11.625L8.26087 16L18 6" />
    </svg>
  );
};

export { CheckMark };
