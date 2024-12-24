import { useState, useEffect } from "react";
import { account } from "@/app/appwrite";
import { Models } from "appwrite";
export function useAuth() {
  const [user, setUser] = useState(
    <Models.User<Models.Preferences> | null>null
  );

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        console.log(error);
        setUser(null);
      }
    };
    checkAuth();
  }, []);
  return user;
}
