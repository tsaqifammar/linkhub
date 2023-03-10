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
import { useRouter } from "next/router";
import React from "react";
import { HiOutlineMenu } from "react-icons/hi";

interface NavbarProps {
  positionType: "fixed" | "block";
  links?: { text: string, href: string }[];
  rightNodes?: React.ReactNode[];
}

export default function Navbar({ links, rightNodes, positionType }: NavbarProps) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navLinks = [
    { text: "Features", href: "#features" },
    { text: "Got Questions?", href: "#questions" },
  ];

  const positionTypeProps: Partial<React.ComponentProps<typeof Flex>> =
    positionType === "block"
      ? {
          w: "full",
        }
      : {
          position: "fixed",
          w: "inherit",
          top: "10",
          left: "0",
          right: "0",
          zIndex: "3",
        };

  return (
    <>
      <Flex
        justifyContent="space-between"
        backgroundColor="whiteAlpha.900"
        rounded="2xl"
        mx="auto"
        px={{ base: "5", lg: "20" }}
        py="3"
        {...positionTypeProps}
        wrap="wrap"
        border="1px"
        borderColor="gray.300"
      >
        <HStack spacing="12" align="center">
          <Heading size={{ base: "md", lg: "lg" }}>Linkhub</Heading>
          <Show above="md">
            {links?.map((link, idx) => (
              <Link
                key={idx}
                as={NextLink}
                href={link.href}
                fontSize={{ base: "sm", lg: "md" }}
                color={router.pathname  === link.href ? "gray.800" : "gray.600"}
              >
                {link.text}
              </Link>
            ))}
          </Show>
        </HStack>
        <HStack spacing={{ base: "3", lg: "8" }}>
          {rightNodes?.map((node, idx) => (
            <React.Fragment key={idx}>
              {node}
            </React.Fragment>
          ))}
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
              {links?.map((link, idx) => (
                <React.Fragment key={idx}>
                  <LinkBox
                    as="div"
                    w="full"
                    p="3"
                    rounded="md"
                    _hover={{ backgroundColor: "gray.100" }}
                    onClick={onClose}
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
