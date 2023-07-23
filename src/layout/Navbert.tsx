/* eslint-disable @typescript-eslint/no-floating-promises */
import { Link } from "react-router-dom";
import logo from "../images/pngwing.com (6).png";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setUser } from "../redux/features/user/userSlice";
import { auth } from "../firebase/Firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const { user } = useAppSelector((state) => state.user);
  console.log(user);
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null));
    });
  };
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
                <Link to="/addBooks" className="btn btn-ghost">
                  Add-Books
                </Link>
              </li>
              {!user.email ? (
                <>
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
                </>
              ) : (
                <li>
                  <button onClick={handleLogOut} className="btn btn-ghost">
                    log-out
                  </button>
                </li>
              )}
              <li className="flex bg-slate-300 p-3 rounded-lg">
                <p className="font-bold">User-</p>
                {user?.email ? (
                  <p className="">{user?.email}</p>
                ) : (
                  <p>user not login</p>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
