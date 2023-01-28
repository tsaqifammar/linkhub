import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface InputProps<T extends FieldValues>
  extends React.ComponentProps<typeof Input> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
  leftAddon?: React.ReactNode;
}

export default function CustomInput<T extends FieldValues>({
  label,
  name,
  register,
  required,
  error,
  leftAddon,
  size,
  ...rest
}: InputProps<T>) {
  return (
    <FormControl isInvalid={error as unknown as boolean}>
      <FormLabel htmlFor={name} color="gray.600">
        {label}
        {required && (
          <Text as="span" color="red.500">
            &nbsp;*
          </Text>
        )}
      </FormLabel>
      {!leftAddon ? (
        <Input
          id={name}
          bgColor="white"
          size={size}
          {...rest}
          {...register(name)}
        />
      ) : (
        <InputGroup size={size}>
          <InputLeftAddon children={leftAddon} />
          <Input id={name} bgColor="white" {...rest} {...register(name)} />
        </InputGroup>
      )}
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
}
