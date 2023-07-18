import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home/Home/Home";
import Login from "../page/Login/Login";
import NotFound from "../page/NotFound/NotFound";
import MainLayout from "../layouts/MainLayout";
import SignUp from "../page/SignUp/SignUp";
import AllBooks from "../page/AllBooks/AllBooks";
import AddNewBook from "../page/AddNewBook/AddNewBook";
import PrivateRoute from "./PrivateRoute";
import BookDetails from "../page/BookDetails/BookDetails";
import EditBook from "../page/EditBook/EditBook";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/books",
        element: <AllBooks />,
      },
      {
        path: "/book/:id",
        element: <BookDetails />,
      },
      {
        path: "/edit-book/:id",
        element: <EditBook />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "add-new-book",
        element: (
          <PrivateRoute>
            <AddNewBook />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default routers;
