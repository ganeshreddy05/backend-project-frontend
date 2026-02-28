import { useState, useEffect } from "react";
import api from "../utils/api.js";
import ItemCard from "../components/ItemCard.jsx";
import toast from "react-hot-toast";

const Items = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [categories, setCategories] = useState([]);
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [formData, setFormData] = useState({ name: "", category: "", quantity: 1, purchaseDate: "", expiryDate: "" });

    const fetchItems = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (searchQuery) params.append("search", searchQuery);
            if (categoryFilter) params.append("category", categoryFilter);
            params.append("page", currentPage);
            params.append("limit", 12);
            params.append("sortBy", sortBy);
            params.append("sortOrder", sortOrder);
            const response = await api.get(`/items?${params.toString()}`);
            setItems(response.data.data);
            setTotalPages(response.data.totalPages);
            setTotalItems(response.data.totalItems);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load items");
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try { const response = await api.get("/items/categories"); setCategories(response.data.data); } catch (error) { console.error(error); }
    };

    useEffect(() => { fetchItems(); }, [searchQuery, categoryFilter, sortBy, sortOrder, currentPage]);
    useEffect(() => { fetchCategories(); }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = { ...formData, quantity: Number(formData.quantity) };
            if (editingItem) {
                await api.put(`/items/${editingItem._id}`, dataToSend);
                toast.success("Item updated!");
            } else {
                await api.post("/items", dataToSend);
                toast.success("Item added!");
            }
            resetForm(); fetchItems(); fetchCategories();
        } catch (error) { console.error(error); toast.error("Something went wrong!"); }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({ name: item.name, category: item.category, quantity: item.quantity, purchaseDate: item.purchaseDate.split("T")[0], expiryDate: item.expiryDate.split("T")[0] });
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (itemId) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;
        try { await api.delete(`/items/${itemId}`); toast.success("Item deleted!"); fetchItems(); fetchCategories(); }
        catch (error) { console.error(error); toast.error("Failed to delete item!"); }
    };

    const resetForm = () => { setFormData({ name: "", category: "", quantity: 1, purchaseDate: "", expiryDate: "" }); setEditingItem(null); setShowForm(false); };
    const clearFilters = () => { setSearchQuery(""); setCategoryFilter(""); setSortBy("createdAt"); setSortOrder("desc"); setCurrentPage(1); };

    const inputClass = "w-full bg-sky-100/50 border border-sky-200 text-gray-800 placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent";

    if (loading && items.length === 0) {
        return (<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-green-50 to-teal-100"><div className="text-gray-500 font-medium">Loading items...</div></div>);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 via-green-50 to-teal-100 p-6">
            <div className="max-w-7xl mx-auto">

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">My Items</h1>
                    <button onClick={() => { if (showForm) resetForm(); else setShowForm(true); }}
                        className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white px-5 py-2.5 rounded-xl font-medium transition-all cursor-pointer shadow-lg shadow-sky-400/25">
                        {showForm ? "Cancel" : "+ Add Item"}
                    </button>
                </div>

                {showForm && (
                    <div className="bg-green-50/60 backdrop-blur-sm rounded-xl p-6 mb-6 border border-green-200/50 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">{editingItem ? "Edit Item" : "Add New Item"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" name="name" placeholder="Item Name (e.g. Milk)" value={formData.name} onChange={handleChange} className={inputClass} required />
                                <input type="text" name="category" placeholder="Category (e.g. Dairy)" value={formData.category} onChange={handleChange} className={inputClass} required />
                                <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} className={inputClass} min="1" required />
                                <div></div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">Purchase Date</label>
                                    <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} className={inputClass} required />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">Expiry Date</label>
                                    <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className={inputClass} required />
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button type="submit" className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-white px-6 py-2.5 rounded-lg font-medium transition-all cursor-pointer shadow-md">{editingItem ? "Update Item" : "Add Item"}</button>
                                <button type="button" onClick={resetForm} className="bg-sky-100 hover:bg-sky-200 text-gray-600 px-6 py-2.5 rounded-lg font-medium transition-colors cursor-pointer border border-sky-200">Cancel</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="bg-sky-50/60 backdrop-blur-sm rounded-xl p-4 mb-6 border border-sky-200/50 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Search</label>
                            <input type="text" placeholder="Search by name..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="w-full bg-sky-100/50 border border-sky-200 text-gray-800 placeholder-gray-400 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Category</label>
                            <select value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }} className="w-full bg-sky-100/50 border border-sky-200 text-gray-800 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent">
                                <option value="">All Categories</option>
                                {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Sort By</label>
                            <select value={`${sortBy}-${sortOrder}`} onChange={(e) => { const [field, order] = e.target.value.split("-"); setSortBy(field); setSortOrder(order); setCurrentPage(1); }} className="w-full bg-sky-100/50 border border-sky-200 text-gray-800 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent">
                                <option value="createdAt-desc">Newest First</option>
                                <option value="createdAt-asc">Oldest First</option>
                                <option value="expiryDate-asc">Expiry: Soonest</option>
                                <option value="expiryDate-desc">Expiry: Latest</option>
                                <option value="name-asc">Name: A to Z</option>
                                <option value="name-desc">Name: Z to A</option>
                            </select>
                        </div>
                        <div>
                            <button onClick={clearFilters} className="w-full bg-sky-100 hover:bg-sky-200 text-gray-600 p-2.5 rounded-lg font-medium transition-colors cursor-pointer border border-sky-200">Clear Filters</button>
                        </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-500">
                        Showing {items.length} of {totalItems} items
                        {searchQuery && <span> matching "<strong className="text-gray-700">{searchQuery}</strong>"</span>}
                        {categoryFilter && <span> in <strong className="text-gray-700">{categoryFilter}</strong></span>}
                    </div>
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">{searchQuery || categoryFilter ? "No items match your search/filter." : "No items in your pantry yet."}</p>
                        <p className="text-gray-400 text-sm mt-2">{searchQuery || categoryFilter ? "Try clearing the filters." : 'Click "+ Add Item" to get started!'}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {items.map((item) => (<ItemCard key={item._id} item={item} onEdit={handleEdit} onDelete={handleDelete} />))}
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-3 mt-8">
                        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 rounded-lg bg-sky-100 border border-sky-200 text-gray-600 hover:bg-sky-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-sm">Previous</button>
                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button key={page} onClick={() => setCurrentPage(page)} className={`w-10 h-10 rounded-lg font-medium transition-colors cursor-pointer ${currentPage === page ? "bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-md shadow-sky-400/20" : "bg-sky-100 border border-sky-200 text-gray-600 hover:bg-sky-200"}`}>{page}</button>
                            ))}
                        </div>
                        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-4 py-2 rounded-lg bg-sky-100 border border-sky-200 text-gray-600 hover:bg-sky-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-sm">Next</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Items;
