import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 via-green-50 to-sky-200 text-gray-800">

            {/* Navbar */}
            <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
                <div className="text-xl font-bold tracking-tight">
                    <span className="text-sky-600">Smart</span><span className="text-green-700">Pantry</span>
                </div>
                <div className="flex items-center gap-3">
                    <Link to="/login" className="text-gray-600 hover:text-sky-600 font-medium transition-colors px-4 py-2">
                        Login
                    </Link>
                    <Link to="/register" className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md shadow-sky-400/30">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <section className="max-w-6xl mx-auto px-6 pt-28 pb-36 relative">
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-300/30 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute top-40 left-1/4 w-[300px] h-[300px] bg-sky-300/25 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="relative text-center">
                    <div className="inline-block bg-green-200/60 border border-green-300/50 text-green-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                        Smart Food Management
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 max-w-4xl mx-auto text-gray-800">
                        Track your food.
                        <br />
                        <span className="bg-gradient-to-r from-sky-500 to-green-500 bg-clip-text text-transparent">Reduce waste.</span>
                    </h1>

                    <p className="text-lg text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed">
                        A simple tool to manage your pantry, monitor expiry dates, and get reminders before your food goes bad.
                    </p>

                    <div className="flex items-center justify-center gap-4">
                        <Link to="/register" className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-sky-400/30">
                            Start Free
                        </Link>
                        <Link to="/login" className="bg-green-100/60 border border-green-200 hover:bg-green-200/60 text-green-700 px-8 py-3.5 rounded-xl font-semibold transition-all">
                            Sign In
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="border-t border-sky-200/50">
                <div className="max-w-6xl mx-auto px-6 py-20">
                    <h2 className="text-2xl font-bold text-center mb-12 text-gray-800">What you can do</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="bg-sky-100/60 backdrop-blur-sm rounded-xl p-6 border border-sky-200/50 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-200/30 transition-all">
                            <div className="w-10 h-10 bg-sky-200 rounded-lg flex items-center justify-center text-sky-600 font-bold mb-4">1</div>
                            <h3 className="font-semibold mb-2 text-gray-800">Track Items</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">Add food items with purchase and expiry dates. See everything at a glance.</p>
                        </div>

                        <div className="bg-green-100/60 backdrop-blur-sm rounded-xl p-6 border border-green-200/50 hover:border-green-300 hover:shadow-lg hover:shadow-green-200/30 transition-all">
                            <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center text-green-600 font-bold mb-4">2</div>
                            <h3 className="font-semibold mb-2 text-gray-800">Monitor Freshness</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">Automatic freshness scores and expiry countdown for every item in your pantry.</p>
                        </div>

                        <div className="bg-teal-100/60 backdrop-blur-sm rounded-xl p-6 border border-teal-200/50 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-200/30 transition-all">
                            <div className="w-10 h-10 bg-teal-200 rounded-lg flex items-center justify-center text-teal-600 font-bold mb-4">3</div>
                            <h3 className="font-semibold mb-2 text-gray-800">Get Alerts</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">Know which items are expiring soon so you can use them before they go to waste.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="border-t border-green-200/50">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-3 gap-8 text-center">
                        <div className="bg-sky-200/40 rounded-xl p-6">
                            <div className="text-3xl font-bold text-sky-600 mb-1">100%</div>
                            <div className="text-sm text-gray-500">Food Tracked</div>
                        </div>
                        <div className="bg-green-200/40 rounded-xl p-6">
                            <div className="text-3xl font-bold text-green-600 mb-1">Real-time</div>
                            <div className="text-sm text-gray-500">Expiry Alerts</div>
                        </div>
                        <div className="bg-teal-200/40 rounded-xl p-6">
                            <div className="text-3xl font-bold text-teal-600 mb-1">Zero</div>
                            <div className="text-sm text-gray-500">Food Waste</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-6xl mx-auto px-6 py-20">
                <div className="bg-gradient-to-r from-sky-400 via-teal-400 to-green-400 rounded-2xl p-12 text-center shadow-xl shadow-sky-300/20">
                    <h2 className="text-3xl font-bold mb-4 text-white">Ready to get started?</h2>
                    <p className="text-sky-50 mb-8 max-w-md mx-auto">Create a free account and start managing your pantry today.</p>
                    <Link to="/register" className="inline-block bg-white text-sky-600 px-8 py-3.5 rounded-xl font-semibold transition-all hover:bg-sky-50 shadow-md">
                        Create Free Account
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-sky-200/50 py-6">
                <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm text-gray-400">
                    <span>SmartPantry</span>
                    <span>MERN Stack Project</span>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
