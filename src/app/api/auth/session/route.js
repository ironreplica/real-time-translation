// app/api/auth/session/route.js
import { NextResponse } from "next/server";
import { getUserSession } from "@/utils/get-user-session";

export async function GET() {
  console.log("Hit the /api/auth/session route");
  const session = await getUserSession();
  console.log("Session:", session);
  if (session) {
    return NextResponse.json({ user: session.userId }, { status: 200 });
  } else {
    console.log("No valid session found");
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
}
