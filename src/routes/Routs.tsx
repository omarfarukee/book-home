import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUpPage from "../pages/SignUp";
import AllBooksFetch from "../pages/allBooks/AllBooksFecth";
import BooksDetails from "../pages/allBooks/BookesDetails";
import AddNewBook from "../pages/addBook/AddNewBook";
import EditBooks from "../pages/allBooks/EditBook";
import { PrivateRoute } from "./PrivateRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/allBooks",
        element: <AllBooksFetch />,
      },
      {
        path: "/addBooks",
        element: (
          <PrivateRoute>
            <AddNewBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/allBooks/edit/:id",
        element: <EditBooks />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/allBooks/:id",
        element: <BooksDetails />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default routes;
