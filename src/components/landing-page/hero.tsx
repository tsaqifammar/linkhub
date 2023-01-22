import {
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";
import Button from "@/components/ui/button";
import { useState } from "react";

export default function Hero() {
  const [name, setName] = useState("");

  return (
    <Box
      backgroundColor="gray.800"
      minW="100vw"
      minH="100vh"
      py="8"
      overflowX="clip"
    >
      <Box w={["90%", "80%"]} mx="auto">
        <Grid
          gap="5"
          pt="40"
          templateColumns="1fr"
          alignItems="center"
          minH="container.sm"
        >
          <Flex
            direction="column"
            align={{ base: "center", lg: "flex-start" }}
            justifyContent="center"
            justifySelf={{ base: "center", lg: "flex-start" }}
            textAlign={{ base: "center", lg: "left" }}
            gap="6"
            pb="6"
            zIndex="2"
          >
            <Heading color="whiteAlpha.900" size="2xl" maxW="18ch">
              All of who you are, condensed into a single link.
            </Heading>
            <Text color="whiteAlpha.900" fontSize="md" maxW="40ch">
              Connect with others and promote your creations, content, &
              products with a single bio link.
            </Text>
            <Flex
              direction={{ base: "column", lg: "row" }}
              justifyContent="space-between"
              gap="5"
            >
              <InputGroup size="md" maxW={{ lg: "64" }}>
                <InputLeftAddon children="link.hub/" />
                <Input
                  placeholder="yourname"
                  backgroundColor="whiteAlpha.900"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>
              <Button>Claim your linkhub</Button>
            </Flex>
          </Flex>
          <Image
            position={{ lg: "absolute" }}
            right={{ lg: "5", xl: "48" }}
            justifySelf={{ base: "center", lg: "flex-end" }}
            src="/images/hero.svg"
            alt="Product illustration"
            minW={{ lg: "950px" }}
            mr={{ base: "0", lg: "-96" }}
          />
        </Grid>
      </Box>
    </Box>
  );
}
