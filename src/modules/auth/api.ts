import { SignUpProps, User } from "./schema";
import axios from "@/lib/axios";

export async function signUp(info: SignUpProps): Promise<User> {
  return await axios.post("/auth/sign-up", info);
};
