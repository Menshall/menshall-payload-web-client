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

  const barbersIDImage = React.useMemo(() => {
    return generalData.barbers.barbers!.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.id as string]: curr.image,
      };
    });
  }, [generalData.barbers.barbers?.length]);

  React.useEffect(() => {
    fetchLocalEndpoint({
      url: `barbers`,
      onSuccess: (response) => {
        const barbers: Array<Barber> = response.barbers;
        setBarbers(
          //@ts-ignore
          barbers.map((b) => {
            return {
              ...b,
              //@ts-ignore
              image: barbersIDImage[b.id] || b.image,
            };
          }),
        );
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
