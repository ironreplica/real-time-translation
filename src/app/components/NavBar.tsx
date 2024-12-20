import React from "react";
import NavLink from "./NavLink";
import Link from "next/link";

interface LinkTypes {
  title: string;
  link: string;
}

const leftLinks: LinkTypes[] = [
  { title: "Language Bridge", link: "#" },
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
    <div className=" w-full h-[80px] bg-zinc-950 flex flex-row border-b-[2px] border-gray-900">
      <div className=" grid grid-cols-2 w-full mx-[300px]">
        <div className="flex flex-row bg-slate-600 ">
          {leftLinks.map((element, index) =>
            index === 0 ? (
              <div
                key={index}
                className=" font-bold text-2xl my-auto px-4 hover:text-violet-400 transition-all duration-200"
              >
                <Link href={element.link}>
                  <h1>{element.title}</h1>
                </Link>
              </div>
            ) : (
              <NavLink key={index} title={element.title} link={element.link} />
            )
          )}
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
