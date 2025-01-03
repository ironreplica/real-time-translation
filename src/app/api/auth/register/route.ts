import { NextResponse } from "next/server";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import firebase_app from "@/app/config";

export async function POST(request: Request) {
  const auth = getAuth(firebase_app);
  try {
    const { email, password, name } = await request.json();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, { displayName: name });
    console.log("User created:", user); // Add logging

    const response = NextResponse.json({ user });
    response.cookies.set("firebase_session", user.uid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    console.log(
      "Session cookie set:",
      response.cookies.get("firebase_session")
    ); // Add logging

    return response;
  } catch (error) {
    console.error("Error during registration:", error); // Add logging
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
