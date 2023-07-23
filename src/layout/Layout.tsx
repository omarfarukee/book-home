import { Outlet } from "react-router-dom";
import Navbar from "./Navbert";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className="pt-16 mb-10">
        <Outlet />
      </div>
    </div>
  );
}
