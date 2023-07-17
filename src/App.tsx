import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layout/Layout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <div>
          <Toaster />
          <MainLayout></MainLayout>
        </div>
      </div>
    </>
  );
}

export default App;
