import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
// import { GetAiApi } from "../../middleware/get-api-ai";
export default function Home() {
  //   GetAiApi();
  return (
    <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)] ">
      <NavBar />
      <Footer />
    </div>
  );
}
