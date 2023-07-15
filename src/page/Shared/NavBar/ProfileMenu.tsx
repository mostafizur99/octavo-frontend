import { Link } from "react-router-dom";

type ProfileMenuProps = {
  active: boolean;
  loginMenu: {
    name: string;
    link: string;
  }[];
};

const ProfileMenu = ({ active, loginMenu }: ProfileMenuProps) => {
  const userData = true;
  return (
    <>
      <div
        className={`top-[calc(130%-8px)] absolute w-[200px] rounded-[5px] p-0 -right-[15px] text-left transition-all duration-300 ease-in-out z-[999] shadow-[0px_0_8px_0px_rgb(0_0_0_/_10%)] before:content-[''] before:absolute before:right-[43px] before:-top-[6px] before:w-0 before:h-0 before:border-l-transparent before:border-r-transparent before:border-b-[rgb(247_248_250)] before:transition-all before:ease-in-out before:duration-300   ${
          active
            ? "transform scale-100 visible opacity-100"
            : "opacity-0 invisible transform scale-[0.95]"
        } bg-themeLighterAlt text-white`}
      >
        <div className="p-3">
          <ul>
            {userData && (
              <>
                {loginMenu.map((item, index) => (
                  <li key={index}>
                    <Link to={item.link}>
                      <p className="block rounded w-full duration-300 ease-in-out py-2 text-base text-themeDarker hover:text-themePrimary">
                        {item.name}
                      </p>
                    </Link>
                  </li>
                ))}
              </>
            )}
            <li>
              <button className="block text-left rounded w-full duration-300 ease-in-out py-2 text-base text-themeDarker hover:text-red-400">
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProfileMenu;
