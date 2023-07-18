/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../../redux/hooks";

type IBookInputs = {
  title: string;
  author: string;
  genre: string;
  published: string;
};

const AddNewBook = () => {
  const { user, isLoading } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IBookInputs>();

  const onSubmitHandler: SubmitHandler<IBookInputs> = async (data) => {
    try {
      // const loginData = await loginUserAtDb({
      //   email: data.email,
      //   password: data.password,
      // });

      console.log("user, isLoading", user, isLoading, data);
      toast.success("Book uploaded successfully");
      navigate("/");
      reset();
    } catch (error) {
      toast.error("Server Error");
    }
  };

  return (
    <div className="py-10 md:py-32">
      <div className="max-w-md mx-auto shadow px-8 sm:px-6 py-10 rounded-lg bg-white">
        <div className="mb-6 text-center">
          <h3 className="mb-4 text-2xl text-themeDarker font-semibold">
            Add New Book
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
            {/* published  */}
            <div className="mb-4">
              <label
                className="block mb-2 text-themeDarker font-normal"
                htmlFor="published"
              >
                Published Date
              </label>
              <input
                id="published"
                className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border ${
                  errors?.published ? "!border-red-500" : "border-gray"
                } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-themeDarkAlt focus:outline-none `}
                type="text"
                {...register("published", { required: true })}
                placeholder="Enter Your Published"
              />
              {errors?.published && (
                <span className="text-red-500 text-xss italic">
                  This field is required
                </span>
              )}
            </div>
            <button
              className={`!py-3 px-7 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out mb-6 w-full text-base text-white font-normal text-center leading-6 ${
                isSubmitting ? "bg-themeLighter" : "bg-themePrimary"
              } rounded-md hover:bg-themeDarker`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Please wait..." : "Add"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewBook;
