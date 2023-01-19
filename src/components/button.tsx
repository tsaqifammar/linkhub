import { Button } from "@chakra-ui/react";

type ChakraButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "variant"
> & {
  variant?: "solid" | "outline";
};

export default function CustomButton({
  children,
  variant,
  ...rest
}: ChakraButtonProps) {
  if (variant === "outline") {
    return (
      <Button variant="outline" colorScheme="cyan" {...rest}>
        Log In
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
