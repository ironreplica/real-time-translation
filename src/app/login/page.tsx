"use client";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { GetAiApi } from "../../middleware/get-api-ai";
import { useState } from "react";

interface FormData {
  username: string;
  email: string;
  password: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  GetAiApi();
  return (
    <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)] ">
      <NavBar />
      <div className="w-full h-[800px] grid grid-cols-2">
        <div className=" bg-gray-900"></div>
        {/* https://userpilot.com/blog/sign-up-page-examples/ */}
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
