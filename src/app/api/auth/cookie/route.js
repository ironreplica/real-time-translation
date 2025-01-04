// import { initializeApp } from "firebase-admin/app";
import { NextResponse } from "next/server";
import { auth } from "../../../config";
// import { getAuth } from "firebase-admin/auth";

export async function POST(request) {
  console.log("Creating session cookie...");

  // const auth = getAuth(app);
  const body = await request.json();
  const idToken = body.idToken;
  const csrfToken = body.csrfToken;

  // Guard against CSRF attacks.
  if (csrfToken !== request.cookies.get("csrfToken")) {
    return NextResponse.json(
      { error: "UNAUTHORIZED REQUEST!" },
      { status: 401 }
    );
  }

  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  try {
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });
    const response = NextResponse.json({ status: "success" });
    console.log("Session created successfully!");

    response.cookies.set("session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
