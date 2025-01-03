"use client";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import firebase_app from "../config";

interface FormData {
  email: string;
  password: string;
}

export default function Home() {
  const auth = getAuth(firebase_app);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Submit the form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      console.log(formData);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      console.log("User signed in:", user);
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)] ">
      <NavBar />
      <div className="w-full h-[800px] grid grid-cols-2">
        <div className=" bg-gray-900"></div>
        <div className=" flex flex-col items-center my-auto">
          <h1 className=" font-bold text-2xl">Login</h1>
          <form
            action="register"
            onSubmit={handleSubmit}
            className="flex flex-col border border-sky-300 w-[70%] px-3 text-center my-auto"
          >
            <label htmlFor="password">Password</label>
            <input
              onChange={updateField}
              type="password"
              name="password"
              id="password"
              className="bg-inherit border-white border-2 rounded-md"
            />
            <label htmlFor="email">Email</label>
            <input
              onChange={updateField}
              type="email"
              name="email"
              id="email"
              className="bg-inherit border-white border-2 rounded-md"
            />
            <button
              type="submit"
              className="font-bold py-2 px-4 border-white border-2 rounded w-fit h-fit mx-auto my-3"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
