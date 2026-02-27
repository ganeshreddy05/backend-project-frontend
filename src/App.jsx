import { useEffect } from "react";
import useUserStore from "../src/store/useUserStore.js";
import { Outlet } from "react-router";
import api from "./utils/api";
import Navbar from "./components/Navbar.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  const setUser = useUserStore((state) => state.setUser);

  const getCurrentUser = async () => {
    try {
      const axiosResponse = await api.get("/users/me");
      console.log(axiosResponse);
      console.log(axiosResponse.data);
      console.log(axiosResponse.data.user);

      setUser(axiosResponse.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <>
      {/* Toast notifications - shows at top right */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
