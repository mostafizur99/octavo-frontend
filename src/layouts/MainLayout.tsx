import { Outlet } from "react-router-dom";
import NavBar from "../page/Shared/NavBar/NavBar";
import Footer from "../page/Shared/Footer/Footer";
import { useAppDispatch } from "../redux/hooks";
import { useEffect } from "react";
import { fetchUserByToken } from "../redux/features/user/userSlice";

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(fetchUserByToken());
    }
  }, [dispatch, token]);

  return (
    <div>
      <NavBar />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default MainLayout;
