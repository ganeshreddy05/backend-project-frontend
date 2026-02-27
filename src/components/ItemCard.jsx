const ItemCard = ({ item, onEdit, onDelete }) => {

    //calculate days left until expiry
    const daysLeft = Math.ceil(
        (new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
    );

    //calculate freshness percentage
    const totalShelfLife = (new Date(item.expiryDate) - new Date(item.purchaseDate)) / (1000 * 60 * 60 * 24);
    let freshness = Math.round((daysLeft / totalShelfLife) * 100);
    if (freshness < 0) freshness = 0;
    if (freshness > 100) freshness = 100;

    //decide color based on freshness
    let freshnessColor = "bg-emerald-500";
    let freshnessText = "text-emerald-400";
    let badgeBg = "bg-emerald-500/10 border-emerald-500/20";
    if (freshness <= 25) {
        freshnessColor = "bg-red-500";
        freshnessText = "text-red-400";
        badgeBg = "bg-red-500/10 border-red-500/20";
    } else if (freshness <= 50) {
        freshnessColor = "bg-amber-500";
        freshnessText = "text-amber-400";
        badgeBg = "bg-amber-500/10 border-amber-500/20";
    }

    //countdown message
    let countdownMessage;
    if (daysLeft > 0) {
        countdownMessage = `Expires in ${daysLeft} days`;
    } else if (daysLeft === 0) {
        countdownMessage = "Expires today!";
    } else {
        countdownMessage = `Expired ${Math.abs(daysLeft)} days ago`;
    }

    return (
        <div className="bg-slate-800 rounded-xl hover:bg-slate-800/80 transition-all p-5 border border-slate-700/50">

            {/* Top Row - Name and Category */}
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                    <span className="inline-block bg-teal-500/10 text-teal-400 text-xs font-medium px-2 py-1 rounded-md mt-1">
                        {item.category}
                    </span>
                </div>
                <span className="text-sm text-slate-400 font-medium">
                    Qty: {item.quantity}
                </span>
            </div>

            {/* Freshness Bar */}
            <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500 font-medium">Freshness</span>
                    <span className={`text-xs font-bold ${freshnessText}`}>
                        {freshness}%
                    </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                        className={`${freshnessColor} h-2 rounded-full transition-all`}
                        style={{ width: `${freshness}%` }}
                    ></div>
                </div>
            </div>

            {/* Countdown Badge */}
            <div className={`${badgeBg} border ${freshnessText} text-xs font-semibold px-3 py-1.5 rounded-lg text-center mb-3`}>
                {countdownMessage}
            </div>

            {/* Dates */}
            <div className="flex justify-between text-xs text-slate-500 mb-4">
                <span>Bought: {new Date(item.purchaseDate).toLocaleDateString()}</span>
                <span>Expiry: {new Date(item.expiryDate).toLocaleDateString()}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                <button
                    onClick={() => onEdit(item)}
                    className="flex-1 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(item._id)}
                    className="flex-1 bg-red-500/10 text-red-400 hover:bg-red-500/20 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                >
                    Delete
                </button>
            </div>

        </div>
    );
};

export default ItemCard;
