import { useState } from "react";
import { setAccessToken } from "../utils/tokens.js";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const LogInPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const logInUser = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const options = {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            };

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/users/login`,
                options
            );

            const jsonData = await response.json();

            if (!response.ok) {
                throw new Error(jsonData.message || "Login failed");
            }

            setAccessToken(jsonData.accessToken);
            toast.success("Welcome back!");
            navigate("/dashboard");

        } catch (error) {
            console.error(error);
            toast.error(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 relative">

            {/* Background glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/8 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="w-full max-w-sm relative">

                {/* Brand */}
                <div className="text-center mb-8">
                    <Link to="/" className="text-2xl font-bold text-white">
                        <span className="text-emerald-400">Smart</span>Pantry
                    </Link>
                    <p className="text-slate-500 text-sm mt-2">Sign in to your account</p>
                </div>

                {/* Form Card */}
                <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
                    <form onSubmit={logInUser} className="space-y-4">

                        <div>
                            <label className="text-sm font-medium text-slate-300 mb-1.5 block">Username</label>
                            <input
                                className="w-full bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-300 mb-1.5 block">Password</label>
                            <input
                                className="w-full bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                required
                            />
                        </div>

                        <button
                            className="w-full bg-emerald-500 hover:bg-emerald-400 text-white p-3 rounded-lg font-medium transition-colors disabled:opacity-50 cursor-pointer shadow-lg shadow-emerald-500/20"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>

                    </form>
                </div>

                {/* Links */}
                <div className="text-center mt-6 space-y-2">
                    <p className="text-sm text-slate-500">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-emerald-400 font-medium hover:text-emerald-300">
                            Register
                        </Link>
                    </p>
                    <Link to="/" className="text-xs text-slate-600 hover:text-slate-400 inline-block">
                        Back to home
                    </Link>
                </div>

            </div>
        </div>
    );

};

export default LogInPage;