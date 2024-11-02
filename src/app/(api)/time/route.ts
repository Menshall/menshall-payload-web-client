import { NextRequest, NextResponse } from "next/server";
import { fetchAltegio } from "../altegio";

export async function POST(request: NextRequest) {
  try {
    const { location, masterId, date, servicesString } = await request.json();
    const response = await fetchAltegio({
      url: `/book_times/${location}/${masterId}/${date}?${servicesString}`,
      method: "GET",
    });
    if (response) {
      return Response.json({ success: true, times: response });
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
    error: "Fetch times failed",
  });
}
