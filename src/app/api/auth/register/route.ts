import { account } from "@/app/appwrite";
import { NextResponse } from "next/server";
import { AppwriteException, ID } from "appwrite";

// Create an account
export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();
    // Create the account
    const user = await account.create(ID.unique(), email, password, name);
    console.log("User created:", user); // Add logging

    // Create a session (log in the user)
    const session = await account.createEmailPasswordSession(email, password);
    console.log("Session created:", session); // Add logging

    const response = NextResponse.json({ user, session });
    response.cookies.set("appwrite_session", session.$id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    console.log(
      "Session cookie set:",
      response.cookies.get("appwrite_session")
    ); // Add logging

    return response;
  } catch (error) {
    const appwriteError = error as AppwriteException;
    console.error("Error during registration:", appwriteError); // Add logging
    return NextResponse.json(
      { error: appwriteError.message },
      { status: appwriteError.code || 400 }
    );
  }
}
