import useUserStore from "../store/useUserStore";

const ProfilePage = () => {
    const currentUser = useUserStore((state) => state.user);
    console.log(currentUser);

    //get the first letter for avatar
    const initial = currentUser?.displayName?.charAt(0)?.toUpperCase() || "U";

    //format the join date
    const joinDate = currentUser?.createdAt
        ? new Date(currentUser.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "N/A";

    return (
        <div className="min-h-screen bg-slate-900 p-8">
            <div className="max-w-2xl mx-auto">

                <h1 className="text-2xl font-bold text-white mb-6">Profile</h1>

                {/* Profile Card */}
                <div className="bg-slate-800 rounded-xl border border-slate-700/50 overflow-hidden">

                    {/* Header with avatar */}
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-8">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl font-bold text-white">
                                {initial}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">
                                    {currentUser?.displayName || "User"}
                                </h2>
                                <p className="text-emerald-100 text-sm">
                                    @{currentUser?.username || "username"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="p-8 space-y-5">

                        <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
                            <span className="text-sm text-slate-500">Username</span>
                            <span className="text-sm font-medium text-white">
                                {currentUser?.username || "—"}
                            </span>
                        </div>

                        <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
                            <span className="text-sm text-slate-500">Display Name</span>
                            <span className="text-sm font-medium text-white">
                                {currentUser?.displayName || "—"}
                            </span>
                        </div>

                        <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
                            <span className="text-sm text-slate-500">Email</span>
                            <span className="text-sm font-medium text-white">
                                {currentUser?.email || "—"}
                            </span>
                        </div>

                        <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
                            <span className="text-sm text-slate-500">Mobile</span>
                            <span className="text-sm font-medium text-white">
                                {currentUser?.mobile || "—"}
                            </span>
                        </div>

                        <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
                            <span className="text-sm text-slate-500">Role</span>
                            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md uppercase tracking-wide">
                                {currentUser?.role || "user"}
                            </span>
                        </div>

                        <div className="flex items-center justify-between py-3">
                            <span className="text-sm text-slate-500">Joined</span>
                            <span className="text-sm font-medium text-slate-300">
                                {joinDate}
                            </span>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default ProfilePage;