import { NextRequest, NextResponse } from "next/server";
import { fetchAltegio } from "../altegio";

export async function POST(request: NextRequest) {
  try {
    const { location, staff, token, mark, text, name } = await request.json();
    const response = await fetchAltegio({
      url: `/comments/${location}/${staff}`,
      method: "POST",
      userToken: token,
      body: { mark, text, name },
    });

    if (response) {
      return NextResponse.json({ success: true, visits: response });
    } else {
      new Error("Something went wrong. 1");
    }
  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      error: "Fetch user visits failed",
    });
  }
  return NextResponse.json({
    success: false,
    error: "Fetch user visits failed",
  });
}
