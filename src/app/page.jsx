"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

// interface NavLink {
//   title: string;
//   link: string;
// }
const NavLinks = [
  { title: "Language Bridge", link: "#" },

  {
    title: "GitHub",
    link: "https://github.com/ironreplica/real-time-translation",
  },
];

const languages = [
  "English",
  "Español",
  "Français",
  "Deutsch",
  "中文",
  "日本語",
];
export default function Home() {
  const router = useRouter();
  const [hovering, setIsHovering] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null); // Reference to the button element

  // Update the button position when the component mounts
  useEffect(() => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        x: buttonRect.left + buttonRect.width / 2, // Center of the button
        y: buttonRect.top + buttonRect.height / 2, // Center of the button
      });
    }
  }, []);
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);

  // Update language every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLanguageIndex(
        (prevIndex) => (prevIndex + 1) % languages.length
      ); // Loop through the languages
    }, 2800);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);
  const variants = {
    initial: {
      background: `radial-gradient(circle at ${buttonPosition.x}px ${buttonPosition.y}px, rgba(0, 0, 20, 0.9) 0%, rgba(0, 0, 10, 0.5) 100%)`, // Initial gradient centered on the button
    },
    animate: {
      background: `radial-gradient(circle at ${buttonPosition.x}px ${buttonPosition.y}px, rgba(0, 0, 40, 0.9) 50%, rgba(0, 0, 20, .3) 100%)`, // Animated gradient centered on the button
    },
    hover: {
      background: `radial-gradient(circle at ${buttonPosition.x}px ${buttonPosition.y}px, rgba(0, 0, 30, 1) 0%, rgba(0, 0, 10, 1) 100%)`, // Hover state with gradient centered on the button
    },
  };

  return (
    <motion.div
      variants={variants}
      animate={hovering ? "animate" : "initial"}
      transition={{ duration: 1 }}
      className="items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)] flex flex-col justify-center"
      style={{
        background: `radial-gradient(circle at ${buttonPosition.x}px ${buttonPosition.y}px, rgba(0, 0, 40, .9) 0%, rgba(0, 0, 20, 0.5) 100%)`, // Base background centered on the button
      }}
    >
      <div className="w-full h-[70px] px-[30%] text-center bg-transparent border-b-2 border-b-gray-800 flex justify-between">
        {NavLinks.map((link, index) =>
          link.link === "#" ? (
            <div className="my-auto font-extrabold rounded-xl px-2" key={index}>
              <Link href={link.link}>
                <h1 className="text-xl text-blue-200">{link.title}</h1>{" "}
              </Link>
            </div>
          ) : (
            <div className="my-auto  rounded-xl py-1 px-2" key={index}>
              <Link href={link.link}>
                <h1 className="font-medium text-xl text-blue-200">
                  {link.title}
                </h1>{" "}
              </Link>
            </div>
          )
        )}
      </div>

      <div className="h-[70vh] flex flex-col">
        <div>
          <div className="mb-3 text-4xl font-bold text-center mt-[60px] flex flex-col justify ">
            <h1 className="text-white">
              Bridging the gap between <strong>language</strong> and{" "}
              <strong>culture</strong>
            </h1>
            <h1 className="text-lg font-medium font-sans text-slate-300">
              Connecting cultures, one word at a time.
            </h1>
          </div>
          <motion.h1
            key={languages[currentLanguageIndex]} // A unique key for the list of languages
            className="text-5xl text-white font-extrabold mt-[50px] text-center mb-[200px] "
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              },
            }}
          >
            {languages[currentLanguageIndex]}
          </motion.h1>
        </div>
        <motion.button
          ref={buttonRef} // Attach the ref to the button
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          initial={{
            scale: 1,
            background:
              "linear-gradient(135deg, rgba(0, 0, 60, 0.8) 0%, rgba(0, 0, 60, 0.6) 100%)", // Soft gradient background
            letterSpacing: 1,
          }}
          whileHover={{
            scale: 1.2,
            letterSpacing: 2,
            background:
              "linear-gradient(135deg, rgba(0, 0, 120, 0.9) 0%, rgba(0, 0, 120, 0.8) 100%)", // Slightly brighter gradient on hover
          }}
          transition={{ duration: 0.3 }} // Faster transition for hover effects
          onClick={async (e) => {
            e.preventDefault();
            try {
              const response = await fetch("/api/private-session/create", {
                method: "POST",
              });
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              const sessionId = data.sessionId;
              router.push(`/session/room-${sessionId}`);
            } catch (error) {
              console.error("Failed to create session:", error);
            }
          }}
          className="mx-auto flex items-center justify-center mb-4 border border-gray-600 rounded-md p-2 shadow-md"
        >
          <h1 className="text-white font-semibold text-xl p-3">
            Create a new session
          </h1>{" "}
          {/* Light white text with slight emphasis */}
        </motion.button>
      </div>
      <div
        style={{
          width: "1200px",
          height: "auto",
        }}
      >
        {/* <Image
          src="/bridge.svg"
          width={100}
          height={100}
          alt="bridge"
          className="mx-auto"
          style={{ filter: "invert(1)" }}
        /> */}
      </div>
      <div className="text-lg w-[60%] pb-[80px] pt-[300px] text-center font-thin">
        <h1>
          Combined with <strong>seamless</strong> AI translation and
          near-instant message sending, you can communicate with anyone
          regardless of language barriers. This app uses cutting-edge{" "}
          <strong>machine learning</strong> algorithms to translate text in
          real-time, providing you with accurate and context-aware translations.
          Whether you&apos;re chatting with friends, collaborating with
          colleagues, or engaging in cross-cultural discussions, the{" "}
          <strong>intuitive</strong> interface ensures that the conversation
          flows naturally without interruption. With{" "}
          <strong>advanced AI-powered features</strong> that adapt to your
          unique communication style, you&apos;ll enjoy a smoother and more
          meaningful interaction, bridging linguistic gaps effortlessly.
        </h1>
      </div>
      <Image
        src={"/handshake.svg"}
        width={100}
        height={100}
        alt="handshake"
        style={{ filter: "invert(1)" }} // Fixed the syntax here
      />
      <div className="py-[50px]">
        <Image
          src={"/images/message.png"}
          width={1200}
          height={500}
          alt="message"
        />
      </div>
      <div className="h-[80px] w-full flex text-center">
        <div className="my-auto mx-auto"></div>
      </div>
      {/* Footer */}
      <footer className="w-full bg-transparent text-center py-4 border-t-2 border-gray-800">
        <div className="flex justify-center space-x-6">
          {NavLinks.map((link, index) => (
            <Link key={index} href={link.link}>
              <h1 className="text-lg text-blue-200">{link.title}</h1>
            </Link>
          ))}
        </div>
        <div className="mt-2 text-sm text-gray-400">
          <p> Last updated 1/5/2025.</p>
        </div>
      </footer>
    </motion.div>
  );
}
