import SignUpForm from "../../components/ui/forms/SignupForm";

export default function SignUp() {
  return (
    <div className="py-10 md:py-32">
      <div className="max-w-md mx-auto shadow px-8 sm:px-6 py-10 rounded-lg bg-white">
        <div className="mb-6 text-center">
          <h3 className="mb-4 text-2xl text-themeDarker font-semibold">
            Register
          </h3>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}
