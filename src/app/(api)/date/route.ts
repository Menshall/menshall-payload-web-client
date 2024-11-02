import { NextRequest, NextResponse } from "next/server";
import { fetchAltegio } from "../altegio";

export async function POST(request: NextRequest) {
  try {
    const { location, masterId, date, servicesString } = await request.json();
    const response = await fetchAltegio({
      url: `/book_dates/${location}?staff_id=${masterId}&date=&date_from=${date}&date_to=9999-01-01${servicesString}`,
      method: "GET",
    });
    if (response) {
      return Response.json({ success: true, dates: response.booking_dates });
    } else {
      new Error("Something went wrong. 1");
    }
  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      // @ts-ignore
      error: error?.message,
    });
  }
  return NextResponse.json({
    success: false,
    error: "Fetch dates failed",
  });
}
