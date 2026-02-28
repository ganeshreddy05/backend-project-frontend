const ItemCard = ({ item, onEdit, onDelete }) => {
    const daysLeft = Math.ceil((new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
    const totalShelfLife = (new Date(item.expiryDate) - new Date(item.purchaseDate)) / (1000 * 60 * 60 * 24);
    let freshness = Math.round((daysLeft / totalShelfLife) * 100);
    if (freshness < 0) freshness = 0;
    if (freshness > 100) freshness = 100;

    let freshnessColor = "bg-green-400";
    let freshnessText = "text-green-600";
    let badgeBg = "bg-green-100 border-green-300";
    if (freshness <= 25) {
        freshnessColor = "bg-red-400";
        freshnessText = "text-red-500";
        badgeBg = "bg-red-100 border-red-300";
    } else if (freshness <= 50) {
        freshnessColor = "bg-amber-400";
        freshnessText = "text-amber-600";
        badgeBg = "bg-amber-100 border-amber-300";
    }

    let countdownMessage;
    if (daysLeft > 0) countdownMessage = `Expires in ${daysLeft} days`;
    else if (daysLeft === 0) countdownMessage = "Expires today!";
    else countdownMessage = `Expired ${Math.abs(daysLeft)} days ago`;

    return (
        <div className="bg-sky-50/60 backdrop-blur-sm rounded-xl hover:shadow-lg hover:shadow-sky-200/40 transition-all p-5 border border-sky-200/50">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <span className="inline-block bg-teal-100 text-teal-600 text-xs font-medium px-2 py-1 rounded-md mt-1 border border-teal-200">{item.category}</span>
                </div>
                <span className="text-sm text-gray-500 font-medium">Qty: {item.quantity}</span>
            </div>
            <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500 font-medium">Freshness</span>
                    <span className={`text-xs font-bold ${freshnessText}`}>{freshness}%</span>
                </div>
                <div className="w-full bg-sky-100 rounded-full h-2">
                    <div className={`${freshnessColor} h-2 rounded-full transition-all`} style={{ width: `${freshness}%` }}></div>
                </div>
            </div>
            <div className={`${badgeBg} border ${freshnessText} text-xs font-semibold px-3 py-1.5 rounded-lg text-center mb-3`}>{countdownMessage}</div>
            <div className="flex justify-between text-xs text-gray-500 mb-4">
                <span>Bought: {new Date(item.purchaseDate).toLocaleDateString()}</span>
                <span>Expiry: {new Date(item.expiryDate).toLocaleDateString()}</span>
            </div>
            <div className="flex gap-2">
                <button onClick={() => onEdit(item)} className="flex-1 bg-sky-100 text-sky-600 hover:bg-sky-200 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer border border-sky-200">Edit</button>
                <button onClick={() => onDelete(item._id)} className="flex-1 bg-red-100 text-red-500 hover:bg-red-200 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer border border-red-200">Delete</button>
            </div>
        </div>
    );
};

export default ItemCard;
