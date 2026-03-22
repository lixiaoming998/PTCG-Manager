// frontend/js/components/StatsPanel.js
window.StatsPanel = function({ cards }) {
    const stats = {
        total: cards.length,
        pokemon: cards.filter(c => c.cardType === '宝可梦').length,
        supporter: cards.filter(c => c.cardType === '支援者').length,
        item: cards.filter(c => c.cardType === '道具').length,
        energy: cards.filter(c => c.cardType === '能量').length
    };

    return (
        <div className="grid grid-cols-5 gap-3 mb-6">
            <div className="bg-white rounded-xl p-3 text-center shadow"><div className="text-3xl font-bold text-blue-600">{stats.total}</div><div className="text-xs opacity-50">总计</div></div>
            <div className="bg-white rounded-xl p-3 text-center shadow"><div className="text-3xl font-bold text-red-500">{stats.pokemon}</div><div className="text-xs opacity-50">宝可梦</div></div>
            <div className="bg-white rounded-xl p-3 text-center shadow"><div className="text-3xl font-bold text-purple-500">{stats.supporter}</div><div className="text-xs opacity-50">支援者</div></div>
            <div className="bg-white rounded-xl p-3 text-center shadow"><div className="text-3xl font-bold text-cyan-500">{stats.item}</div><div className="text-xs opacity-50">道具</div></div>
            <div className="bg-white rounded-xl p-3 text-center shadow"><div className="text-3xl font-bold text-yellow-500">{stats.energy}</div><div className="text-xs opacity-50">能量</div></div>
        </div>
    );
};
