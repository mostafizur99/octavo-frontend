/* eslint-disable @typescript-eslint/no-misused-promises */
import logoImg from "../../../assets/images/logo/logo-main.png";
import { IBook, IReview } from "../../../types/book";
import { TfiUser } from "react-icons/tfi";
import { TbCategory2 } from "react-icons/tb";
import { RiPriceTag3Line, RiTimeLine } from "react-icons/ri";
import userAvatar from "../../../assets/images/avatar.jpg";
import Swal from "sweetalert2";
import { useDeleteBookMutation } from "../../../redux/features/book/bookApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../../utils/userAuth";

type BookCardProps = {
  data: IBook;
};

const BookDetailsCard = ({ data }: BookCardProps) => {
  const navigate = useNavigate();
  const [deleteBook] = useDeleteBookMutation();

  const token = getToken();
  console.log("token", token);

  const deleteHandler = async (ID: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure to delete?",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        console.log("Yes, delete it");
        deleteBook({ id: ID, token: token })
          .unwrap()
          .then(() => {
            toast.success("Book deleted successfully");
            navigate("/books");
          })
          .catch((error: { data: { message?: string } }) => {
            toast.error(error.data.message || "Server Error");
          });
        console.log("Yes, delete it");
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };
  return (
    <div
      className={`relative h-full grid content-between px-6 !pt-5 pb-6 border-gray bg-white border border-solid transition-all rounded-md group hover:!border-themePrimary`}
    >
      {data.isFeatured && (
        <span className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className="bg-red-50 py-1 px-2.5 rounded-sm text-xss1 font-normal text-red-400">
            Best Choice
          </span>
        </span>
      )}
      <button className=" right-3 top-3 py-1 px-8 text-white bg-themeDarker rounded-sm text-xss1 absolute flex flex-wrap gap-2">
        Edit
      </button>
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
        <div className="pt-2">
          <h3 className="text-xs  text-themeSecondary">
            Reviews ({data && data?.reviews.length})
          </h3>
          <div className="pt-5">
            {data && data?.reviews.length < 1 && (
              <div className=" border-t pt-2">
                <p className="text-xss  text-themeLight">No Review Yet</p>
              </div>
            )}
            {data &&
              data?.reviews.length > 0 &&
              data?.reviews.map((reviewItem: IReview, index: number) => (
                <div key={index} className=" border-t pt-2 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8">
                      <img
                        src={userAvatar}
                        alt="user"
                        className="h-full w-full"
                      />
                    </div>
                    <p className="text-xs  text-themeLight">
                      {reviewItem.comment} ({reviewItem.rating})
                    </p>
                  </div>
                  <h4 className="text-xss  text-themeLight">
                    {reviewItem.reviewer.name.firstName || ""}
                  </h4>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsCard;
