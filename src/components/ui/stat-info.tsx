import { HStack, SkeletonText, Text, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

interface StatInfoProps {
  icon: IconType;
  title?: string;
  value?: number;
  isLoading?: boolean;
}

const NUMBER_ERROR = 999999;

export default function StatInfo({ icon, title, value, isLoading = false }: StatInfoProps) {
  const displayTitle = title ? `${title}: ` : "";
  return (
    <HStack>
      <Icon as={icon} color="gray.600" />
      <SkeletonText
        isLoaded={!isLoading}
        noOfLines={1}
        startColor="cyan.100"
        endColor="cyan.200"
      >
        <Text fontSize={{ base: "xs", sm: "sm" }} color="gray.600">
          {displayTitle}{value ?? NUMBER_ERROR}
        </Text>
      </SkeletonText>
    </HStack>
  );
}
