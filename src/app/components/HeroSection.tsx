import React from "react";
import HeroCard from "./HeroCard";

const HeroSection = () => {
  return (
    <div className="w-full h-[1000px]">
      <div className="  mx-[300px] px-3 flex flex-col justify-evenly ">
        <div className="flex flex-col my-5">
          <h1 className="mx-auto text-5xl font-semibold text-center my-auto">
            Lorem ipsum dolor sit amet consectetur.
          </h1>
          <p className="text-xl text-slate-400 text-center">
            Our app enables users to connect through thoughts and ideas,
            transcending language barriers. With AI-powered translation, every
            message is accurately conveyed, fostering authentic expression and
            understanding across cultures. We prioritize the safety of your
            conversations with robust security measures, allowing you to engage
            confidently and explore diverse perspectives while keeping your data
            protected.
          </p>
        </div>
        <div className=" w-full h-[400px] flex flex-row justify-evenly">
          <HeroCard />
          <HeroCard />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
