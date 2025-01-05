"use client";
import Link from "next/link";
import HoverableMesssage from "../../components/HoverableMessage";
import Image from "next/image";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import SessionLeftWindow from "@/app/components/SessionLeftWindow";
import InfoLeftWindow from "@/app/components/InfoLeftWindow";
import { useParams } from "next/navigation";

const leftButtonStyle =
  "w-[80px] h-[80px] mx-auto flex items-center justify-center transition-all duration-200";
const leftButtonStyleSelected =
  "w-[80px] h-[80px] bg-slate-800 mx-auto flex items-center justify-center transition-all duration-200";

export default function Page() {
  const params = useParams();
  const [messageInput, setMessageInput] = useState("");
  const [myLanguage, setMyLanguage] = useState("english");
  const [messageThread, setMessageThread] = useState([]);
  const [id, setId] = useState(null);
  const [socket, setSocket] = useState(null);
  const [activeWindow, setActiveWindow] = useState("sessions");
  const [selfImgHue, setSelfImgHue] = useState(0);
  const [selfImgSat, setSelfImgSat] = useState(0);

  useEffect(() => {
    setId(params.id);
  }, [params.id]);
  useEffect(() => {
    setSelfImgHue(Math.floor(Math.random() * 360));
    setSelfImgSat(Math.floor(Math.random() * 100));
  }, []);
  useEffect(() => {
    if (id) {
      const newSocket = io(`http://localhost:3000`, {
        path: "/socket.io",
        transports: ["websocket"],
      });
      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("Connected to Socket.IO with ID:", newSocket.id);
        newSocket.emit("join", id);
      });

      newSocket.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      newSocket.on("message", async (data) => {
        let newData = JSON.parse(data);
        if (newData.socketId !== newSocket.id) {
          newData.self = false;

          let translation;
          // Call translate api, store original message and set translated to true
          console.log(console.log(newData.messageLanguage, myLanguage));
          if (newData.messageLanguage !== myLanguage) {
            try {
              const response = await fetch("/api/ai", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userMessage: newData.message,
                  language: myLanguage,
                }),
              });
              const result = await response.json();
              translation = result.response;
            } catch (error) {
              console.error("Error fetching AI API:", error);
            }
            newData.wasTranslated = true;
            newData.originalMessage = newData.message;
            newData.message = translation;
          }
          // Using functional update to ensure you're using the latest state
          console.log("Received message:", newData);
          setMessageThread((prevMessages) => [...prevMessages, newData]);
        }
      });

      return () => {
        newSocket.disconnect();
        console.log("Socket disconnected");
      };
    }
  }, [id, myLanguage]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (socket != null) {
      const data = {
        message: messageInput,
        time: new Date().toLocaleTimeString(),
        roomId: id,
        socketId: socket.id,
        self: true,
        messageLanguage: myLanguage,
        hue: selfImgHue,
        sat: selfImgSat,
      };
      console.log("sending: ", data);
      setMessageThread((prevMessages) => [...prevMessages, data]);
      const jsonString = JSON.stringify(data);
      console.log(messageThread);
      socket.emit("message", jsonString);
      setMessageInput(""); // Clear input after sending
    }
  };

  return (
    <div className="flex flex-col h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="flex w-full h-full">
        <div className="bg-slate-900 w-1/5 grid grid-cols-[20%_80%]">
          <div className="bg-slate-900 flex flex-col items-center">
            <Link href={"#"}>
              <Image
                src={"/bridge.svg"}
                width={70}
                height={70}
                alt="logo"
                style={{ filter: "invert(1)" }}
              />
            </Link>
            <button
              onClick={() => setActiveWindow("sessions")}
              className={
                activeWindow == "sessions"
                  ? leftButtonStyleSelected
                  : leftButtonStyle
              }
            >
              <Image
                src={"/chat.svg"}
                width={40}
                height={40}
                alt="logo"
                style={{ filter: "invert(1)" }}
              />
            </button>
            <button
              onClick={() => setActiveWindow("info")}
              className={
                activeWindow == "info"
                  ? leftButtonStyleSelected
                  : leftButtonStyle
              }
            >
              <Image
                src={"/info.svg"}
                width={40}
                height={40}
                alt="logo"
                style={{ filter: "invert(1)" }}
              />
            </button>
            <button className="w-[80px] h-[80px]  mx-auto flex items-center justify-center mb-4 ">
              <Image
                src={"/leave.svg"}
                width={40}
                height={40}
                alt="logo"
                style={{ filter: "invert(1)" }}
              />
            </button>
          </div>
          {activeWindow === "sessions" ? (
            <SessionLeftWindow />
          ) : activeWindow === "info" ? (
            <InfoLeftWindow />
          ) : (
            <div>Error</div>
          )}
        </div>
        <div className="bg-slate-950 w-4/5 flex flex-col">
          <div className="bg-slate-600 p-4 flex flex-row justify-between">
            <h1 className="text-xl">Language Bridge - General Public Chat</h1>
            <select
              className="bg-slate-700 text-white pr-4 rounded"
              value={myLanguage}
              onChange={(e) => setMyLanguage(e.target.value)}
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
            </select>
          </div>
          <div className="bg-slate px-3 overflow-y-auto flex-grow">
            {messageThread.length > 0 &&
              messageThread.map((message, index) => (
                <div key={index} className="flex flex-row text-left py-3">
                  <div className="w-fit pr-3">
                    <Image
                      style={{
                        filter: `hue-rotate(${
                          message.self ? selfImgHue : message.hue
                        }deg) saturate(${
                          message.self == socket.id ? selfImgSat : message.sat
                        }%)`,
                      }}
                      src={"/images/geometric_1.jpg"}
                      width={70}
                      alt="profile-pic"
                      height={100}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col justify-between my-auto h-full text-lg w-full">
                    <div className="flex flex-row my-auto text-center">
                      <h1 className="font-semibold mr-3">
                        {message.self ? "(You)" : "A User"}
                      </h1>
                      <h1 className="text-slate-500 text-sm my-auto">
                        {message.time}
                      </h1>
                    </div>
                    {message.wasTranslated ? (
                      <HoverableMesssage
                        message={message.message}
                        originalMessage={message.originalMessage}
                      />
                    ) : (
                      <div>
                        <h1>{message.message}</h1>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
          <div className="bg-slate-600 rounded grid grid-cols-[95%_5%] my-2 mx-4 p-2">
            <input
              className="bg-transparent w-full h-full text-lg focus:ring-slate-800 focus:border-slate-800 focus:outline-none"
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage(e);
              }}
              name="message"
              id=""
            />
            <button
              onClick={handleSendMessage}
              className="bg-transparent hover:bg-slate-700 transition-all duration-200 rounded-md mx-2"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
