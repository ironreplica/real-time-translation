import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase_app from "@/app/config";

export async function middleware(request: NextRequest) {
  console.log("hitting MIDDLEWARE"); // Ensure this log is visible in your server logs
  const sessionCookie = request.cookies.get("firebase_session");
  const auth = getAuth(firebase_app);

  if (!sessionCookie) {
    console.error("No session cookie found");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = await new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });

  if (user) {
    console.log("User verified:", user);
    return NextResponse.next();
  } else {
    console.error("Session verification error: No user found");
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/profile"], // Ensure this matches the routes you want to protect
};
