import { Link } from "react-router-dom";
import logo from "../images/pngwing.com (6).png";

export default function Navbar() {
  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div>
            <img className="h-8" src={logo} alt="log" />
          </div>
          <div>
            <ul className="flex items-center">
              <li>
                <Link to="/home" className="btn btn-ghost">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/allBooks" className="btn btn-ghost">
                  All-Books
                </Link>
              </li>
              <li>
                <button className="btn btn-ghost">Button</button>
              </li>
              <li>
                <Link to="/login" className="btn btn-ghost">
                  Log-in
                </Link>
              </li>
              <li>
                <Link to="/signup" className="btn btn-ghost">
                  Sign-up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
