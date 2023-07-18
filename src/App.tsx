import { useEffect } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layout/Layout";
import { useAppDispatch } from "./redux/hook";
import { setLoading, setUser } from "./redux/features/user/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/Firebase";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email!));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);
  return (
    <div>
      <div>
        <Toaster />
        <MainLayout></MainLayout>
      </div>
    </div>
  );
}

export default App;
