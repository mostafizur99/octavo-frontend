import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home/Home/Home";
import Login from "../page/Login/Login";
import NotFound from "../page/NotFound/NotFound";
import MainLayout from "../layouts/MainLayout";
import SignUp from "../page/SignUp/SignUp";

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
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default routers;
