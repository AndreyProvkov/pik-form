type Props = {
  customClass: string;
  onClick: () => void;
};

const CrossIcon: React.FC<Props> = ({ customClass, onClick }) => {
  return (
    <svg
      className={customClass}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.12469 13.75L6.25 12.8589L9.116 10L6.25 7.14109L7.12469 6.25L9.99069 9.12748L12.8567 6.25L13.75 7.14109L10.884 10L13.75 12.8589L12.8567 13.75L9.99069 10.8725L7.12469 13.75Z"
      />
    </svg>
  );
};

export { CrossIcon };
