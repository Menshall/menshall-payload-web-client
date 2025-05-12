"use client";

import React from "react";
import { useGeneralData } from "@/providers/general";
import dynamic from "next/dynamic";
import { fetchLocalEndpoint } from "@/fetch";
import { Barber } from "@/app-types";

const Slider = dynamic(() => import("./Slider"), {
  ssr: false,
});

const OurBarbers = () => {
  const generalData = useGeneralData();
  const [barbers, setBarbers] = React.useState([]);

  React.useEffect(() => {
    fetchLocalEndpoint({
      url: `barbers`,
      onSuccess: (response) => {
        const barbers: Array<Barber> = response.barbers;
        // @ts-ignore
        setBarbers(barbers);
      },
    });
  }, []);

  return (
    <Slider
      title={generalData.barbers.title}
      buttonText={generalData.barbers.buttonText}
      barbers={barbers}
    />
  );
};

export default OurBarbers;
