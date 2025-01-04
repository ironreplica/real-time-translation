"use client";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Home() {
  // const auth = getAuth(firebase_app);

  return (
    <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)] ">
      <NavBar />
      <div className="w-full h-[800px] grid grid-cols-2"></div>
      <Footer />
    </div>
  );
}
