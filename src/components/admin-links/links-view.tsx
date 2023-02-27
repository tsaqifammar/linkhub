import { LinksFormProps } from "@/modules/admin";
import NextLink from "next/link";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Link,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";

interface LinksViewProps {
  username: string;
  links: LinksFormProps;
}

export default function LinksView(props: LinksViewProps) {
  const { links, appearance } = props.links;
  const backgroundProps =
    appearance.colorMode === "solid"
      ? {
          bgColor: appearance.linkhubBackgroundColor1,
        }
      : {
          bgGradient: `linear(to-b, ${appearance.linkhubBackgroundColor1}, ${appearance.linkhubBackgroundColor2})`,
        };

  return (
    <Box
      w="full"
      minH="full"
      color={appearance.linkhubTextColor}
      {...backgroundProps}
    >
      <Flex
        w="90%"
        maxW="xl"
        flexDirection="column"
        mx="auto"
        py="12"
        alignItems="center"
        gap="5"
      >
        <Avatar name={props.username} size="lg" bgColor="black" />
        <Heading size="md" my="4">
          @{props.username}
        </Heading>
        {links.map((link, idx) =>
          link.enabled ? (
            <LinkCard key={idx} title={link.title} url={link.url} />
          ) : null
        )}
        <Link
          as={NextLink}
          href="/"
          fontWeight="bold"
          color={appearance.linkhubTextColor}
          pt="4"
        >
          Linkhub
        </Link>
      </Flex>
    </Box>
  );
}

interface LinkCardProps {
  url: string;
  title: string;
}

function LinkCard({ url, title }: LinkCardProps) {
  return (
    <LinkBox
      backgroundColor="white"
      rounded="lg"
      w="full"
      py="3"
      px={{ base: "5", lg: "20" }}
      textAlign="center"
      border="1px"
      borderColor="gray.300"
    >
      <Heading size="sm" my="2" color="black">
        <LinkOverlay href={url} target="_blank">
          {title}
        </LinkOverlay>
      </Heading>
    </LinkBox>
  );
}
