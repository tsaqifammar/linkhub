import { useRouter } from "next/router";

export default function Linkhub() {
  const { query } = useRouter();
  return <>{query.username}</>;
}
