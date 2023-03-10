import { SignUpProps, User } from "./schema";
import axios from "@/lib/axios";

export async function signUp(info: SignUpProps) {
  return await axios.post<User>("/auth/sign-up", info);
}

export async function checkAvailability(
  field: "username" | "email",
  value: string
) {
  return await axios.get<{
    ok: boolean;
    errors: { field: "username" | "email"; message: string }[];
  }>("/auth/check-availability", {
    params: { [field]: value },
  });
}
