import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-white">

            {/* Navbar */}
            <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
                <div className="text-xl font-bold tracking-tight">
                    <span className="text-emerald-400">Smart</span>Pantry
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        to="/login"
                        className="text-slate-400 hover:text-white font-medium transition-colors px-4 py-2"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="bg-emerald-500 hover:bg-emerald-400 text-white px-5 py-2.5 rounded-lg font-medium transition-all"
                    >
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <section className="max-w-6xl mx-auto px-6 pt-28 pb-36 relative">
                {/* Background glow */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="relative text-center">
                    <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                        Smart Food Management
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 max-w-4xl mx-auto">
                        Track your food.
                        <br />
                        <span className="text-emerald-400">Reduce waste.</span>
                    </h1>

                    <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
                        A simple tool to manage your pantry, monitor expiry dates, and get reminders before your food goes bad.
                    </p>

                    <div className="flex items-center justify-center gap-4">
                        <Link
                            to="/register"
                            className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3.5 rounded-lg font-semibold transition-all shadow-lg shadow-emerald-500/20"
                        >
                            Start Free
                        </Link>
                        <Link
                            to="/login"
                            className="bg-slate-800 border border-slate-700 hover:border-slate-600 text-white px-8 py-3.5 rounded-lg font-semibold transition-all"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="border-t border-slate-800">
                <div className="max-w-6xl mx-auto px-6 py-20">
                    <h2 className="text-2xl font-bold text-center mb-12">
                        What you can do
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/50 hover:border-emerald-500/30 transition-colors">
                            <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 font-bold mb-4">1</div>
                            <h3 className="font-semibold mb-2">Track Items</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">Add food items with purchase and expiry dates. See everything at a glance.</p>
                        </div>

                        <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/50 hover:border-teal-500/30 transition-colors">
                            <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center text-teal-400 font-bold mb-4">2</div>
                            <h3 className="font-semibold mb-2">Monitor Freshness</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">Automatic freshness scores and expiry countdown for every item in your pantry.</p>
                        </div>

                        <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-colors">
                            <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-400 font-bold mb-4">3</div>
                            <h3 className="font-semibold mb-2">Get Alerts</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">Know which items are expiring soon so you can use them before they go to waste.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="border-t border-slate-800">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-emerald-400 mb-1">100%</div>
                            <div className="text-sm text-slate-500">Food Tracked</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-teal-400 mb-1">Real-time</div>
                            <div className="text-sm text-slate-500">Expiry Alerts</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-cyan-400 mb-1">Zero</div>
                            <div className="text-sm text-slate-500">Food Waste</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-6xl mx-auto px-6 py-20">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-12 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
                    <p className="text-emerald-100 mb-8 max-w-md mx-auto">
                        Create a free account and start managing your pantry today.
                    </p>
                    <Link
                        to="/register"
                        className="inline-block bg-white text-emerald-700 px-8 py-3.5 rounded-lg font-semibold transition-all hover:bg-emerald-50"
                    >
                        Create Free Account
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-800 py-6">
                <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm text-slate-600">
                    <span>SmartPantry</span>
                    <span>MERN Stack Project</span>
                </div>
            </footer>

        </div>
    );
};

export default LandingPage;
