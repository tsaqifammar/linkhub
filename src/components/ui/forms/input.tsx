import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";
import { ChangeEventHandler } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface InputProps<T extends FieldValues>
  extends React.ComponentProps<typeof Input> {
  label?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError | undefined;
  leftAddon?: React.ReactNode;
  labelPlacement?: "above" | "left";
}

export default function CustomInput<T extends FieldValues>({
  label,
  name,
  register,
  required,
  error,
  leftAddon,
  size,
  onChange,
  labelPlacement = "above",
  ...rest
}: InputProps<T>) {
  const { onChange: rhfOnChange } = register(name);
  let newOnChange: ChangeEventHandler<HTMLInputElement> = rhfOnChange;
  if (onChange) {
    newOnChange = (e) => {
      onChange(e);
      rhfOnChange(e);
    };
  }

  return (
    <FormControl isInvalid={error as unknown as boolean}>
      <Flex
        direction={labelPlacement === "above" ? "column" : "row"}
        alignItems={labelPlacement === "above" ? "initial" : "center"}
      >
        {label && (
          <FormLabel htmlFor={name} color="gray.600" fontSize={size} whiteSpace="nowrap">
            {label}
            {required && (
              <Text as="span" color="red.500">
                &nbsp;*
              </Text>
            )}
          </FormLabel>
        )}
        {!leftAddon ? (
          <Input
            id={name}
            bgColor="white"
            size={size}
            {...rest}
            {...register(name)}
            onChange={newOnChange}
          />
        ) : (
          <InputGroup size={size}>
            <InputLeftAddon>{leftAddon}</InputLeftAddon>
            <Input
              id={name}
              bgColor="white"
              {...rest}
              {...register(name)}
              onChange={newOnChange}
            />
          </InputGroup>
        )}
        <FormErrorMessage>{error && error.message}</FormErrorMessage>
      </Flex>
    </FormControl>
  );
}
