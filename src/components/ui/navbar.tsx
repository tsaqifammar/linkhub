import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Hide,
  HStack,
  IconButton,
  Link,
  LinkBox,
  LinkOverlay,
  Show,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import Button from "@/components/ui/button";
import { HiOutlineMenu } from "react-icons/hi";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navLinks = [
    { text: "Features", href: "#features" },
    { text: "Got Questions?", href: "#questions" },
  ];
  return (
    <>
      <Flex
        justifyContent="space-between"
        backgroundColor="whiteAlpha.900"
        rounded="2xl"
        w={["90%", "80%"]}
        mx="auto"
        px={{ base: "5", lg: "20" }}
        py="3"
        position="fixed"
        top="10"
        left="0"
        right="0"
        zIndex="3"
        wrap="wrap"
        shadow="sm"
      >
        <HStack spacing="8" align="center">
          <Heading size={{ base: "md", lg: "lg" }}>Linkhub</Heading>
          <Show above="md">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                as={NextLink}
                href={link.href}
                fontSize={{ base: "sm", lg: "md" }}
                color="gray.600"
              >
                {link.text}
              </Link>
            ))}
          </Show>
        </HStack>
        <HStack>
          <NextLink href="/login">
            <Button variant="outline" size={{ base: "sm", lg: "md" }}>
              Log In
            </Button>
          </NextLink>
          <NextLink href="/sign-up">
            <Button variant="solid" size={{ base: "sm", lg: "md" }}>
              Sign Up
            </Button>
          </NextLink>
          <Hide above="md">
            <IconButton
              aria-label="Nav Links"
              icon={<HiOutlineMenu />}
              onClick={onOpen}
            />
          </Hide>
        </HStack>
      </Flex>
      <Drawer placement="right" isOpen={isOpen} onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack spacing="5" pt="14">
              {navLinks.map((link, idx) => (
                <React.Fragment key={idx}>
                  <LinkBox
                    as="div"
                    w="full"
                    p="3"
                    rounded="md"
                    _hover={{ backgroundColor: "gray.100" }}
                  >
                    <LinkOverlay as={NextLink} href={link.href}>
                      <Text as="b" fontSize="2xl">
                        {link.text}
                      </Text>
                    </LinkOverlay>
                  </LinkBox>
                  {idx !== navLinks.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
