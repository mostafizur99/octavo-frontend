/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmitHandler: SubmitHandler<Inputs> = async (data) => {
    console.log("data", data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        {/* email  */}
        <div className="mb-6">
          <label
            className="block mb-2 text-themeDarker font-normal"
            htmlFor="signup-email"
          >
            Email
          </label>
          <input
            id="signup-email"
            className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border ${
              errors?.email ? "!border-red-500" : "border-gray"
            } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-themeDarkAlt focus:outline-none `}
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter Your Email"
          />
          {errors?.email && (
            <span className="text-red-500 text-xss italic">
              This field is required
            </span>
          )}
        </div>
        {/* password  */}
        <div className="mb-4">
          <label
            className="block mb-2 text-themeDarker font-normal"
            htmlFor="signup-password"
          >
            Password
          </label>
          <input
            id="signup-password"
            className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border ${
              errors?.password ? "!border-red-500" : "border-gray"
            } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-themeDarkAlt focus:outline-none `}
            type="password"
            {...register("password", { required: true })}
            placeholder="Enter Your Password"
          />
          {errors?.password && (
            <span className="text-red-500 text-xss italic">
              This field is required
            </span>
          )}
        </div>
        {/* confirm password  */}
        <div className="mb-4">
          <label
            className="block mb-2 text-themeDarker font-normal"
            htmlFor="signup-confirm-password"
          >
            Confirm Password
          </label>
          <input
            id="signup-confirm-password"
            className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border ${
              errors?.password ? "!border-red-500" : "border-gray"
            } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-themeDarkAlt focus:outline-none `}
            type="password"
            {...register("confirmPassword", { required: true })}
            placeholder="Enter Your Password"
          />
          {errors?.password && (
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
          {isSubmitting ? "Please wait..." : "Register"}
          {isSubmitting && (
            <div
              className="spinner-grow w-5 h-5 text-themePrimary"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </button>
        <p className="text-center flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm text-deep font-normal">Already User?</span>
          <Link
            to="/login"
            className="inline-block text-sm font-normal text-themePrimary hover:text-themeLighter hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
