import Link from "next/link";
import React from "react";

interface LinkProps {
  title: string;
  link: string;
}

const NavLink: React.FC<LinkProps> = ({ title, link }) => {
  return (
    <div className=" font-semibold text-xl my-auto px-4">
      <Link href={link}>
        <h1>{title}</h1>
      </Link>
    </div>
  );
};

export default NavLink;
