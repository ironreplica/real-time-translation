import { NextResponse } from "next/server";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUserCookie } from "../../firebase/userdata/userCookies";
import mapUserData from "../../firebase/userdata/mapUserData";
import firebase_app from "@/app/config";

// Sign in a user
export async function POST(request: Request) {
  const auth = getAuth(firebase_app);

  try {
    const { email, password } = await request.json();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User signed in:", user);

    const userData = mapUserData(user);
    if (userData) {
      setUserCookie(userData);
    }

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
    console.error("Error signing in:", error); // Add logging
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
