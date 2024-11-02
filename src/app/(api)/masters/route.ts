import { NextRequest, NextResponse } from "next/server";
import { fetchAltegio } from "../altegio";

export async function POST(request: NextRequest) {
  try {
    const { location, query = "" } = await request.json();

    const response = await fetchAltegio({
      url: `/book_staff/${location}?${query}`,
      method: "GET",
    });

    if (response) {
      return Response.json({ success: true, masters: response });
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
    error: "Fetch masters failed",
  });
}
