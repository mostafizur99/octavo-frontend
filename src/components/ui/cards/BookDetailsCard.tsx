/* eslint-disable @typescript-eslint/no-misused-promises */
import logoImg from "../../../assets/images/logo/logo-main.png";
import { IBook } from "../../../types/book";
import { TfiUser } from "react-icons/tfi";
import { TbCategory2 } from "react-icons/tb";
import { RiPriceTag3Line, RiTimeLine } from "react-icons/ri";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Swal from "sweetalert2";
import { useDeleteBookMutation } from "../../../redux/features/book/bookApi";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../../../utils/userAuth";
import BookReviews from "../reviews/BookReviews";
import { useAppSelector } from "../../../redux/hooks";

type BookCardProps = {
  data: IBook;
};

const BookDetailsCard = ({ data }: BookCardProps) => {
  const { user } = useAppSelector((state) => state.user);
  const listed = false;

  const navigate = useNavigate();
  const [deleteBook] = useDeleteBookMutation();

  const token = getToken();

  const deleteHandler = async (ID: string) => {
    try {
      if (!user?.email) {
        toast.error("Need to Login to delete Book");
        return;
      }

      const result = await Swal.fire({
        title: "Are you sure to delete?",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        deleteBook({ id: ID, token: token })
          .unwrap()
          .then(() => {
            toast.success("Book deleted successfully");
            navigate("/books");
          })
          .catch((error: { data: { message?: string } }) => {
            toast.error(error.data.message || "Server Error");
          });
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };

  return (
    <div
      className={`relative h-full grid content-between px-6 !pt-5 pb-6 border-gray bg-white border border-solid transition-all rounded-md group hover:!border-themePrimary`}
    >
      {/* {data.isFeatured && (
        <span className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className="bg-red-50 py-1 px-2.5 rounded-sm text-xss1 font-normal text-red-400">
            Best Choice
          </span>
        </span>
      )} */}

      {listed ? (
        <button
          onClick={() => {
            console.log("remove list");
          }}
          className="left-3 top-3 py-1 px-2.5 text-red-400 rounded-sm text-lg absolute flex flex-wrap gap-2"
        >
          <AiFillHeart />
        </button>
      ) : (
        <button
          onClick={() => {
            console.log("list");
          }}
          className="left-3 top-3 py-1 px-2.5 text-red-400 rounded-sm text-lg absolute flex flex-wrap gap-2"
        >
          <AiOutlineHeart />
        </button>
      )}

      <Link
        to={`/edit-book/${data?._id}`}
        className=" right-3 top-3 py-1 px-8 text-white bg-themeDarker rounded-sm text-xss1 absolute flex flex-wrap gap-2"
      >
        Edit
      </Link>
      <button
        onClick={() => {
          void deleteHandler(data?._id);
        }}
        className="right-3 top-12 py-1 px-6 text-white bg-themePrimary rounded-sm text-xss1  absolute flex flex-wrap gap-2"
      >
        Delete
      </button>
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
        {/* Review Section  */}
        <BookReviews data={data} />
      </div>
    </div>
  );
};

export default BookDetailsCard;
