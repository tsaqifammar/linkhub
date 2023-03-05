import {
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  Input,
  ResponsiveValue,
  Tooltip,
  useEditableControls,
} from "@chakra-ui/react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  FieldError,
} from "react-hook-form";

// reference: https://codesandbox.io/s/kibcn?file=/src/index.tsx
// some slight changes are made to match current version of chakra

function EditableControls() {
  const { isEditing, getEditButtonProps } = useEditableControls();

  return isEditing ? (
    <></>
  ) : (
    <IconButton
      size="xs"
      aria-label="Edit"
      icon={<HiOutlinePencilAlt />}
      {...getEditButtonProps()}
    />
  );
}

interface EditableProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  error?: FieldError | undefined;
  placeholder?: string;
  fontWeight?: | ResponsiveValue< | number | "bold" | (string & {}) | "hairline" | "thin" | "light" | "normal" | "medium" | "semibold" | "extrabold" | "black" > | undefined;
}

export default function CustomEditable<T extends FieldValues>({
  name,
  control,
  placeholder,
  error,
  fontWeight = "normal",
}: EditableProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={(controlProps) => (
        <Tooltip
          hasArrow
          label={error?.message || ""}
          isOpen={!!error?.message}
          bg="red.400"
          fontSize="xs"
          placement="bottom-start"
        >
          <Editable
            isPreviewFocusable={false}
            submitOnBlur={false}
            placeholder={placeholder}
            value={controlProps.field.value}
          >
            <EditablePreview mr="2" fontWeight={fontWeight} overflowWrap="anywhere" fontSize="sm" />
            <Input
              as={EditableInput}
              variant="flushed"
              size="sm"
              {...controlProps.field}
            />
            <EditableControls />
          </Editable>
        </Tooltip>
      )}
    />
  );
}
