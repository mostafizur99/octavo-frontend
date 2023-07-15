import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { IUser } from "../../../types/user";

type MobileMenuProps = {
  show: boolean;
  handleClose: () => void;
  userData: IUser;
  path: string;
  mainMenu: {
    name: string;
    link: string;
  }[];
};

const MobileMenu = ({
  show,
  handleClose,
  userData,
  mainMenu,
  path,
}: MobileMenuProps) => {
  return (
    <div
      className={`fixed w-full h-full top-0  z-[100] transition-all duration-500 ease-in-out ${
        show ? "left-0" : "-left-full"
      }`}
    >
      <div
        className={`absolute top-0  max-w-[400px] w-full h-full z-[110]
               transition-all duration-500 ease-in-out bg-[rgba(0,_0,_0,_0.6)] backdrop-blur-[10px] ${
                 show ? "left-0" : "-left-full"
               }`}
      >
        {/* menu close button  */}
        <div className="h-[60px]">
          <div className="cursor-pointer absolute top-4 right-5">
            <MdClose
              onClick={handleClose}
              className="w-[30px] h-[30px] text-[#f2f5f8] transition ease-in-out duration-500 hover:text-[#ff0000]"
            />
          </div>
        </div>
        {/* Menu body  */}
        <div>
          {userData && (
            <div className="px-4">
              <div className="relative">
                <div className="flex gap-3 items-center text-center cursor-pointer">
                  <div className="flex items-center">
                    {userData?.avatar && (
                      <div className="h-12 w-12">
                        <img
                          className="h-full w-full rounded-lg object-cover object-right p-1 border border-solid border-gray-500"
                          src={userData?.avatar}
                          alt="User image"
                        />
                      </div>
                    )}
                  </div>
                  <div className="text-left">
                    <p className="text-sm leading-4 text-white">
                      {userData?.fullName?.firstName}{" "}
                      {userData?.fullName?.lastName}
                    </p>
                    <span className="text-xss1 text-deep">
                      {userData?.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <ul className="flex flex-col mt-6">
            {mainMenu.map((item, index) => (
              <li className="flex items-center" key={index}>
                <Link to={item.link}>
                  <p
                    className={`${
                      path === item.link
                        ? "text-themePrimary !border-themePrimary"
                        : "text-light"
                    } text-xxs py-3.5 px-4 border-b border-deep w-full transition-all hover:text-themePrimary hover:!border-themePrimary`}
                  >
                    {item.name}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Overlay Container */}
      <div
        className={`absolute w-full h-full top-0 transition-all duration-500 ease-in-out cursor-pointer bg-[rgba(0,_0,_0,_0.5)] ${
          show ? "left-0" : "-left-full"
        }`}
        onClick={handleClose}
      />
    </div>
  );
};

export default MobileMenu;
