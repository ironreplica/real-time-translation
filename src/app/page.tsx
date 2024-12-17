import Login from "./components/Login";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)] ">
      <NavBar />
      <Login />
    </div>
  );
}
