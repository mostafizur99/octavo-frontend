import { Link } from "react-router-dom";
import logoImg from "../../../assets/images/logo/logo-main.png";
import { IBook } from "../../../types/book";
import { TfiUser } from "react-icons/tfi";
import { TbCategory2 } from "react-icons/tb";
import { RiPriceTag3Line, RiTimeLine } from "react-icons/ri";

type BookCardProps = {
  data: IBook;
};

const BookCard = ({ data }: BookCardProps) => {
  return (
    <div
      className={`relative h-full grid content-between px-6 !pt-4 pb-6 border-gray bg-white border border-solid transition-all rounded-md group hover:!border-themePrimary`}
    >
      {data.isFeatured && (
        <span className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className="bg-red-50 py-1 px-2.5 rounded-sm text-xss1 font-normal text-red-400">
            Best Choice
          </span>
        </span>
      )}
      <div className="text-center pt-8 pb-6">
        <div className="flex justify-center mb-4">
          <div className="h-10 w-10">
            <img className="h-full w-full rounded-lg" src={logoImg} alt="img" />
          </div>
        </div>
        <h3 className="text-xxs font-normal capitalize text-black leading-5 mb-2">
          {data?.title}
        </h3>
        <div className="flex gap-2 justify-center items-center text-themeGrayLight text-xss1 capitalize font-normal">
          <TfiUser className="text-themeLighter" />
          {data?.author}
        </div>
      </div>
      <div className="px-2">
        <ul className="mb-4">
          <li className="mb-2">
            <p className="flex gap-2 items-center text-themeSecondary text-xss1 font-normal">
              <TbCategory2 /> {data?.genre}
            </p>
          </li>
          <li className="mb-2">
            <div className="flex gap-2 items-center text-themeSecondary text-xss1 font-normal">
              <RiPriceTag3Line /> {data?.price}
            </div>
          </li>
          <li className="mb-0">
            <div className="flex gap-2 items-center text-themeSecondary text-xss1 font-normal">
              <RiTimeLine /> {data?.publicationYear}
            </div>
          </li>
        </ul>
        <div>
          <Link to={"#"}>
            <p className="leading-4 text-themeDarker text-xs group-hover:text-white text-center py-3 px-6 bg-light rounded-md transition-all bg-themeLighter group-hover:!bg-themePrimary">
              View Details
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
