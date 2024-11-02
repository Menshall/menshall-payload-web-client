import React from "react";
import Header from "@/_components/Header";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/cookies";
import AccountHeader from "@/app/(account)/user-account/_components/AccountHeader";
import { getAccount } from "@/lib/enpoints";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  const account = await getAccount();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      <Header />
      <AccountHeader account={account} user={user} />
      <div className="grid-content">{children}</div>
    </>
  );
}
