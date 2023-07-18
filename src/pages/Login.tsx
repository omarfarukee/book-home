/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { loginUser } from "../redux/features/user/userSlice";
type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;
interface LoginFormInputs {
  email: string;
  password: string;
}
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const { user, isLoading } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
    dispatch(loginUser({ email: data.email, password: data.password }));
  };
  useEffect(() => {
    if (user.email && !isLoading) {
      // Redirect to the previous location or the home page
      // const path = (props as any).location?.state?.path || '/';
      // navigate(path);
      navigate("/");
    }
  }, [user.email, isLoading]);
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
        <h2 className="text-2xl font-bold mb-4">Login</h2>
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
              Login
            </button>
          </div>
        </form>
        <div className="mt-4">
          <span>New in here ? </span>
          <Link
            to="/signup"
            className="text-blue-500 font-semibold hover:underline cursor-pointer"
          >
            Sign-up
          </Link>
        </div>
      </div>
    </div>
  );
}
