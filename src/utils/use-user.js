"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import firebase_app from "../config"; // Ensure this points to your Firebase config
import {
  removeUserCookie,
  setUserCookie,
  getUserFromCookie,
} from "../userData/userCookies";
import mapUserData from "../userData/mapUserData";
function useUser() {
  // console.log(useState);
  const [user, setUser] = useState([null]);
  const router = useRouter();
  const auth = getAuth(firebase_app);

  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    const cancelAuthListener = auth.onIdTokenChanged((user) => {
      if (user) {
        const userData = mapUserData(user);
        setUserCookie(userData);
        setUser(userData);
      } else {
        removeUserCookie();
        setUser();
      }
    });

    const userFromCookie = getUserFromCookie();
    if (!userFromCookie) {
      router.push("/");
      return;
    }
    setUser(userFromCookie);

    return () => {
      cancelAuthListener();
    };
  }, []);

  return { user };
}

export { useUser };
