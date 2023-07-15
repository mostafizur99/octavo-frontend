import { Outlet } from "react-router-dom";
import NavBar from "../page/Shared/NavBar/NavBar";
import Footer from "../page/Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default MainLayout;
