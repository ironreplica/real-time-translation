import React from "react";
import NavLink from "./NavLink";

interface LinkTypes {
  title: string;
  link: string;
}

const leftLinks: LinkTypes[] = [
  { title: "Home", link: "#" },
  { title: "About", link: "#" },
  { title: "Pricing", link: "#" },
];
const rightLinks: LinkTypes[] = [
  { title: "Sign In", link: "#" },
  { title: "Create Account", link: "#" },
];
const NavBar = () => {
  return (
    <div className=" w-full h-[80px] bg-zinc-950 flex flex-row border-b-[2px] border-b-gray-700">
      <div className=" grid grid-cols-2 w-full mx-[300px]">
        <div className="flex flex-row">
          {leftLinks.map((element, index) => (
            <NavLink key={index} title={element.title} link={element.link} />
          ))}
        </div>
        <div className=" flex flex-row-reverse ">
          {rightLinks.map((element, index) => (
            <NavLink key={index} title={element.title} link={element.link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
