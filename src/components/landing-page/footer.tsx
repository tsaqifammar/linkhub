import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";
import Button from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/router";
import FadeInWhenVisible from "../ui/animation/fade-in-when-visible";

export default function Footer() {
  return (
    <>
      <UpperSection />
      <BottomSection />
    </>
  );
}

function UpperSection() {
  const router = useRouter();
  const [name, setName] = useState("");

  return (
    <Box
      backgroundColor="gray.800"
      minW="100vw"
      py={{ base: "16", lg: "24" }}
      overflowX="clip"
    >
      <Box w={{ base: "70%", lg: "80%" }} mx="auto" id="features">
        <Flex
          direction={{ base: "column", lg: "row" }}
          justifyContent="space-between"
          alignItems="center"
          gap="10"
        >
          <FadeInWhenVisible directionTo="right">
            <Heading
              maxW="25ch"
              color="whiteAlpha.900"
              textAlign={{ base: "center", lg: "left" }}
            >
              Start building your online presence{" "}
              <Box
                as="span"
                position="relative"
                zIndex="1"
                _after={{
                  content: `""`,
                  display: "block",
                  position: "absolute",
                  bottom: "-1",
                  right: "1",
                  zIndex: "-1",
                  bgColor: "cyan.700",
                  w: "4ch",
                  h: "2",
                }}
              >
                today
              </Box>
              .
            </Heading>
          </FadeInWhenVisible>
          <FadeInWhenVisible directionTo="left">
            <Flex
              direction={{ base: "column", lg: "row" }}
              align="center"
              justifyContent="space-between"
              gap="5"
            >
              <InputGroup size="lg" maxW={{ lg: "64" }}>
                <InputLeftAddon children="link.hub/" />
                <Input
                  placeholder="yourname"
                  backgroundColor="whiteAlpha.900"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>
              <Button
                size="lg"
                onClick={(e) => {
                  e.preventDefault();
                  router.push({
                    pathname: "/sign-up",
                    query: { username: name },
                  });
                }}
              >
                Claim your linkhub
              </Button>
            </Flex>
          </FadeInWhenVisible>
        </Flex>
      </Box>
    </Box>
  );
}

function BottomSection() {
  return (
    <Box backgroundColor="gray.900" minW="100vw" py="5" overflowX="clip">
      <Box w={{ base: "70%", lg: "80%" }} mx="auto" id="features">
        <Text color="whiteAlpha.900" fontSize="sm" textAlign="center">
          A linktree clone. Made with ❤️ by{" "}
          <a
            href="https://github.com/tsaqifammar"
            style={{ color: "#00B5D8", textDecoration: "underline" }}
          >
            Tsaqif
          </a>
        </Text>
      </Box>
    </Box>
  );
}
