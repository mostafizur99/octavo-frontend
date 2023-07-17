/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { toast } from "react-toastify";
import { createUserAtDb } from "../../../utils/userAuth";
import { useEffect } from "react";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

const SignUpForm = () => {
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
      const name = {
        firstName: data.firstName,
        lastName: data.lastName,
      };
      await createUserAtDb({
        name: name,
        email: data.email,
        password: data.password,
      });
      toast.success("User created successfully");
      navigate("/login");
      reset();
    } catch (error) {
      // toast.error((error.message as string) || "Server Error");
      toast.error("Server Error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        {/* first name  */}
        <div className="mb-6">
          <label
            className="block mb-2 text-themeDarker font-normal"
            htmlFor="signup-firstName"
          >
            First Name
          </label>
          <input
            id="signup-firstName"
            className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border ${
              errors?.firstName ? "!border-red-500" : "border-gray"
            } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-themeDarkAlt focus:outline-none `}
            type="text"
            {...register("firstName", { required: true })}
            placeholder="Enter Your First Name"
          />
          {errors?.firstName && (
            <span className="text-red-500 text-xss italic">
              This field is required
            </span>
          )}
        </div>
        {/* last name  */}
        <div className="mb-6">
          <label
            className="block mb-2 text-themeDarker font-normal"
            htmlFor="signup-lastName"
          >
            Last Name
          </label>
          <input
            id="signup-lastName"
            className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border ${
              errors?.lastName ? "!border-red-500" : "border-gray"
            } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-themeDarkAlt focus:outline-none `}
            type="text"
            {...register("lastName", { required: true })}
            placeholder="Enter Your Last Name"
          />
          {errors?.lastName && (
            <span className="text-red-500 text-xss italic">
              This field is required
            </span>
          )}
        </div>
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
              errors?.confirmPassword ? "!border-red-500" : "border-gray"
            } placeholder:font-normal placeholder:text-xss1 rounded-lg placeholder-themeDarkAlt focus:outline-none `}
            type="password"
            {...register("confirmPassword", { required: true })}
            placeholder="Enter Your Password"
          />
          {errors?.confirmPassword && (
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
        </button>
        <p className="text-center flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm text-themeLight font-normal">
            Already User?
          </span>
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
