import Link from "next/link";
import React from "react";

interface LinkProps {
  title: string;
  link: string;
}

const NavLink: React.FC<LinkProps> = ({ title, link }) => {
  return (
    <div className=" font-semibold text-xl my-auto px-4 hover:text-violet-400 transition-all duration-200">
      <Link href={link}>
        <h1>{title}</h1>
      </Link>
    </div>
  );
};

export default NavLink;
