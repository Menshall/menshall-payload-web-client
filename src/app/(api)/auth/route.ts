import { NextRequest, NextResponse } from "next/server";
import { fetchAltegio } from "../altegio";

export async function POST(request: NextRequest) {
  try {
    const { phone, code } = await request.json();
    const response = await fetchAltegio({
      url: `/user/auth`,
      method: "POST",
      body: {
        phone: phone.replace(/\D/g, ""),
        code,
        company_id: 146074,
        lang_id: 7,
      },
    });
    if (response) {
      return Response.json(
        { success: true, user: response },
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
