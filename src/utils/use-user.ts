"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, User as FirebaseUser, Unsubscribe } from "firebase/auth";
import firebase_app from "../app/config"; // Ensure this points to your Firebase config
import {
  removeUserCookie,
  setUserCookie,
  getUserFromCookie,
} from "../app/api/firebase/userdata/userCookies";

interface UserData {
  uid: string;
  email: string;
  token: string;
  name: string;
  profilePic: string;
}

function mapUserData(user: FirebaseUser): UserData {
  const { uid, email, displayName, photoURL } = user;

  return {
    uid: uid,
    email: email || "",
    token: user.refreshToken,
    name: displayName || "",
    profilePic: photoURL || "",
  };
}

function useUser() {
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();
  const auth = getAuth(firebase_app);

  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    const cancelAuthListener: Unsubscribe = auth.onIdTokenChanged(
      (user: FirebaseUser | null) => {
        if (user) {
          const userData = mapUserData(user);
          setUserCookie(userData);
          setUser(userData);
        } else {
          removeUserCookie();
          setUser(null);
        }
      }
    );

    const userFromCookie = getUserFromCookie();
    if (!userFromCookie) {
      router.push("/"); // Ensure this is the correct route
      return;
    }
    setUser(mapUserData(userFromCookie as FirebaseUser));

    return () => {
      cancelAuthListener();
    };
  }, [auth, router]);

  return { user };
}

export { useUser };
