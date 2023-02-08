import { Flex } from "@chakra-ui/react";
import Button from "@/components/ui/button";

interface SaveResetButtonProps {
  onReset: () => void;
  isDirty?: boolean;
};

export default function SaveResetButton({ onReset, isDirty = true }: SaveResetButtonProps) {
  return (
    <Flex gap="4">
      <Button type="submit" isDisabled={!isDirty}>
        Save
      </Button>
      <Button
        type="button"
        variant="outline"
        isDisabled={!isDirty}
        onClick={onReset}
      >
        Reset
      </Button>
    </Flex>
  )
}
