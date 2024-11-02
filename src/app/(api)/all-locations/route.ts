import { NextResponse } from "next/server";
import { fetchAltegio } from "../altegio";

export async function POST() {
  try {
    const response = await fetchAltegio({
      url: `/companies?group_id=126001`,
      method: "GET",
    });
    if (response) {
      return Response.json({ success: true });
    } else {
      new Error("Something went wrong. 1");
    }
  } catch (e) {
    // @ts-ignore
    return NextResponse.json({ success: false, error: e?.message });
  }
  return NextResponse.json({
    success: false,
    error: "Cannot cancel visit 3",
  });
}
