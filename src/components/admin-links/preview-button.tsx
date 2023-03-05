import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Button from "@/components/ui/button";
import LinksView, { LinksViewProps } from "./links-view";
import { HiOutlineEye } from "react-icons/hi";

export function PreviewButton(props: LinksViewProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        variant="outline"
        size="sm"
        position="fixed"
        left="8"
        bottom="8"
        zIndex="1"
        leftIcon={<HiOutlineEye />}
        boxShadow="dark-lg"
      >
        Preview
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} size="full" placement="bottom">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Linkhub Preview</DrawerHeader>
          <DrawerBody>
            <Box
              rounded="3xl"
              borderColor="black"
              borderWidth="12px"
              mx="auto"
              my="6"
              maxW="96"
              h="1"
              minH="680px"
              overflowY="auto"
              __css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <LinksView username={props.username} links={props.links} />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
