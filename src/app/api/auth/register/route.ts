import { account } from "@/app/appwrite";
import { NextResponse } from "next/server";
import { AppwriteException, ID } from "appwrite";

// Create an account
export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    // Create the account
    const user = await account.create("unique()", email, password, name);

    // Create a session (log in the user)
    const session = await account.create(ID.unique(), email, password);

    return NextResponse.json({ user, session });
  } catch (error) {
    const appwriteError = error as AppwriteException;
    return NextResponse.json(
      { error: appwriteError.message },
      { status: appwriteError.code || 400 }
    );
  }
}
