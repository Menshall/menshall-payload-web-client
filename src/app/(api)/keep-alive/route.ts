import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
  return NextResponse.json({ ok: true });
}
