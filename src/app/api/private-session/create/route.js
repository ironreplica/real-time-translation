import { Server } from "socket.io";
import { NextResponse } from "next/server";

const generateSessionId = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generates a random number between 100000 and 999999
};

export async function POST() {
  const sessionId = generateSessionId();
  return NextResponse.json({ sessionId });
}

export function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.of(/^\/room-\d+$/).on("connection", (socket) => {
      const namespace = socket.nsp;
      console.log(`New connection to ${namespace.name}`);

      socket.on("join", (roomId) => {
        socket.join(roomId);
        console.log(`User joined room ${roomId}`);
      });

      socket.on("message", (msg) => {
        namespace.to(msg.roomId).emit("message", msg);
      });
    });
  }
  res.end();
}
