import { Flex, Hide, IconButton } from "@chakra-ui/react";
import { RxReset } from "react-icons/rx";
import Button from "@/components/ui/button";
import { HiOutlineSave } from "react-icons/hi";

interface SaveResetButtonProps {
  onReset: () => void;
  isLoading?: boolean;
  isDirty?: boolean;
}

const styles = {
  save: {
    backgroundColor: "cyan.700",
    _hover: { backgroundColor: "cyan.800" },
    color: "whiteAlpha.900",
    boxShadow: "dark-lg",
  },
  reset: {
    variant: "outline",
    colorScheme: "cyan",
    backgroundColor: "white",
    _hover: { backgroundColor: "gray.100" },
    boxShadow: "dark-lg",
  },
};

export default function SaveResetButton({
  onReset,
  isLoading = false,
  isDirty = true,
}: SaveResetButtonProps) {
  const breakpoint = "lg" as const;

  return (
    <>
      <Hide above={breakpoint}>
        <Flex direction="column" gap="4" position="fixed" right="8" bottom="8">
          <IconButton
            aria-label="Cancel"
            type="button"
            isDisabled={!isDirty || isLoading}
            icon={<RxReset />}
            zIndex="1"
            {...styles["reset"]}
            onClick={onReset}
          />
          <IconButton
            aria-label="Save"
            type="submit"
            isDisabled={!isDirty}
            isLoading={isLoading}
            icon={<HiOutlineSave />}
            zIndex="1"
            {...styles["save"]}
          />
        </Flex>
      </Hide>
      <Hide below={breakpoint}>
        <Flex gap="4">
          <Button type="submit" isDisabled={!isDirty} isLoading={isLoading}>
            Save
          </Button>
          <Button
            type="button"
            variant="outline"
            isDisabled={!isDirty || isLoading}
            onClick={onReset}
          >
            Reset
          </Button>
        </Flex>
      </Hide>
    </>
  );
}
