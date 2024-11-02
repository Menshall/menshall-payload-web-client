import React from "react";

import ScheduleComponent from "@/_components/Schedule";
import { Metadata } from "next";
import Header from "@/_components/Schedule/Header";
import { getPage } from "@/lib/enpoints";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Запис на сеанс",
};

export default async function Page() {
  const page = await getPage("schedule");

  if (!page) {
    return notFound();
  }

  return (
    <>
      <Header />
      <ScheduleComponent />
    </>
  );
}
