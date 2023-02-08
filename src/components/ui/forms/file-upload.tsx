import { ReactNode, useRef } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { FiFile } from "react-icons/fi";

// modified from: https://gist.github.com/Sqvall/23043a12a7fabf0f055198cb6ec39531

interface FileUploadProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: FieldError | undefined;
  accept?: string;
  multiple?: boolean;
  label?: string;
  required?: boolean;
}

export default function FileUpload<T extends FieldValues>({
  register,
  name,
  accept,
  multiple,
  label,
  error,
  required = false,
}: FileUploadProps<T>) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const MAX_FILE_SIZE = 5; // in MB
  const validateFiles = (value: FileList) => {
    if (value.length < 1) {
      return "Please select a file";
    }
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024);
      if (fsMb > MAX_FILE_SIZE) {
        return "Max file size is 5 MB";
      }
    }
    return true;
  };

  const { ref, ...rest } = register(name, { validate: validateFiles });

  const handleClick = () => inputRef.current?.click();

  return (
    <FormControl>
      {label && (
        <FormLabel htmlFor={name} color="gray.600" whiteSpace="nowrap">
          {label}
          {required && (
            <Text as="span" color="red.500">
              &nbsp;*
            </Text>
          )}
        </FormLabel>
      )}
      <InputGroup onClick={handleClick}>
        <input
          type={"file"}
          multiple={multiple || false}
          hidden
          accept={accept}
          {...rest}
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
        />
        <Button leftIcon={<Icon as={FiFile} />}>Upload</Button>
      </InputGroup>
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
}
