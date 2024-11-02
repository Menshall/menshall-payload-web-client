import React from "react";
import { getReviews } from "@/lib/enpoints";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("./Slider"), {
  ssr: false,
});

const CustomerReviews = async () => {
  const reviews = await getReviews();

  return <Slider reviews={reviews} />;
};

export default CustomerReviews;
