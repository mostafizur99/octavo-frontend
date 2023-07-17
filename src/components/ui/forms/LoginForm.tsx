/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginUserAtDb, storeToken } from "../../../utils/userAuth";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useAppSelector } from "../../../redux/hooks";

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { user, isLoading } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.email && !isLoading) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmitHandler: SubmitHandler<Inputs> = async (data) => {
    try {
      const loginData = await loginUserAtDb({
        email: data.email,
        password: data.password,
      });

      if (!loginData?.data?.accessToken) {
        toast.error("Something went wrong during signing in");
        return;
      }
      storeToken(loginData.data.accessToken);
      toast.success("User logged in successfully");
      navigate("/");
      reset();
    } catch (error) {
      toast.error("Server Error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        {/* email  */}
        <div className="mb-6">
          <label
            className="block mb-2 text-themeDarker font-normal"
            htmlFor="login-email"
          >
            Email
          </label>
          <input
            id="login-email"
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
            htmlFor="login-password"
          >
            Password
          </label>
          <input
            id="login-password"
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
        <button
          className={`!py-3 px-7 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out mb-6 w-full text-base text-white font-normal text-center leading-6 ${
            isSubmitting ? "bg-themeLighter" : "bg-themePrimary"
          } rounded-md hover:bg-themeDarker`}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Please wait..." : "Login"}
        </button>
        <p className="text-center flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm text-themeLight font-normal">New User?</span>
          <Link
            to="/signup"
            className="inline-block text-sm font-normal text-themePrimary hover:text-themeLighter hover:underline"
          >
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
