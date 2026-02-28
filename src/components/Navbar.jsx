import { Link, useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/tokens.js";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://backend-node-mongodb-lwi6.onrender.com/users/logout",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
          credentials: "include",
        },
      );
      const data = await response.json();
      console.log(data);
      localStorage.removeItem("access-token");
      toast.success("Logged out!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-sky-100/80 via-green-50/80 to-teal-100/80 backdrop-blur-md border-b border-sky-200/60 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
        <Link to="/dashboard" className="text-lg font-bold text-gray-800">
          <span className="text-sky-600">Smart</span>
          <span className="text-green-600">Pantry</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/dashboard"
            className="text-sm text-gray-600 hover:text-sky-600 font-medium transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/dashboard/items"
            className="text-sm text-gray-600 hover:text-sky-600 font-medium transition-colors"
          >
            Items
          </Link>
          <Link
            to="/dashboard/profile"
            className="text-sm text-gray-600 hover:text-sky-600 font-medium transition-colors"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm bg-sky-200/60 hover:bg-sky-300/60 text-sky-700 px-4 py-1.5 rounded-lg font-medium transition-all cursor-pointer border border-sky-300/50"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
