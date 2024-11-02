import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    try {
      const client = await clientPromise;
      const db = client.db("test");

      const projection = { filename: 1, height: 1, width: 1, _key: 1 };

      const data = await db
        .collection("media")
        .find({})
        .project(projection)
        .toArray();

      return Response.json(data, { status: 200, statusText: "Success" });
    } catch (error) {
      throw new Error("fetch service failed");
    }
  } catch (error) {
    return NextResponse.json({
      error: "Failed to fetch data",
    });
  }
}
