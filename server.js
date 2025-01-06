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

  io.on("connection", (socket) => {
    console.log("New connection:", socket.id);

    socket.on("join", (roomId) => {
      socket.join(`room-${roomId}`);
      console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    socket.on("message", (msg) => {
      const parsedMsg = JSON.parse(msg);
      io.to(`room-${parsedMsg.roomId}`).emit("message", msg);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", socket.id, "Reason:", reason);
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
