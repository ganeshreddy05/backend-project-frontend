import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ username: "", mobile: "", email: "", displayName: "", role: "user", password: "" });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetch("https://backend-node-mongodb-lwi6.onrender.com/users/register", formData);
            toast.success("Account created!");
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full bg-green-100/50 border border-green-200 text-gray-800 placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent";

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-sky-100 to-teal-100 flex items-center justify-center px-4 py-10 relative">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-300/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-sky-300/20 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="w-full max-w-sm relative">
                <div className="text-center mb-8">
                    <Link to="/" className="text-2xl font-bold text-gray-800">
                        <span className="text-sky-600">Smart</span><span className="text-green-600">Pantry</span>
                    </Link>
                    <p className="text-gray-500 text-sm mt-2">Create a new account</p>
                </div>

                <div className="bg-green-50/70 backdrop-blur-sm rounded-xl p-8 border border-green-200/60 shadow-lg shadow-green-200/20">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-sm font-medium text-gray-600 mb-1 block">Username</label>
                                <input type="text" name="username" placeholder="johndoe" value={formData.username} onChange={handleChange} className={inputClass} required />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 mb-1 block">Display Name</label>
                                <input type="text" name="displayName" placeholder="John Doe" value={formData.displayName} onChange={handleChange} className={inputClass} required />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-1 block">Email</label>
                            <input type="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} className={inputClass} required />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-1 block">Mobile</label>
                            <input type="text" name="mobile" placeholder="+919876543210" value={formData.mobile} onChange={handleChange} className={inputClass} required />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-1 block">Password</label>
                            <input type="password" name="password" placeholder="Create a password" value={formData.password} onChange={handleChange} className={inputClass} required />
                        </div>
                        <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-white p-3 rounded-lg font-medium transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-green-400/25">
                            {loading ? "Creating..." : "Create Account"}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-6 space-y-2">
                    <p className="text-sm text-gray-500">Already have an account?{" "}<Link to="/login" className="text-sky-600 font-medium hover:text-sky-500">Sign In</Link></p>
                    <Link to="/" className="text-xs text-gray-400 hover:text-gray-600 inline-block">Back to home</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;