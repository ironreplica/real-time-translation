import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { Account, Client } from "appwrite";

export async function middleware(request: NextRequest) {
  console.log("hitting MIDDLEWARE"); // Ensure this log is visible in your server logs
  const sessionCookie = request.cookies.get("appwrite_session");
  const client = new Client();
  client.setProject("676332e900095032dfac");

  if (!sessionCookie) {
    console.error("No session cookie found");
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const account = new Account(client);
  try {
    const result = await account.getSession(sessionCookie.value);
    console.log("RESULT: " + result);
    return NextResponse.next();
  } catch (error) {
    console.error("Session verification error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: "/profile", // Ensure this matches the routes you want to protect
};
