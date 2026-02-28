import { useState, useEffect } from "react";
import api from "../utils/api.js";
import toast from "react-hot-toast";
import useUserStore from "../store/useUserStore.js";

const Dashboard = () => {
    const currentUser = useUserStore((state) => state.user);
    const [allItems, setAllItems] = useState([]);
    const [expiringSoon, setExpiringSoon] = useState([]);
    const [expiredItems, setExpiredItems] = useState([]);
    const [analytics, setAnalytics] = useState({});
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        return "Good evening";
    };

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [itemsRes, expiringSoonRes, expiredRes, analyticsRes, suggestionsRes] = await Promise.all([
                api.get("/items?limit=1000"), api.get("/items/expiring-soon"), api.get("/items/expired"), api.get("/items/analytics"), api.get("/items/suggestions"),
            ]);
            setAllItems(itemsRes.data.data);
            setExpiringSoon(expiringSoonRes.data.data);
            setExpiredItems(expiredRes.data.data);
            setAnalytics(analyticsRes.data.data);
            setSuggestions(suggestionsRes.data.data);
            console.log("Dashboard data loaded succesfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchDashboardData(); }, []);

    const freshItemsCount = allItems.length - expiringSoon.length - expiredItems.length;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-green-50 to-teal-100">
                <div className="text-gray-500 font-medium">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 via-green-50 to-teal-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">{getGreeting()}, {currentUser?.displayName || "User"}</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        You have {allItems.length} items in your pantry
                        {expiringSoon.length > 0 && (<span className="text-amber-600"> — {expiringSoon.length} expiring soon</span>)}
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-sky-100/70 backdrop-blur-sm rounded-xl p-5 border border-sky-200/60 shadow-sm">
                        <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Total Items</p>
                        <p className="text-3xl font-bold text-gray-800">{allItems.length}</p>
                        <div className="w-8 h-1 bg-sky-400 rounded-full mt-3"></div>
                    </div>
                    <div className="bg-amber-100/70 backdrop-blur-sm rounded-xl p-5 border border-amber-200/60 shadow-sm">
                        <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Expiring Soon</p>
                        <p className="text-3xl font-bold text-amber-600">{expiringSoon.length}</p>
                        <div className="w-8 h-1 bg-amber-400 rounded-full mt-3"></div>
                    </div>
                    <div className="bg-red-100/70 backdrop-blur-sm rounded-xl p-5 border border-red-200/60 shadow-sm">
                        <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Expired</p>
                        <p className="text-3xl font-bold text-red-500">{expiredItems.length}</p>
                        <div className="w-8 h-1 bg-red-400 rounded-full mt-3"></div>
                    </div>
                    <div className="bg-green-100/70 backdrop-blur-sm rounded-xl p-5 border border-green-200/60 shadow-sm">
                        <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Fresh</p>
                        <p className="text-3xl font-bold text-green-600">{freshItemsCount}</p>
                        <div className="w-8 h-1 bg-green-400 rounded-full mt-3"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-sky-50/60 backdrop-blur-sm rounded-xl p-6 border border-sky-200/50 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Categories</h2>
                        {Object.keys(analytics).length === 0 ? (
                            <p className="text-gray-400 text-sm">No items added yet.</p>
                        ) : (
                            <div className="space-y-4">
                                {Object.entries(analytics).map(([category, count]) => (
                                    <div key={category} className="flex items-center justify-between">
                                        <span className="text-gray-600 text-sm">{category}</span>
                                        <div className="flex items-center gap-3">
                                            <div className="w-28 bg-sky-200/50 rounded-full h-2">
                                                <div className="bg-sky-400 h-2 rounded-full transition-all" style={{ width: `${Math.min((count / allItems.length) * 100, 100)}%` }}></div>
                                            </div>
                                            <span className="text-sm font-medium text-sky-600 w-6 text-right">{count}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="bg-amber-50/60 backdrop-blur-sm rounded-xl p-6 border border-amber-200/50 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">Use Soon</h2>
                        <p className="text-xs text-gray-500 mb-4">Expiring within 2 days</p>
                        {suggestions.length === 0 ? (
                            <p className="text-gray-400 text-sm">Nothing expiring soon.</p>
                        ) : (
                            <div className="space-y-2">
                                {suggestions.map((item) => (
                                    <div key={item._id} className="flex items-center justify-between bg-amber-100/60 border border-amber-300/50 rounded-lg px-4 py-3">
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">{item.name}</p>
                                            <p className="text-xs text-gray-500">{item.category}</p>
                                        </div>
                                        <span className="text-xs font-medium text-amber-700 bg-amber-200/60 px-2 py-1 rounded">Qty: {item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
