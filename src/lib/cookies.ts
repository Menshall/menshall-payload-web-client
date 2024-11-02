"use server";
import { cookies } from "next/headers";
import { AccountUser } from "@/app-types";
import { redirect } from "next/navigation";

export async function loginUser({ user }: { user: AccountUser }) {
  // @ts-ignore
  cookies().set("token", user.user_token!);
  // @ts-ignore
  cookies().set("name", user.name);
  // @ts-ignore
  cookies().set("avatar", user.avatar!);
  // @ts-ignore
  cookies().set("phone", user.phone!);

  // @ts-ignore
  if (user?.user_token) {
    redirect("/user-account");
  }
}

export async function logoutUser() {
  // Destroy the session
  cookies().set("token", "", { expires: new Date(0) });
  cookies().set("name", "", { expires: new Date(0) });
  cookies().set("avatar", "", { expires: new Date(0) });
  cookies().set("phone", "", { expires: new Date(0) });
}

export async function getToken() {
  const token = cookies().get("token")?.value;
  if (!token) return null;
  return token;
}

export async function getUser() {
  const token = cookies().get("token")?.value;
  const name = cookies().get("name")?.value;
  const avatar = cookies().get("avatar")?.value;
  const phone = cookies().get("phone")?.value;
  if (!token) return null;
  return { token, name, avatar, phone } as AccountUser;
}
export async function getViewPort() {
  const viewport = cookies().get("viewport")?.value;
  if (!viewport) return null;
  return viewport;
}
