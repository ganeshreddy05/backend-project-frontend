import { Link, useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/tokens.js";
import toast from "react-hot-toast";

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/users/logout`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                    credentials: "include",
                }
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
        <nav className="bg-slate-800 border-b border-slate-700/50">
            <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">

                <Link to="/dashboard" className="text-lg font-bold text-white">
                    <span className="text-emerald-400">Smart</span>Pantry
                </Link>

                <div className="flex items-center gap-6">
                    <Link
                        to="/dashboard"
                        className="text-sm text-slate-400 hover:text-white font-medium transition-colors"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/dashboard/items"
                        className="text-sm text-slate-400 hover:text-white font-medium transition-colors"
                    >
                        Items
                    </Link>

                    <Link
                        to="/dashboard/profile"
                        className="text-sm text-slate-400 hover:text-white font-medium transition-colors"
                    >
                        Profile
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white px-4 py-1.5 rounded-lg font-medium transition-all cursor-pointer"
                    >
                        Logout
                    </button>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
