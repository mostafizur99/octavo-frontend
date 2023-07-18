/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../../redux/hooks";
import { IBook, IBookInputs } from "../../types/book";
import {
  useSingleBookQuery,
  useUpdateBookMutation,
} from "../../redux/features/book/bookApi";
import { getToken } from "../../utils/userAuth";

const EditBook = () => {
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data } = useSingleBookQuery(id ? `${id}` : "");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const singleBookData: IBook = data?.data;

  const { user } = useAppSelector((state) => state.user);
  const [updateBook, { isLoading }] = useUpdateBookMutation();
  const token = getToken();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IBookInputs>();

  useEffect(() => {
    if (singleBookData?.title) {
      setValue("title", singleBookData.title);
      setValue("author", singleBookData.author);
      setValue("genre", singleBookData.genre);
      setValue("price", singleBookData.price);
      setValue("publicationYear", singleBookData.publicationYear);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleBookData]);

  const onSubmitHandler: SubmitHandler<IBookInputs> = async (fromData) => {
    try {
      if (!user?.email) {
        toast.error("Need to Login to Create a Book");
        return;
      }
      const bookData = {
        title: fromData.title,
        author: fromData.author,
        genre: fromData.genre,
        price: fromData.price,
        publicationYear: fromData.publicationYear,
      };

      updateBook({ id: id, token: token, data: bookData })
        .unwrap()
        .then(() => {
          toast.success("Book updated successfully");
        })
        .catch((error: { data: { message?: string } }) => {
          toast.error(error.data.message || "Server Error");
        });
    } catch (error) {
      toast.error("Server Error");
    }
  };

  return (
    <div className="py-10 md:py-32">
      <div className="max-w-md mx-auto shadow px-8 sm:px-6 py-10 rounded-lg bg-white">
        <div className="mb-6 text-center">
          <h3 className="mb-4 text-2xl text-themeDarker font-semibold">
            Edit Book
          </h3>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            {/* title  */}
            <div className="mb-6">
              <label
                className="block mb-2 text-themeDarker font-normal"
                htmlFor="title"
              >
                Title
              </label>
              <input
                id="title"
                className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border ${
                  errors?.title ? "!border-red-500" : "border-gray"
                } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-themeDarkAlt focus:outline-none `}
                type="title"
                {...register("title", { required: true })}
                placeholder="Enter Book Title"
              />
              {errors?.title && (
                <span className="text-red-500 text-xss italic">
                  This field is required
                </span>
              )}
            </div>
            {/* author  */}
            <div className="mb-4">
              <label
                className="block mb-2 text-themeDarker font-normal"
                htmlFor="author"
              >
                Author
              </label>
              <input
                id="author"
                className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border ${
                  errors?.author ? "!border-red-500" : "border-gray"
                } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-themeDarkAlt focus:outline-none `}
                type="text"
                {...register("author", { required: true })}
                placeholder="Enter Your Author"
              />
              {errors?.author && (
                <span className="text-red-500 text-xss italic">
                  This field is required
                </span>
              )}
            </div>
            {/* genre  */}
            <div className="mb-4">
              <label
                className="block mb-2 text-themeDarker font-normal"
                htmlFor="genre"
              >
                Genre
              </label>
              <input
                id="genre"
                className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border ${
                  errors?.genre ? "!border-red-500" : "border-gray"
                } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-themeDarkAlt focus:outline-none `}
                type="text"
                {...register("genre", { required: true })}
                placeholder="Enter Your Genre"
              />
              {errors?.genre && (
                <span className="text-red-500 text-xss italic">
                  This field is required
                </span>
              )}
            </div>
            {/* publicationYear  */}
            <div className="mb-4">
              <label
                className="block mb-2 text-themeDarker font-normal"
                htmlFor="publicationYear"
              >
                publication Year
              </label>
              <input
                id="publicationYear"
                className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border ${
                  errors?.publicationYear ? "!border-red-500" : "border-gray"
                } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-themeDarkAlt focus:outline-none `}
                type="text"
                {...register("publicationYear", { required: true })}
                placeholder="Enter Your Publication Year"
              />
              {errors?.publicationYear && (
                <span className="text-red-500 text-xss italic">
                  This field is required
                </span>
              )}
            </div>
            {/* price  */}
            <div className="mb-4">
              <label
                className="block mb-2 text-themeDarker font-normal"
                htmlFor="price"
              >
                Price
              </label>
              <input
                id="price"
                className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border ${
                  errors?.price ? "!border-red-500" : "border-gray"
                } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-themeDarkAlt focus:outline-none `}
                type="number"
                min={0}
                {...register("price", { required: true })}
                placeholder="Enter Price"
              />
              {errors?.price && (
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
              {isLoading ? "Please wait..." : "Updated"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
