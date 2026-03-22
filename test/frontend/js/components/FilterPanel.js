// frontend/js/components/FilterPanel.js
window.FilterPanel = function({ filters, onFilterChange, stats }) {
    return (
        <div className="bg-white rounded-xl p-4 shadow-lg mb-6 space-y-4">
            {/* 环境 */}
            <div>
                <div className="text-xs font-bold opacity-50 mb-2">环境</div>
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => onFilterChange('environment', 'all')} className={`filter-tag px-4 py-1.5 rounded-full text-sm font-medium border-2 ${filters.environment === 'all' ? 'active' : 'bg-white'}`}>全部</button>
                    {window.CONFIG.ENVIRONMENTS.map(env => (
                        <button key={env} onClick={() => onFilterChange('environment', env)} className={`filter-tag px-4 py-1.5 rounded-full text-sm font-medium border-2 ${filters.environment === env ? 'active' : 'bg-white'}`}>
                            {env} ({stats.env[env] || 0})
                        </button>
                    ))}
                </div>
            </div>

            {/* 卡牌类型 */}
            <div>
                <div className="text-xs font-bold opacity-50 mb-2">卡牌类型</div>
                <div className="flex flex-wrap gap-2">
                    {['全部', ...window.CONFIG.CARD_TYPES].map(type => (
                        <button key={type} onClick={() => onFilterChange('cardType', type === '全部' ? 'all' : type)} className={`filter-tag px-4 py-1.5 rounded-full text-sm font-medium border-2 ${filters.cardType === (type === '全部' ? 'all' : type) ? 'active' : 'bg-white'}`}>{type}</button>
                    ))}
                </div>
            </div>

            {/* 属性 */}
            <div>
                <div className="text-xs font-bold opacity-50 mb-2">属性</div>
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => onFilterChange('type', 'all')} className={`filter-tag px-4 py-1.5 rounded-full text-sm font-medium border-2 ${filters.type === 'all' ? 'active' : 'bg-white'}`}>全部</button>
                    {window.CONFIG.POKEMON_TYPES.map(type => (
                        <button key={type} onClick={() => onFilterChange('type', type)} className={`filter-tag px-4 py-1.5 rounded-full text-sm font-medium border-2 ${filters.type === type ? 'active' : 'bg-white'}`}>{type}</button>
                    ))}
                </div>
            </div>

            {/* 稀有度 */}
            <div>
                <div className="text-xs font-bold opacity-50 mb-2">稀有度</div>
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => onFilterChange('rarity', 'all')} className={`filter-tag px-4 py-1.5 rounded-full text-sm font-medium border-2 ${filters.rarity === 'all' ? 'active' : 'bg-white'}`}>全部</button>
                    {window.CONFIG.RARITIES.slice(0, 8).map(rarity => (
                        <button key={rarity} onClick={() => onFilterChange('rarity', rarity)} className={`filter-tag px-4 py-1.5 rounded-full text-sm font-medium border-2 ${filters.rarity === rarity ? 'active' : 'bg-white'}`}>{rarity}</button>
                    ))}
                </div>
            </div>
        </div>
    );
};
