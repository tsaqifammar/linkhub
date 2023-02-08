import { FormControl, FormLabel, Select, Text } from "@chakra-ui/react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface SelectProps<T extends FieldValues>
  extends React.ComponentProps<typeof Select> {
  label: string;
  options: { label: string; value: string }[];
  register: UseFormRegister<T>;
  name: Path<T>;
}

export default function CustomSelect<T extends FieldValues>({
  label,
  options,
  required,
  register,
  name,
  size,
  ...rest
}: SelectProps<T>) {
  return (
    <FormControl>
      <FormLabel htmlFor={name} color="gray.600" fontSize={size}>
        {label}
        {required && (
          <Text as="span" color="red.500">
            &nbsp;*
          </Text>
        )}
      </FormLabel>
      <Select
        id={name}
        bgColor="white"
        size={size}
        {...rest}
        {...register(name)}
      >
        {options.map((item, idx) => (
          <option key={idx} value={item.value}>
            {item.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
