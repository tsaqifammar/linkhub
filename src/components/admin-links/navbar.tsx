import { signOut, useSession } from "next-auth/react";
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { HiOutlineLogout } from "react-icons/hi";
import Button from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";

export default function AdminNavbar() {
  const { data: session } = useSession();
  const currentUser = session?.user;

  const navLinks = [
    { text: "Links", href: "/admin" },
    { text: "Settings", href: "/admin/settings" },
  ];

  const rightComponents = [
    <Button key={0} variant="outline" size={{ base: "sm", lg: "md" }}>
      Share
    </Button>,
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
