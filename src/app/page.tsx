import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase_app from "./config";

export default async function Home() {
  const auth = getAuth(firebase_app);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User:", user);
    } else {
      console.log("No user is signed in.");
    }
  });

  return (
    <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)] ">
      <NavBar />
      <HeroSection />
      <Footer />
    </div>
  );
}
