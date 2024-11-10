import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../globals.css";
import Navbar from "../../components/navbar/Navbar";
import { StoreProvider } from "../../store/StoreProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <div>
        <div className="min-w-screen min-h-screen flex">
          <Navbar />
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
    </StoreProvider>
  );
}

//----------------------------------------------
//px-5 md:px-0 pt-[1rem] md:pt-[2rem] md:container md:mx-auto xl:max-w-[120rem] 2xl:max-w-[150rem]
// import { Inter } from "next/font/google";
// import Navbar from "@/components/navbar/Navbar";
// import Footer from "@/components/footer/Footer";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { StoreProvider } from "@/store/StoreProvider";
// import { SearchProvider } from "@/context-api/searchContext";

// const inter = Inter({ subsets: ["latin"] });

{
  /* <StoreProvider>
      <SearchProvider>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      </SearchProvider>
</StoreProvider> */
}
