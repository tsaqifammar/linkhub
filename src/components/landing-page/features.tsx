import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import featureImage1 from "../../../public/images/feature1.svg";
import featureImage2 from "../../../public/images/feature2.svg";
import featureImage3 from "../../../public/images/feature3.svg";

interface FeatureItem {
  image: string;
  title: string;
  description: string;
}

const featuresData: FeatureItem[] = [
  {
    image: featureImage1,
    title: "Customize your bio",
    description:
      "Streamline all your online presence with a bio link landing page designed for conversion.",
  },
  {
    image: featureImage2,
    title: "Share your link",
    description:
      "Include your personal link in all the platforms and places where your target audience can be found.",
  },
  {
    image: featureImage3,
    title: "Analyze & engage",
    description:
      "Monitor engagement, revenue, and conversions to improve audience retention and engagement.",
  },
];

export default function Features() {
  return (
    <Box
      backgroundColor="cyan.100"
      minW="100vw"
      py="20"
      overflowX="clip"
    >
      <Box w={["90%", "70%"]} mx="auto" id="features" textAlign="center">
        <Heading>Our features</Heading>
        <Flex
          direction={{ base: "column", lg: "row" }}
          justifyContent={{ base: "flex-start", lg: "space-between" }}
          gap={{ base: "12", lg: "32" }}
          py="12"
        >
          {featuresData.map((item, idx) => (
            <FeatureItemCard key={idx} {...item} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
}

function FeatureItemCard({ image, title, description }: FeatureItem) {
  return (
    <VStack gap="3">
      <Image
        src={image}
        alt={title}
        height={150}
      />
      <Heading size="lg">{title}</Heading>
      <Text>{description}</Text>
    </VStack>
  );
}
