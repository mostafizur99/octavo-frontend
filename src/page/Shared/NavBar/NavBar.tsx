import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import logoImg from "../../../assets/images/logo/logo-main.png";
import mainMenu from "../../../assets/data/menu/mainMenu.json";
import loginMenu from "../../../assets/data/menu/loginMenu.json";
import userAvatar from "../../../assets/images/avatar.jpg";
import ProfileMenu from "./ProfileMenu";
import MobileMenu from "./MobileMenu";
import { useAppSelector } from "../../../redux/hooks";

const NavBar = () => {
  const { user: userData } = useAppSelector((state) => state.user);
  console.log("user a nav =>", userData);
  const location = useLocation();
  const path = location.pathname;

  const [show, setShow] = useState(false);
  const [UserMenu, setUserMenu] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const UserMenuHandler = () => {
    setUserMenu(!UserMenu);
  };

  return (
    <>
      {/* Header Component */}
      <header className="shadow-sm">
        <nav className="container mx-auto py-2.5 bg-white">
          <div className="flex items-center justify-between">
            {/* site logo */}
            <div className="flex items-center">
              <Link to="/">
                <div className="w-12 h-12">
                  <img src={logoImg} alt="logo" className="w-full h-full" />
                </div>
              </Link>
            </div>
            <div>
              {/* menu item */}
              <ul className="bg-white w-full z-50 menu-open md:space-x-8 space-x-6 font-semibold hidden absolute left-0 top-20 lg:static lg:flex">
                {mainMenu.map((item, index) => (
                  <li className="ml-6 xl:ml-0 xl:mb-0" key={index}>
                    <Link to={item.link}>
                      <p
                        className={`${
                          path === item.link
                            ? "text-themePrimary"
                            : "text-arsenic"
                        } text-xs  font-medium transition-all hover:text-themePrimary`}
                      >
                        {item.name}
                      </p>
                    </Link>
                  </li>
                ))}
                {!userData && (
                  <li className="ml-6 xl:ml-0 xl:mb-0">
                    <Link to={"/login"}>
                      <p
                        className={`${
                          path === "/login"
                            ? "text-themePrimary"
                            : "text-arsenic"
                        } text-xs  font-medium transition-all hover:text-themePrimary`}
                      >
                        Login
                      </p>
                    </Link>
                  </li>
                )}
                {!userData && (
                  <li className="ml-6 xl:ml-0 xl:mb-0">
                    <Link to={"/signup"}>
                      <p
                        className={`${
                          path === "/signup"
                            ? "text-themePrimary"
                            : "text-arsenic"
                        } text-xs  font-medium transition-all hover:text-themePrimary`}
                      >
                        Signup
                      </p>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div>
              {userData ? (
                <>
                  {/* After user login design */}
                  <div className="flex gap-2 items-center">
                    {/* user-menu  */}
                    <div className="relative hidden lg:flex">
                      <button
                        className="flex items-center hover:text-arsenic pr-2 border-r border-r-themeLighter lg:pr-0 lg:border-0 text-center cursor-pointer"
                        onClick={UserMenuHandler}
                      >
                        <div className="mr-3 flex items-center">
                          {userData.avatar ? (
                            <div className="h-8 w-8">
                              <img
                                className="h-full w-full rounded-full object-cover"
                                src={userData?.avatar}
                                alt="User image"
                              />
                            </div>
                          ) : (
                            <div className="h-8 w-8">
                              <img
                                className="h-full w-full rounded-full object-cover"
                                src={userAvatar}
                                alt="User image"
                              />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm leading-8">
                            {userData?.name?.firstName}
                          </p>
                        </div>
                        <span
                          className={`ml-1 transition duration-200 ease-in-out ${
                            UserMenu ? "rotate-180" : ""
                          }`}
                        >
                          <HiChevronDown />
                        </span>
                      </button>
                      {/* <ProfileMenu active={UserMenu} /> */}
                      <ProfileMenu
                        active={UserMenu}
                        loginMenu={loginMenu}
                        userData={userData}
                      />
                    </div>
                    <button
                      className="mobile-toogle flex lg:hidden p-2 rounded-full transition-all outline-none"
                      onClick={handleShow}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* before user login design */}
                  <ul className="flex py-2">
                    <li>
                      <button
                        className="mobile-toogle flex lg:hidden p-2 rounded-full transition-all outline-none"
                        onClick={handleShow}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Wrapper */}
      <MobileMenu
        show={show}
        handleClose={handleClose}
        userData={userData}
        mainMenu={mainMenu}
        path={path}
      />
    </>
  );
};

export default NavBar;
