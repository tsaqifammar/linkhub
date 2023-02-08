import { getAnalytics } from "@/modules/admin";
import {
  Flex,
  Heading,
  HStack,
  Show,
} from "@chakra-ui/react";
import React from "react";
import { HiOutlineCursorClick, HiOutlineEye } from "react-icons/hi";
import { useQuery } from "react-query";
import StatInfo from "../ui/stat-info";

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
          value={data?.data.visitCount}
        />
        <StatInfo
          icon={HiOutlineEye}
          title="Total link views"
          isLoading={isLoading}
          value={data?.data.totalLinkViews}
        />
      </HStack>
    </Flex>
  );
}
