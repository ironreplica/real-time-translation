"use client";
import React from "react";
import Loading from "@/app/components/Loading";
import { onAuthStateChanged, getAuth } from "firebase/auth";
// import { User as FirebaseUser } from "firebase/auth";
import firebase_app from "@/app/config";

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext([]);

export const useAuthContext = () => React.useContext(AuthContext);

export const LogOut = () => {
  auth.signOut();
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = (React.useState < FirebaseUser) | (null > null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
