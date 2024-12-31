// utils/get-user-session.js
import { account } from "@/app/appwrite";
import { cookies } from "next/headers";

export async function getUserSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("appwrite_session");
  console.log("Session Cookie:", sessionCookie); // Add logging
  // Session Cookie: { name: 'appwrite_session', value: '67734aba39c553725374', path: '/' }
  if (!sessionCookie) {
    console.log("No session cookie found");
    return null;
  }

  try {
    // produces error here
    const session = await account.getSession(sessionCookie.value);
    console.log("Session retrieved:", session);
    const user = await account.get();
    console.log("User retrieved:", user); // Add logging
    return user;
  } catch (error) {
    console.error("Error getting user session:", error);
    /* 
    Error getting user session: AppwriteException: User (role: guests) missing scope (account)
    at Generator.next (<anonymous>) {
  code: 401,
  type: 'general_unauthorized_scope',
  response: [Object]
}
    */
    return null;
  }
}
