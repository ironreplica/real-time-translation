import { account } from "@/app/appwrite";
import { NextResponse } from "next/server";
import { AppwriteException } from "appwrite";

// Sign in a user
export async function POST(request: Request) {
  try {
    // await deleteSession("current");
    const { email, password } = await request.json();

    // Create a session (log in the user)
    const session = await account.createEmailPasswordSession(email, password);

    const response = NextResponse.json({ session });
    response.cookies.set("appwrite_session", session.$id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;
  } catch (error) {
    const appwriteError = error as AppwriteException;
    return NextResponse.json(
      { error: appwriteError.message },
      { status: appwriteError.code || 400 }
    );
  }
}
