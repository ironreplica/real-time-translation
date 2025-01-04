import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  const roomUserCount = {};
  io.on("connection", (socket) => {
    console.log("New connection:", socket.id);

    socket.on("join", (roomId) => {
      if (!roomUserCount[roomId]) {
        roomUserCount[roomId] = 0;
      }
      if (roomUserCount[roomId] < 2) {
        socket.join(`room-${roomId}`);
        console.log(`Socket ${socket.id} joined room ${roomId}`);
      } else {
        socket.emit("room-full", roomId);
      }
    });

    socket.on("message", (msg) => {
      const parsedMsg = JSON.parse(msg);
      io.to(`room-${parsedMsg.roomId}`).emit("message", msg);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
      // Decreasing user count
      for (const roomId in roomUserCount) {
        if (socket.rooms.has(roomId)) {
          roomUserCount[room]--;
          console.log(`Room ${room} has ${roomUserCount[room]} users`);
          break;
        }
      }
    });
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
