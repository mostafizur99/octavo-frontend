/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { IBook, IReview, IReviewInputs } from "../../../types/book";
import userAvatar from "../../../assets/images/avatar.jpg";
import { useReviewBookMutation } from "../../../redux/features/book/bookApi";
import { getToken } from "../../../utils/userAuth";
import { useAppSelector } from "../../../redux/hooks";

type BookReviewsProps = {
  data: IBook;
};

const BookReviews = ({ data }: BookReviewsProps) => {
  const { user } = useAppSelector((state) => state.user);
  const [reviewBook, { isLoading }] = useReviewBookMutation();

  const token = getToken();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IReviewInputs>();

  // eslint-disable-next-line @typescript-eslint/require-await
  const onSubmitReview: SubmitHandler<IReviewInputs> = async (formData) => {
    try {
      if (!user?.email) {
        toast.error("Need to Login to Review");
        return;
      }
      const reviewData = {
        rating: formData.rating,
        comment: formData.comment,
      };
      reviewBook({ id: data?._id, token: token, data: reviewData })
        .unwrap()
        .then(() => {
          toast.success("Thanks for your review");
          reset();
        })
        .catch((error: { data: { message?: string } }) => {
          toast.error(error.data.message || "Server Error");
        });
    } catch (error) {
      toast.error("Server Error");
    }
  };

  return (
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
                  <img src={userAvatar} alt="user" className="h-full w-full" />
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
      <div className="mt-10 pt-2 border-t-2">
        <h3 className="text-xs text-center text-themeSecondary">Review Book</h3>
        <form onSubmit={handleSubmit(onSubmitReview)}>
          {/* rating  */}
          <div className="mb-6">
            <label
              className="block mb-2 text-themeLight font-normal"
              htmlFor="rating"
            >
              Rating
            </label>
            <input
              id="rating"
              className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border ${
                errors?.rating ? "!border-red-500" : "border-gray"
              } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-themeDarkAlt focus:outline-none `}
              type="number"
              min="0"
              max="5"
              {...register("rating", { required: true })}
              placeholder="Enter Your Rating"
            />
            {errors?.rating && (
              <span className="text-red-500 text-xss italic">
                This field is required
              </span>
            )}
          </div>
          {/* comment  */}
          <div className="mb-4">
            <label
              className="block mb-2 text-themeLight font-normal"
              htmlFor="comment"
            >
              Comment
            </label>
            <input
              id="comment"
              className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border ${
                errors?.comment ? "!border-red-500" : "border-gray"
              } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-themeDarkAlt focus:outline-none `}
              type="comment"
              {...register("comment", { required: true })}
              placeholder="Enter Your Comment"
            />
            {errors?.comment && (
              <span className="text-red-500 text-xss italic">
                This field is required
              </span>
            )}
          </div>
          <button
            className={`!py-3 px-7 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out mb-6 w-full text-base text-white font-normal text-center leading-6 ${
              isLoading ? "bg-themeLighter" : "bg-themePrimary"
            } rounded-md hover:bg-themeDarker`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookReviews;
