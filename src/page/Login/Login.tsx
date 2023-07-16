import LoginForm from "../../components/ui/forms/LoginForm";

export default function Login() {
  return (
    <div className="py-10 md:py-32">
      <div className="max-w-md mx-auto shadow px-8 sm:px-6 py-10 rounded-lg bg-white">
        <div className="mb-6 text-center">
          <h3 className="mb-4 text-2xl text-themeDarker font-semibold">
            Login
          </h3>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
