import { NextRequest, NextResponse } from "next/server";
import { fetchAltegio } from "../altegio";

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    const response = await Promise.allSettled([
      fetchAltegio({
        url: `/book_code/146074/channel?phone=${phone.replace(/\D/g, "")}`,
        method: "GET",
      }),
      fetchAltegio({
        url: `/book_code/146074`,
        method: "POST",
        body: {
          phone: phone.replace(/[()]/g, ""),
        },
      }),
    ]).then((results) => {
      return results.every((result) => result.status === "fulfilled");
    });
    if (response) {
      return Response.json(
        { success: true },
        { status: 200, statusText: "Success" }
      );
    } else {
      new Error("Cannot cancel visit 1");
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
