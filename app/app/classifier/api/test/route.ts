import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return Response.json({ message: "Hello, world 2!" });
}
