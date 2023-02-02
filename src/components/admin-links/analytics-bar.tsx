import { getAnalytics } from "@/modules/admin";
import {
  Flex,
  Heading,
  HStack,
  Text,
  Icon,
  Show,
  SkeletonText,
  Hide,
} from "@chakra-ui/react";
import React from "react";
import { HiOutlineCursorClick, HiOutlineEye } from "react-icons/hi";
import { IconType } from "react-icons/lib";
import { useQuery } from "react-query";

interface StatInfoProps {
  icon: IconType;
  title: string;
  value: number;
  isLoading?: boolean;
}

function StatInfo({ icon, title, value, isLoading = false }: StatInfoProps) {
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
          {title}: {value}
        </Text>
      </SkeletonText>
    </HStack>
  );
}

const NUMBER_ERROR = 999999;

export default function AnalyticsBar() {
  const { data, isLoading } = useQuery("analytics", getAnalytics);

  return (
    <Flex
      alignItems="center"
      backgroundColor="whiteAlpha.900"
      gap="4"
      w="full"
      px="5"
      py="3"
      wrap="wrap"
      rounded="2xl"
      border="1px"
      borderColor="gray.300"
    >
      <Show above="sm">
        <Heading size={{ base: "xs", sm: "sm" }}>Analytics</Heading>
      </Show>
      <HStack spacing="4">
        <StatInfo
          icon={HiOutlineCursorClick}
          title="Linkhub visits"
          isLoading={isLoading}
          value={data?.data.visitCount ?? NUMBER_ERROR}
        />
        <StatInfo
          icon={HiOutlineEye}
          title="Total link views"
          isLoading={isLoading}
          value={data?.data.totalLinkViews ?? NUMBER_ERROR}
        />
      </HStack>
    </Flex>
  );
}
