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
                <button className="btn btn-ghost">Home</button>
              </li>
              <li>
                <button className="btn btn-ghost">All-books</button>
              </li>
              <li>
                <button className="btn btn-ghost">Button</button>
              </li>
              <li>
                <button className="btn btn-ghost">Log-in</button>
              </li>
              <li>
                <button className="btn btn-ghost">Log-out</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
