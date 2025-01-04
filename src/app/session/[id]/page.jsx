// app/[id]/page.jsx
"use client";
import Link from "next/link";
// import Footer from "../../components/Footer";
import HoverableMesssage from "../../components/HoverableMessage";
// import NavBar from "../../components/NavBar";
import Image from "next/image";
import { use } from "react";
import { useEffect, useState } from "react";
import SessionLeftWindow from "@/app/components/SessionLeftWindow";
import InfoLeftWindow from "@/app/components/InfoLeftWindow";
import { useParams } from "next/navigation";

// const sampleMessages = [
//   {
//     time: "12:00",
//     message: "Hello, how are you?",
//     self: false,
//     translatedFrom: "spanish",
//     translatedTo: "english",
//     wasTranslated: true,
//     originalMessage: "Hola, como estas?",
//   },
//   { time: "1:20", message: "I'm alright, you?", self: true },
//   {
//     time: "1:22",
//     message: "Doing great. Just testing things out.",
//     self: false,
//     translatedFrom: "spanish",
//     translatedTo: "english",
//     wasTranslated: true,
//     originalMessage: "Estoy bien, gracias.",
//   },
//   { time: "1:28", message: "I love eating pizza!", self: true },
//   {
//     time: "1:45",
//     message:
//       "I love eating pizza too! It's my favorite food. I want this to be two lines long, sooo I kept typing and typing. How long will this take??? Anyways I hope you have a great day. Its cool being able to talk on this isnt it? :)",
//     self: false,
//     translatedFrom: "spanish",
//     translatedTo: "english",
//     wasTranslated: true,
//     originalMessage: "Me encanta comer pizza también! Es mi comida favorita.",
//   },
//   {
//     time: "2:00",
//     message: "What are your plans for today?",
//     self: false,
//     translatedFrom: "spanish",
//     translatedTo: "english",
//     wasTranslated: true,
//     originalMessage: "¿Cuáles son tus planes para hoy?",
//   },
//   { time: "2:05", message: "I'm going to the park later.", self: true },
//   {
//     time: "2:10",
//     message: "That sounds fun! I might join you.",
//     self: false,
//     translatedFrom: "spanish",
//     translatedTo: "english",
//     wasTranslated: true,
//     originalMessage: "¡Eso suena divertido! Podría unirme a ti.",
//   },
//   { time: "2:15", message: "Sure, see you there!", self: true },
//   {
//     time: "2:20",
//     message: "Do you like playing sports?",
//     self: false,
//     translatedFrom: "spanish",
//     translatedTo: "english",
//     wasTranslated: true,
//     originalMessage: "¿Te gusta practicar deportes?",
//   },
//   { time: "2:25", message: "Yes, I love soccer.", self: true },
//   {
//     time: "2:30",
//     message: "Soccer is my favorite too!",
//     self: false,
//     translatedFrom: "spanish",
//     translatedTo: "english",
//     wasTranslated: true,
//     originalMessage: "¡El fútbol también es mi favorito!",
//   },
//   { time: "2:35", message: "We should play sometime.", self: true },
//   {
//     time: "2:40",
//     message: "Absolutely, let's plan it.",
//     self: false,
//     translatedFrom: "spanish",
//     translatedTo: "english",
//     wasTranslated: true,
//     originalMessage: "Absolutamente, vamos a planearlo.",
//   },
//   { time: "2:45", message: "Great, see you soon!", self: true },
//   {
//     time: "2:50",
//     message: "See you soon!",
//     self: false,
//     translatedFrom: "spanish",
//     translatedTo: "english",
//     wasTranslated: true,
//     originalMessage: "¡Nos vemos pronto!",
//   },
// ];
// interface Message {
//   time: string;
//   message: string;
//   self: boolean;
//   translatedFrom: string;
//   translatedTo: string;
//   wasTranslated: boolean;
//   originalMessage: string;
// }

const leftButtonStyle =
  "w-[80px] h-[80px] mx-auto flex items-center justify-center transition-all duration-200";
const leftButtonStyleSelected =
  "w-[80px] h-[80px] bg-slate-800 mx-auto flex items-center justify-center transition-all duration-200";

export default function Page({ params }) {
  const [messageThread, setMessageThread] = useState([]);
  const [id, setId] = useState(null);
  const [socket, setSocket] = useState(null);
  const [activeWindow, setActiveWindow] = useState("sessions");
  const [selfImgHue, setSelfImgHue] = useState(0);
  const [selfImgSat, setSelfImgSat] = useState(0);
  const [ImgHue, setImgHue] = useState(0);
  const [ImgSat, setImgSat] = useState(0);

  // const params = use(useParams())

  useEffect(() => {
    setSelfImgHue(Math.random() * 360);
    setSelfImgSat(Math.random() * 360);
    setImgHue(Math.random() * 360);
    setImgSat(Math.random() * 360);
    setId(params.id);
  }, []);
  useEffect(() => {
    try {
      if (id) {
        const newSocket = io(`/room-${id}`);
        setSocket(newSocket);

        newSocket.emit("join", id);
        socket.on("message", (data) => {
          console.log(data);
        });
        return () => {
          newSocket.close();
        };
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  return (
    <div className="flex flex-col h-screen font-[family-name:var(--font-geist-sans)]">
      {/* <NavBar /> */}
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
          <div className="bg-slate-600 p-4">
            <h1 className="text-xl">Language Bridge - General Public Chat</h1>
          </div>
          <div className="bg-slate px-3 overflow-y-auto flex-grow">
            {/* Set a max height for the message window */}
            {messageThread.length > 0 &&
              messageThread.map((message, index) => (
                <div key={index} className="flex flex-row text-left py-3">
                  <div className="w-fit pr-3">
                    <Image
                      style={{
                        filter: `hue-rotate(${
                          message.self ? selfImgHue : ImgHue
                        }deg) saturate(${message.self ? selfImgSat : ImgSat}%)`,
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
                      <h1 className="font-semibold mr-3">A user</h1>
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
          <div className="bg-slate-600 rounded grid grid-cols-[5%_95%] my-2 mx-4 p-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log("sending message");
                if (socket != null) {
                  var data = {
                    message: document.querySelector("input[name='message']")
                      .value,
                    time: new Date().toLocaleTimeString(),
                    self: false,
                    translatedFrom: "spanish",
                    translatedTo: "english",
                    wasTranslated: true,
                    originalMessage: "Hola, como estas?",
                  };
                  setMessageThread([...messageThread, data]);
                  messageThread.push(data);
                  var jsonString = JSON.stringify(data);
                  socket.emit("message", jsonString);
                }
              }}
              className="bg-transparent hover:bg-slate-700 transition-all duration-200 rounded-md mx-2"
            >
              Send
            </button>
            <input
              className="bg-transparent w-full h-full text-lg focus:ring-slate-800 focus:border-slate-800 focus:outline-none"
              type="text"
              name="message"
              id=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
