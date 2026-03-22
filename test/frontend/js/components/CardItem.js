// frontend/js/components/CardItem.js
// 不需要 import，直接使用 window.TYPE_COLORS
window.CardItem = function({ card, onDelete, onEdit }) {
    const typeColor = type => window.TYPE_COLORS[type] || '#888';

    return (
        <div className="card-container rounded-xl p-4 shadow-lg hover:shadow-xl transition-all relative">
            {card.environment && card.environment !== "未知" && (
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full env-badge flex items-center justify-center text-lg font-bold">
                    {card.environment}
                </div>
            )}

            <div className="flex justify-between items-start mb-2">
                <div className="flex-1 pr-4">
                    <h3 className="font-bold text-lg leading-tight">{card.name}</h3>
                    <div className="flex gap-2 mt-2 flex-wrap">
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">{card.cardType}</span>
                        <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs font-medium">{card.rarity}</span>
                        {card.type && <span className="type-badge" style={{backgroundColor: typeColor(card.type)}}>{card.type}</span>}
                    </div>
                </div>
                <span className="text-xs opacity-50 whitespace-nowrap">{card.loginDate}</span>
            </div>

            {card.cardType === '宝可梦' && (
                <div className="mt-3 pt-3 border-t border-dashed border-gray-200 text-sm grid grid-cols-2 gap-2">
                    <div><span className="opacity-50">HP:</span> <span className="font-bold text-red-500">{card.hp || '-'}</span></div>
                    <div><span className="opacity-50">进化:</span> {card.stage || '-'}</div>
                    {card.weakness && <div className="col-span-2"><span className="opacity-50">弱点:</span> {card.weakness}</div>}
                </div>
            )}

            {(card.cardType === '支援者' || card.cardType === '道具') && card.effect && (
                <div className="mt-3 pt-3 border-t border-dashed border-gray-200">
                    <p className="text-xs opacity-70 line-clamp-2 italic">"{card.effect}"</p>
                </div>
            )}

            {card.cardType === '能量' && (
                <div className="mt-3 pt-3 border-t border-dashed border-gray-200 text-sm">
                    <span className={card.energyType === '特殊能量' ? 'text-purple-600 font-bold' : ''}>⚡ {card.energyType}</span>
                </div>
            )}

            <div className="mt-4 flex gap-2">
                <button onClick={() => onEdit(card)} className="flex-1 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded font-medium">编辑</button>
                <button onClick={() => onDelete(card.id)} className="flex-1 py-1 text-sm text-red-500 hover:bg-red-50 rounded font-medium">删除</button>
            </div>
        </div>
    );
};
