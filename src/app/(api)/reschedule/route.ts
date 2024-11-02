import { NextRequest, NextResponse } from "next/server";
import { fetchAltegio } from "../altegio";

export async function POST(request: NextRequest) {
  try {
    const { location, datetime, visitId, token } = await request.json();
    const response = await fetchAltegio({
      url: `/book_record/${location}/${visitId}`,
      method: "PUT",
      userToken: token,
      body: {
        datetime,
      },
    });

    if (response) {
      return Response.json({ success: true });
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
