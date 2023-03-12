import { signOut, useSession } from "next-auth/react";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { HiOutlineLogout, HiOutlineShare } from "react-icons/hi";
import Navbar from "@/components/ui/navbar";

export default function AdminNavbar() {
  const { data: session } = useSession();
  const currentUser = session?.user;

  const navLinks = [
    { text: "Links", href: "/admin" },
    { text: "Settings", href: "/admin/settings" },
  ];

  const rightComponents = [
    <ShareButton key={0} username={currentUser?.username as string} />,
    <Menu key={1}>
      <MenuButton>
        <Avatar
          name={currentUser?.username}
          size={{ base: "sm", lg: "md" }}
          cursor="pointer"
        />
      </MenuButton>
      <MenuList>
        <MenuItem
          color="red.600"
          icon={<HiOutlineLogout />}
          onClick={() => signOut()}
        >
          Log out
        </MenuItem>
      </MenuList>
    </Menu>,
  ];

  return (
    <Navbar
      positionType="block"
      links={navLinks}
      rightNodes={rightComponents}
    />
  );
}

function ShareButton(props: { username: string }) {
  const toast = useToast();
  const url = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const { onCopy, value } = useClipboard(`${url}/${props.username}`);

  const handleClick = () => {
    console.log("env?", process.env.NEXT_PUBLIC_BASE_URL);
    console.log("url?", url);
    console.log("value?", value);
    onCopy();
    toast({
      title: "Link successfully copied!",
      position: "bottom-right",
      status: "info",
      isClosable: true,
    });
  };

  return (
    <Button
      variant="outline"
      size={{ base: "sm", lg: "md" }}
      leftIcon={<HiOutlineShare />}
      onClick={handleClick}
    >
      Share
    </Button>
  );
}
