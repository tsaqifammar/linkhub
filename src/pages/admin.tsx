import { signOut } from "next-auth/react";

export default function Admin() {
  return (
    <>
      <div>Hello world</div>
      <button onClick={() => signOut()}>Log out</button>
    </>
  );
}
