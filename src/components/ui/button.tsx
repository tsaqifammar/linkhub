import { Button } from "@chakra-ui/react";

interface ChakraButtonProps extends React.ComponentProps<typeof Button> {
  variant?: "solid" | "outline";
}

export default function CustomButton({
  children,
  variant = "solid",
  ...rest
}: ChakraButtonProps) {
  if (variant === "outline") {
    return (
      <Button
        variant="outline"
        colorScheme="cyan"
        backgroundColor="white"
        _hover={{ backgroundColor: "gray.100" }}
        {...rest}
      >
        {children}
      </Button>
    );
  }
  return (
    <Button
      backgroundColor="cyan.700"
      _hover={{ backgroundColor: "cyan.800" }}
      color="whiteAlpha.900"
      {...rest}
    >
      {children}
    </Button>
  );
}
