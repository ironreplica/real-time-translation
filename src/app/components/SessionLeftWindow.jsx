import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SessionLeftWindow = () => {
  const router = useRouter();
  const [copySuccess, setCopySuccess] = useState(""); // State for feedback message

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href); // Copy current URL to clipboard
      setCopySuccess("Link copied to clipboard!"); // Show success message
      setTimeout(() => {
        setCopySuccess(""); // Clear message after 3 seconds
      }, 3000);
    } catch (err) {
      setCopySuccess("Failed to copy!"); // Show error message if it fails
    }
  };

  return (
    <div className="bg-slate-800 text-lg text-center">
      <div className="text-xl p-4 border border-b-2 border-l-0 border-t-0 border-r-0 w-fit mx-auto border-gray-600 mb-3">
        <h1>Current Session</h1>
      </div>
      <div className="my-3">
        <p>Your currently in a chat session.</p>
      </div>
      <button
        onClick={handleCopyLink} // Call the handleCopyLink function when the button is clicked
        className="mx-auto flex items-center justify-center mb-4 border border-gray-600 rounded-md p-2 hover:bg-slate-700 transition-all duration-200"
      >
        <h1>Copy Chat Link</h1>
        <Image
          src={"/copy.svg"}
          width={20}
          height={20}
          alt="logo"
          style={{ filter: "invert(1)" }}
        />
      </button>

      {copySuccess && ( // Display feedback message if copied
        <div className="text-green-500 text-sm mt-2">{copySuccess}</div>
      )}

      <div className="my-3">
        <p>Want to create a new session?</p>
      </div>
      <button
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
        className="mx-auto flex items-center justify-center mb-4 border border-gray-600 rounded-md p-2 hover:bg-slate-700 transition-all duration-200"
      >
        <h1>Create a new session</h1>
      </button>
    </div>
  );
};

export default SessionLeftWindow;
