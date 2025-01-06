import React from "react";

const InfoLeftWindow = () => {
  return (
    <div className="bg-slate-800 text-lg text-center text-white">
      <div className="text-xl p-4 border border-b-2 border-l-0 border-t-0 border-r-0 w-fit mx-auto border-gray-600 mb-3 ">
        <h1>Info</h1>
      </div>
      <div className="my-3">
        <p className="p-4 font-sans">
          Language Bridge is a proof of concept application that allows users to
          seamlessly translate between different languages. The idea of this
          project is to <strong>bridge the gap</strong> between different
          languages and cultures.
        </p>
        <p className="p-4 font-sans">
          Language Bridge was built using NextJS, TailwindCSS, Mistral.AI, and
          Socket.IO. The current version of the application supports translation
          between English, Spanish, French, and German. The application does not
          support stored message history, or account creation at the moment.
        </p>
      </div>
    </div>
  );
};

export default InfoLeftWindow;
