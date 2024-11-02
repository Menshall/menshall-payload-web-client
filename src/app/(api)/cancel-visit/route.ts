import { NextRequest, NextResponse } from "next/server";
import { fetchAltegio } from "../altegio";

export async function POST(request: NextRequest) {
  try {
    const { visitId, token } = await request.json();
    const response = await fetchAltegio({
      url: `/user/records/${visitId}`,
      method: "DELETE",
      userToken: token,
    });
    if (response) {
      return NextResponse.json({ success: true });
    } else {
      new Error("Cannot cancel visit 1");
    }
  } catch (e) {
    return NextResponse.json({ success: false });
  }
  return NextResponse.json({
    success: false,
    error: "Cannot cancel visit 3",
  });
}
