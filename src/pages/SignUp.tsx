/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../redux/hook";
import { createUser, signUpWithGoogle } from "../redux/features/user/userSlice";
import { toast } from "react-hot-toast";

interface SignupFormInputs {
  email: string;
  password: string;
}
export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = (data: SignupFormInputs) => {
    console.log(data);
    dispatch(createUser({ email: data.email, password: data.password })).then(
      () => {
        navigate("/home");
        toast.success("user created successfully");
      }
    );
  };

  const handleGoogleSignUp = () => {
    dispatch(signUpWithGoogle()).then(() => {
      navigate("/home");
      toast.success("user sign up with google successfully");
    });
  };

  const backgroundImageUrl =
    "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1356&h=668&fit=crop";

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        background: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-1/3 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email:
            </label>
            <input
              className="w-full border p-3 rounded-md"
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Password:
            </label>
            <input
              className="w-full border p-3 rounded-md"
              id="password"
              placeholder="your password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Sign Up
            </button>
          </div>
          <div className="mt-3">
            <button
              onClick={handleGoogleSignUp}
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Sign Up with Google
            </button>
          </div>
        </form>
        <div className="mt-4">
          <span>Already have an account? </span>
          <Link
            to="/login"
            className="text-blue-500 font-semibold hover:underline cursor-pointer"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
