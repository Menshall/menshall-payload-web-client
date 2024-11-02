//@ts-nocheck
import { NextResponse } from "next/server";
import { fetchAltegio } from "../altegio";
import { Barber } from "@/app-types";

const getCompanyBarbers = async (companies: Array<string>) => {
  let barbers: Array<Barber> = [];

  for (const company of companies) {
    const response = await fetchAltegio({
      url: `/book_staff/${company}`,
      method: "GET",
    });

    const formatted = response.reduce((acc, b) => {
      return [
        ...acc,
        {
          id: b.id,
          name: b.name,
          image: b.avatar_big,
          specialization: b.specialization,
          rating: b.rating,
          location: company,
          bookable: b.bookable,
        },
      ];
    }, []);

    barbers = [...barbers, ...formatted];
  }
  return barbers;
};

export async function POST() {
  try {
    const barbers = await getCompanyBarbers(["146074", "778352"]);
    return Response.json({ success: true, barbers });
  } catch (e) {
    // @ts-ignore
    return NextResponse.json({ success: false, error: e?.message });
  }
  return NextResponse.json({
    success: false,
    error: "Cannot cancel visit 3",
  });
}
