import { NextResponse } from "next/server";
import { auth } from "@/app/config";
// import { getAuth } from "firebase/auth";
// import { setUserCookie } from "../../firebase/userdata/userCookies";
// import mapUserData from "../../firebase/userdata/mapUserData";
// import firebase_app from "@/app/config";
// import firebase from "firebase/compat/app";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
// import { setUserCookie } from "../../firebase/userdata/userCookies";

// TODO: Convert to typescript, type checking and error handling would be very useful here.
// Sign in a user
export async function POST(request) {
  console.log("Logging in user...");

  try {
    const { email, password } = await request.json();
    await setPersistence(auth, browserSessionPersistence);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // console.log(await userCredential.user.getIdToken());
    // setUserCookie(await userCredential.user.getIdToken());
    return NextResponse.json({ success: true, user: userCredential.user });
  } catch (error) {
    console.error("Error signing in:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
