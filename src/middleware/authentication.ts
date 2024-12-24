import { NextRequest, NextResponse } from "next/server";
import { account } from "@/app/appwrite";

export default async function authentication(req: NextRequest) {
  // implement your authentication logic here
  try {
    await account.get();
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

export const config = {
  matcher: ["/profile/:path*"],
};
