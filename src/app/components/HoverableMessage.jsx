"use client";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const variants = {
  initial: { color: "white" },
  hover: { color: "gray" }, // Scale on hover
};

const HoverableMessage = ({ message, originalMessage }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });
  const divRef = useRef(null); // Create a ref for the div

  useEffect(() => {
    // Measure size after component mounts
    if (divRef.current) {
      const { width, height } = divRef.current.getBoundingClientRect();
      setInitialSize({ width, height }); // Store initial size
    }
  }, []);

  return (
    <motion.div
      ref={divRef} // Attach ref to the motion div
      initial="initial"
      whileHover="hover"
      transition={{ duration: 0.3 }}
      className="grid grid-cols-[95%_5%]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.h1
        // whileHover={{ color: "green" }}
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        {isHovered ? originalMessage : message}
      </motion.h1>
      <Image
        src={"/sparkles.svg"}
        width={25}
        height={25}
        style={{ filter: "invert(1)" }}
        alt="ai-generated-logo"
      />
    </motion.div>
  );
};

export default HoverableMessage;
