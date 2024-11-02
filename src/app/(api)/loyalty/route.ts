import { NextRequest, NextResponse } from "next/server";
import { fetchAltegio } from "../altegio";

export async function POST(request: NextRequest) {
  try {
    const { token, group, location } = await request.json();
    const response = await fetchAltegio({
      url: `/user/loyalty_cards/${group}/${location}`,
      method: "GET",
      userToken: token,
    });
    if (response) {
      return Response.json({ success: true, loyalties: response });
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
