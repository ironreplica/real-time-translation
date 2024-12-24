import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";
import { Client } from "appwrite";

export default function Home() {
  const client = new Client();
  client.setProject("676332e900095032dfac");
  return (
    <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)] ">
      <NavBar />
      <HeroSection />
      <Footer />
    </div>
  );
}
