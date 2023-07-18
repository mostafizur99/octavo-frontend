import { Link } from "react-router-dom";

const BookCardLoader = () => {
  return (
    <div
      className={`relative h-full grid content-between px-6 !pt-4 pb-6 border-gray bg-white border border-solid transition-all rounded-md group`}
    >
      <span className="absolute left-3 top-3 flex flex-wrap gap-2">
        <span className="bg-themeLighter/50 py-1 px-2.5 rounded-sm text-xss1 font-normal text-themeLighter/10">
          Best Choice
        </span>
      </span>
      <div className="text-center pt-8 pb-6">
        <div className="flex justify-center mb-4">
          <div className="h-10 w-10 bg-themeLighter/50"></div>
        </div>
        <h3 className="text-xxs font-normal capitalize bg-themeLighter/50 text-themeLighter/10 leading-5 mb-2">
          Title
        </h3>
        <div className="flex gap-2 justify-center items-center bg-themeLighter/50 text-themeGrayLight/10 text-xss1 capitalize font-normal">
          Author
        </div>
      </div>
      <div className="px-2">
        <ul className="mb-4">
          <li className="mb-2">
            <p className="flex gap-2 items-center text-themeLighter/10 text-xss1 font-normal bg-themeLighter/50">
              genre
            </p>
          </li>
          <li className="mb-2">
            <p className="flex gap-2 items-center text-themeLighter/10 text-xss1 font-normal bg-themeLighter/50">
              genre
            </p>
          </li>
          <li className="mb-0">
            <p className="flex gap-2 items-center text-themeLighter/10 text-xss1 font-normal bg-themeLighter/50">
              genre
            </p>
          </li>
        </ul>
        <div>
          <Link to={"#"}>
            <p className="leading-4 text-themeLighter/10 text-xs text-center py-3 px-6 rounded-md transition-all bg-themeLighter">
              View Details
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCardLoader;
