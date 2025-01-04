"use client";
import React, { useState } from "react";
import NavLink from "./NavLink";
import Link from "next/link";

import { useAuthContext } from "../api/firebase/context/authContext";

// TODO: Convert to typescript

// interface LinkTypes {
//   title: string;
//   link: string;
// }

const leftLinks = [
  { title: "Language Bridge", link: "/" },
  { title: "Home", link: "#" },
  { title: "About", link: "#" },
  { title: "Pricing", link: "#" },
];
const rightLinks = [
  { title: "Sign In", link: "/login" },
  { title: "Create Account", link: "/create-account" },
];
const rightLinksLoggedIn = [
  { title: "username", link: "#" },
  { title: "Logout", link: "/api/auth/logout" },
];
// interface User {
//   name: string;
//   // Add other properties as needed
// }
// interface AuthContextType {
//   user: User | null;
//   // Add other properties if your context provides more values
// }

const NavBar = () => {
  const { user } = useAuthContext();
  // const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
  //   null
  // );
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch("/api/auth/session", {
  //         credentials: "include", // Ensure cookies are sent with the request
  //       });
  //       if (response.ok) {
  //         const data = await response.json();
  //         setUser(data.user);
  //       } else {
  //         setUser(null);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       setUser(null);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchUserData();
  // }, []);

  // if (isLoading) return <div>Loading...</div>;
  // const { user } = useAuthContext();
  // if (user) {
  // }
  return (
    <div className="w-full h-[80px] bg-gray-950 flex flex-row border-b-[2px] border-gray-900">
      <div className="grid grid-cols-2 w-full mx-[300px]">
        <div className="flex flex-row">
          {leftLinks.map((element, index) =>
            index === 0 ? (
              <div
                key={index}
                className="font-bold text-2xl my-auto px-4 hover:text-violet-400 transition-all duration-200"
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
        <div className="flex flex-row-reverse">
          {user
            ? rightLinksLoggedIn.map((element, index) => (
                <NavLink
                  key={index}
                  title={
                    element.title === "username" ? user.name : element.title
                  }
                  link={element.link}
                />
              ))
            : rightLinks.map((element, index) => (
                <NavLink
                  key={index}
                  title={element.title}
                  link={element.link}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
