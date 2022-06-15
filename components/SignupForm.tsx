import { ExclamationCircleIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

import Meta from "../components/Meta";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const password = watch("password");

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <Meta title="Tasks | Signup" />
      <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* <img
            className="w-auto h-12 mx-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          /> */}
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">Tasks</h2>
          <p className="mt-2 font-medium text-center text-indigo-600 hover:text-indigo-500">
            Create an account
          </p>
        </div>

        <div className="mx-2 mt-4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>

                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    className={
                      errors.name
                        ? "block w-full pr-10 text-red-900 placeholder-red-300 border-red-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        : "block w-full pr-10 text-gray-900 placeholder-gray-300 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    }
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Name is required",
                      },
                    })}
                  />
                  {errors.name && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
                    </div>
                  )}
                </div>

                <div className="mt-3 text-sm text-red-500">
                  {errors.name && errors.name.message}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>

                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    autoComplete="email"
                    className={
                      errors.email
                        ? "block w-full pr-10 text-red-900 placeholder-red-300 border-red-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        : "block w-full pr-10 text-gray-900 placeholder-gray-300 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    }
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email is required",
                      },
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Email is badly formatted",
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
                    </div>
                  )}
                </div>

                <div className="mt-3 text-sm text-red-500">
                  {errors.email && errors.email.message}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="password"
                    autoComplete="current-password"
                    className={
                      errors.password
                        ? "block w-full pr-10 text-red-900 placeholder-red-300 border-red-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        : "block w-full pr-10 text-gray-900 placeholder-gray-300 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    }
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
                    </div>
                  )}
                </div>
                <div className="mt-3 text-sm text-red-500">
                  {errors.password && errors.password.message}
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="password"
                    autoComplete="current-password"
                    className={
                      errors.confirmPassword
                        ? "block w-full pr-10 text-red-900 placeholder-red-300 border-red-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        : "block w-full pr-10 text-gray-900 placeholder-gray-300 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    }
                    {...register("confirmPassword", {
                      required: {
                        value: true,
                        message: "Confirm Password is required",
                      },
                      validate: (value) => password === value || "Passwords do not match",
                    })}
                  />
                  {errors.confirmPassword && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
                    </div>
                  )}
                </div>
                <div className="mt-3 text-sm text-red-500">
                  {errors.confirmPassword && errors.confirmPassword.message}
                </div>
              </div>

              <div className="relative mt-1 rounded-md shadow-sm">
                <button
                  type="submit"
                  className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Sign up
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-gray-500 bg-white">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 mt-6">
                <button
                  onClick={() => signIn()}
                  className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                  Google
                </button>
              </div>
            </div>
            <div className="mt-8 text-center text-md">
              Have an account?
              <span className="font-semibold text-blue-500">
                <Link href="/"> Log in </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
