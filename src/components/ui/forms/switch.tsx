import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface SwitchProps<T extends FieldValues> extends React.ComponentProps<typeof Switch> {
  register: UseFormRegister<T>;
  name: Path<T>;
  label?: string;
}

export default function CustomSwitch<T extends FieldValues>({
  register,
  name,
  label,
  ...rest
}: SwitchProps<T>) {
  return (
    <FormControl w="min-content">
      {label && <FormLabel>{label}</FormLabel>}
      <Switch colorScheme="cyan" {...rest} {...register(name)} />
    </FormControl>
  );
}
