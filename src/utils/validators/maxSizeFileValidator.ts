import type { GetValidator } from "./index";

type Options = {
  maxSizeInMb: number;
  message: string;
};

const maxSizeFileValidator: GetValidator<Options, File | undefined> = (
  options = {
    maxSizeInMb: 500,
    message: "",
  }
) => {
  const maxSizeInBytes = options.maxSizeInMb * 1024 * 1024;
  return (file) => {
    if (!file) {
      return null;
    }

    return file && file.size <= maxSizeInBytes ? null : options.message;
  };
};

export { maxSizeFileValidator };
