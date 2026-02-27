import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        mobile: "",
        email: "",
        displayName: "",
        role: "user",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/users/register`,
                formData
            );

            toast.success("Account created!");
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-10 relative">

            {/* Background glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/8 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="w-full max-w-sm relative">

                {/* Brand */}
                <div className="text-center mb-8">
                    <Link to="/" className="text-2xl font-bold text-white">
                        <span className="text-emerald-400">Smart</span>Pantry
                    </Link>
                    <p className="text-slate-500 text-sm mt-2">Create a new account</p>
                </div>

                {/* Form Card */}
                <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-sm font-medium text-slate-300 mb-1 block">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="johndoe"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-300 mb-1 block">Display Name</label>
                                <input
                                    type="text"
                                    name="displayName"
                                    placeholder="John Doe"
                                    value={formData.displayName}
                                    onChange={handleChange}
                                    className="w-full bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-300 mb-1 block">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-300 mb-1 block">Mobile</label>
                            <input
                                type="text"
                                name="mobile"
                                placeholder="+919876543210"
                                value={formData.mobile}
                                onChange={handleChange}
                                className="w-full bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-300 mb-1 block">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-500 hover:bg-emerald-400 text-white p-3 rounded-lg font-medium transition-colors disabled:opacity-50 cursor-pointer shadow-lg shadow-emerald-500/20"
                        >
                            {loading ? "Creating..." : "Create Account"}
                        </button>

                    </form>
                </div>

                {/* Links */}
                <div className="text-center mt-6 space-y-2">
                    <p className="text-sm text-slate-500">
                        Already have an account?{" "}
                        <Link to="/login" className="text-emerald-400 font-medium hover:text-emerald-300">
                            Sign In
                        </Link>
                    </p>
                    <Link to="/" className="text-xs text-slate-600 hover:text-slate-400 inline-block">
                        Back to home
                    </Link>
                </div>

            </div>
        </div>
    );

}

export default Register;