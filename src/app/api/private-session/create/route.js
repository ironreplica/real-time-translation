// pages/api/socket.js
import { Server } from "socket.io";

export default function handler(req, res) {
  if (req.method === "POST") {
    const sessionId = Math.random().toString(36).substring(7);
    res.status(200).json({ sessionId });
    return;
  }

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
