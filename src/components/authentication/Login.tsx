"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "../../store/features/user/userApi";
import Loading from "../../components/ui/Loader/Loader";
import { useDispatch } from "react-redux";
import {
  setUser,
  takeUserPhotoToggle,
} from "../../store/features/user/userSlice";
import AuthModal from "../ui/AuthModal/AuthModal";

const Login = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const location = router.asPath;
  const { from } = { from: { pathname: "/" } };
  const [tempUser, setTempUser] = useState(null);

  const handleUser = async () => {
    const { userData, token } = tempUser;
    dispatch(setUser({ user: userData, token }));
    dispatch(takeUserPhotoToggle());
    router.push(from);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      username,
      password,
    };

    const result = await login(loginData).unwrap();
    if (result?.success) {
      //temporarily commented out for develop without ml model
      // setTempUser(result.result);
      // dispatch(takeUserPhotoToggle());

      document.cookie = `token=${result.result.token}; path=/;`;
      router.push("/dashboard");

      //store user data in local storage
      localStorage.setItem("token", result.result.token);
      localStorage.setItem("username", result.result.userData.username);
      localStorage.setItem("email", result.result.userData.email);
      localStorage.setItem(
        "accountNumber",
        result.result.userData.accountNumber
      );
    }
  };

  return (
    <>
      {tempUser && (
        <AuthModal
          authFunction={handleUser}
          env="logging"
          photoUrl={tempUser?.userData?.photoUrl}
        />
      )}
      <div className="container mx-auto flex justify-center items-center h-screen">
        <form onSubmit={handleSubmit} className="w-96 p-4 pb-20">
          <h2 className="font-bold text-[3rem] text-blue-700 text-center">
            Login
          </h2>

          <div className="mt-10 flex flex-col items-center">
            <div className="mb-10">
              <label
                htmlFor="username"
                className="block text-[1.8rem] font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-4">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:w-[40rem]">
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    name="username"
                    id="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-2xl sm:leading-6 sm:h-[4rem]"
                    placeholder="eg. janesmith"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="password"
                className="block text-[1.8rem] font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:w-[40rem]">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-2xl sm:leading-6 sm:h-[4rem]"
                    placeholder="********"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-10 bg-blue-500 text-white py-2 px-4 rounded"
            >
              {isLoading ? <Loading /> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

//-------------------V0-----------------

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useLoginMutation } from "../../store/features/user/userApi";
// import Loading from "../../components/ui/Loader/Loader";
// import { useDispatch } from "react-redux";
// import {
//   setUser,
//   takeUserPhotoToggle,
// } from "../../store/features/user/userSlice";
// // import { useLocation, useNavigate } from "react-router-dom";
// import AuthModal from "../ui/AuthModal/AuthModal";

// const Login = () => {
//   const router = useRouter();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   //   const navigate = useNavigate();
//   const [login, { isLoading }] = useLoginMutation();
//   const dispatch = useDispatch();
//   const location = router.asPath;
//   const { from } = { from: { pathname: "/" } }; // location.state ||
//   const [tempUser, setTempUser] = useState(null);

//   const handleUser = async () => {
//     const { userData, token } = tempUser;
//     dispatch(setUser({ user: userData, token }));
//     dispatch(takeUserPhotoToggle());
//     // navigate(from);
//     router.push(from);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const loginData = {
//       username,
//       password,
//     };

//     const result = await login(loginData).unwrap();
//     if (result?.success) {
//       setTempUser(result.result);
//       dispatch(takeUserPhotoToggle());
//     }
//   };

//   return (
//     <>
//       <AuthModal
//         authFunction={handleUser}
//         env="logging"
//         photoUrl={tempUser?.userData?.photoUrl}
//       />
//       <div className="container mx-auto flex justify-center items-center h-screen">
//         <form onSubmit={handleSubmit} className="w-96 p-4 pb-20">
//           <h2 className="font-bold text-[3rem] text-blue-700 text-center">
//             Login
//           </h2>

//           <div className="mt-10 flex flex-col items-center">
//             <div className="mb-10">
//               <label
//                 htmlFor="username"
//                 className="block text-[1.8rem] font-medium leading-6 text-gray-900"
//               >
//                 Username
//               </label>
//               <div className="mt-4">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:w-[40rem]">
//                   <input
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     type="text"
//                     name="username"
//                     id="username"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-2xl sm:leading-6 sm:h-[4rem]"
//                     placeholder="eg. janesmith"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="col-span-full">
//               <label
//                 htmlFor="username"
//                 className="block text-[1.8rem] font-medium leading-6 text-gray-900"
//               >
//                 Password
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:w-[40rem]">
//                   <input
//                     type="password"
//                     name="password"
//                     id="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900  focus:ring-0 sm:text-2xl sm:leading-6 sm:h-[4rem]"
//                     placeholder="********"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="mt-6 flex items-center justify-center gap-x-6">
//             <button
//               type="submit"
//               className="flex rounded-md bg-indigo-600 px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//             >
//               {isLoading && <Loading />}
//               Submit
//             </button>
//           </div>
//           <div className="border-t pt-5 mt-6 flex items-center justify-center gap-x-6">
//             <p>Not yet registered?</p>
//             <button
//               type="button"
//               onClick={() => router.push("/signup")}
//               className="flex rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
//             >
//               Sign Up
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Login;
