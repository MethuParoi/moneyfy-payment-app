import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../globals.css";
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
