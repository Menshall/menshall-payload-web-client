import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST() {
  try {
    const cookiesStore = cookies();

    const response = cookiesStore.getAll();

    if (response) {
      return Response.json({ success: true, data: response });
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
