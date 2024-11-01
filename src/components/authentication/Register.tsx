"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../store/features/user/userApi";
// import Loading from "../../components/ui/Loading";
// import { toast } from "sonner";

const Register = () => {
  //   const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [register, { isLoading }] = useRegisterMutation();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registerData = {
      username,
      email,
      firstName,
      lastName,
      password,
      photoUrl,
    };
    const response = await register(registerData).unwrap();

    if (response?.success) {
      toast.success(response?.message);
      router.push("/signin");
    }
  };

  return (
    <form
      className="container py-10 flex justify-center"
      onSubmit={handleSubmit}
    >
      <div className="w-[50rem] p-4 flex flex-col items-center">
        <div className="pb-12">
          <h2 className="font-bold text-[3rem] text-blue-700 text-center">
            Register
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="username"
                className="block text-[1.8rem] font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-4">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:w-[40rem]">
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    name="username"
                    id="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-2xl  sm:leading-6 sm:h-[4rem]"
                    placeholder="eg. janesmith"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="username"
                className="block text-[1.8rem] font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:w-[40rem]">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-2xl  sm:leading-6 sm:h-[4rem]"
                    placeholder="eg. janesmith@gmail.com"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="username"
                className="block text-[1.8rem] font-medium leading-6 text-gray-900"
              >
                First Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:w-[40rem]">
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-2xl  sm:leading-6 sm:h-[4rem]"
                    placeholder="eg. Jane"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="username"
                className="block text-[1.8rem] font-medium leading-6 text-gray-900"
              >
                Last Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:w-[40rem]">
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-2xl  sm:leading-6 sm:h-[4rem]"
                    placeholder="eg. Smith"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="username"
                className="block text-[1.8rem] font-medium leading-6 text-gray-900"
              >
                Image Link
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:w-[40rem]">
                  <input
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    type="text"
                    name="photoUrl"
                    id="photoUrl"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-2xl sm:leading-6 sm:h-[4rem]"
                    placeholder="eg. www.janesmith.com"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="username"
                className="block text-[1.8rem] font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:w-[40rem]">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900  focus:ring-0 sm:text-2xl sm:leading-6 sm:h-[4rem]"
                    placeholder="********"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-x-6">
            <button
              type="submit"
              className="flex rounded-md bg-indigo-600 px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {/* {isLoading && <Loading />} */}
              Submit
            </button>
          </div>
          <div className="border-t pt-5 mt-6 flex items-center justify-center gap-x-6">
            <p>Already registered?</p>
            <button
              type="button"
              onClick={() => router.push("/signin")}
              className="flex rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
