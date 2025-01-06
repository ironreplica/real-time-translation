import { NextResponse } from "next/server";

const generateSessionId = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generates a random number between 100000 and 999999
};

export async function POST() {
  console.log("hit post request");

  const sessionId = generateSessionId();
  console.log(`Generated session ID: ${sessionId}`); // Add logging
  return NextResponse.json({ sessionId });
}
