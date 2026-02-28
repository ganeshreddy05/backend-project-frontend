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
            const options = { method: "POST", body: JSON.stringify({ username, password }), headers: { "Content-Type": "application/json" }, credentials: "include" };
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/login`, options);
            const jsonData = await response.json();
            if (!response.ok) throw new Error(jsonData.message || "Login failed");
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
        <div className="min-h-screen bg-gradient-to-br from-sky-200 via-sky-100 to-green-100 flex items-center justify-center px-4 relative">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-300/25 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-green-300/20 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="w-full max-w-sm relative">
                <div className="text-center mb-8">
                    <Link to="/" className="text-2xl font-bold text-gray-800">
                        <span className="text-sky-600">Smart</span><span className="text-green-600">Pantry</span>
                    </Link>
                    <p className="text-gray-500 text-sm mt-2">Sign in to your account</p>
                </div>

                <div className="bg-sky-50/70 backdrop-blur-sm rounded-xl p-8 border border-sky-200/60 shadow-lg shadow-sky-200/20">
                    <form onSubmit={logInUser} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-1.5 block">Username</label>
                            <input className="w-full bg-sky-100/50 border border-sky-200 text-gray-800 placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} type="text" required />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-1.5 block">Password</label>
                            <input className="w-full bg-sky-100/50 border border-sky-200 text-gray-800 placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
                        </div>
                        <button className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white p-3 rounded-lg font-medium transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-sky-400/25" type="submit" disabled={loading}>
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-6 space-y-2">
                    <p className="text-sm text-gray-500">Don't have an account?{" "}<Link to="/register" className="text-sky-600 font-medium hover:text-sky-500">Register</Link></p>
                    <Link to="/" className="text-xs text-gray-400 hover:text-gray-600 inline-block">Back to home</Link>
                </div>
            </div>
        </div>
    );
};

export default LogInPage;