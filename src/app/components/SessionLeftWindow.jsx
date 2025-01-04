import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SessionLeftWindow = () => {
  const router = useRouter();
  return (
    <div className="bg-slate-800 text-lg text-center">
      <div className="text-xl p-4 border border-b-2 border-l-0 border-t-0 border-r-0 w-fit mx-auto border-gray-600 mb-3">
        <h1>Current Session</h1>
      </div>
      <div className="my-3">
        <p>Your currently in a chat session.</p>
      </div>
      <button className="mx-auto flex items-center justify-center mb-4 border border-gray-600 rounded-md p-2 hover:bg-slate-700 transition-all duration-200">
        <h1>Copy Chat Link</h1>
        <Image
          src={"/copy.svg"}
          width={20}
          height={20}
          alt="logo"
          style={{ filter: "invert(1)" }}
        />
      </button>
      <div className="my-3">
        <p>Want to create a new session?</p>
      </div>
      <button
        onClick={async (e) => {
          // * Create a new session button
          e.preventDefault();
          const response = await fetch("/api/private-session/create", {
            method: "POST",
          });
          const data = await response.json();
          const sessionId = data.sessionId;
          // Navigate to the new session room
          router.push(`/session/room-${sessionId}`);
        }}
        className="mx-auto flex items-center justify-center mb-4 border border-gray-600 rounded-md p-2 hover:bg-slate-700 transition-all duration-200"
      >
        <h1>Create a new session</h1>
        {/* <Image
                    src={"/chat.svg"}
                    width={20}
                    height={20}
                    alt="logo"
                    style={{ filter: "invert(1)" }}
                  /> */}
      </button>
    </div>
  );
};

export default SessionLeftWindow;
