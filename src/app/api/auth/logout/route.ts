import { account } from "@/app/appwrite";
import { NextResponse } from "next/server";

// Logout function
export async function POST(request: Request) {
  try {
    // Delete the current session
    await account.deleteSession("current");

    // Optionally, clear any client-side state or cookies here
    console.log("Logout successful " + request);
    return NextResponse.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout failed:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
