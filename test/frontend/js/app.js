// frontend/js/app.js
// 这里不需要 import，直接使用 window 上的变量

function App() {
    const [cards, setCards] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [showForm, setShowForm] = React.useState(false);
    const [editCard, setEditCard] = React.useState(null);
    const [showThemeEditor, setShowThemeEditor] = React.useState(false);
    const [themes, setThemes] = React.useState(null);
    const [search, setSearch] = React.useState('');
    const [filters, setFilters] = React.useState({ environment: 'all', cardType: 'all', type: 'all', rarity: 'all' });

    React.useEffect(() => {
        window.api.getThemes().then(data => {
            setThemes(data);
            applyTheme(data.themes[data.current]);
        });
    }, []);

    React.useEffect(() => {
        window.api.getCards().then(data => {
            setCards(data);
            setLoading(false);
        });
    }, []);

    const applyTheme = (theme) => {
        if (!theme) return;
        const root = document.documentElement;
        root.style.setProperty('--primary', theme.primary);
        root.style.setProperty('--secondary', theme.secondary);
        root.style.setProperty('--accent', theme.accent);
        root.style.setProperty('--background', theme.background);
        root.style.setProperty('--text', theme.text);
        root.style.setProperty('--cardBg', theme.cardBg);
        root.style.setProperty('--navBg', theme.navBg);
    };

    const setTheme = (themeId) => {
        const theme = themes.themes[themeId];
        setThemes({...themes, current: themeId});
        applyTheme(theme);
    };

    const handleSave = async (cardData) => {
        if (cardData.id) await window.api.updateCard(cardData.id, cardData);
        else await window.api.addCard(cardData);
        const data = await window.api.getCards();
        setCards(data);
        setShowForm(false);
        setEditCard(null);
    };

    const handleDelete = async (id) => {
        if (!confirm('确定删除？')) return;
        await window.api.deleteCard(id);
        const data = await window.api.getCards();
        setCards(data);
    };

    const handleEdit = (card) => { setEditCard(card); setShowForm(true); };
    const handleFilterChange = (key, value) => { setFilters({...filters, [key]: value}); };

    const filteredCards = cards.filter(card => {
        const matchSearch = card.name.toLowerCase().includes(search.toLowerCase());
        const matchEnv = filters.environment === 'all' || card.environment === filters.environment;
        const matchType = filters.cardType === 'all' || card.cardType === filters.cardType;
        const matchPokemonType = filters.type === 'all' || card.type === filters.type;
        const matchRarity = filters.rarity === 'all' || card.rarity === filters.rarity;
        return matchSearch && matchEnv && matchType && matchPokemonType && matchRarity;
    });

    const filterStats = {
        env: window.CONFIG.ENVIRONMENTS.reduce((acc, env) => {
            acc[env] = cards.filter(c => c.environment === env).length;
            return acc;
        }, {})
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="text-center text-2xl">🃏 加载中...</div></div>;

    return (
        <window.ThemeContext.Provider value={{ themes, setTheme }}>
            <div className="min-h-screen pb-20">
                <nav className="nav-gradient text-white p-4 shadow-lg sticky top-0 z-40">
                    <div className="max-w-6xl mx-auto flex justify-between items-center">
                        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                            <span className="bg-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono text-red-500 font-bold">P</span>
                            PTCG Manager
                        </h1>
                        <div className="flex gap-2">
                            <button onClick={() => setShowThemeEditor(true)} className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 font-medium text-sm backdrop-blur">🎨 主题</button>
                            <button onClick={() => { setEditCard(null); setShowForm(true); }} className="px-4 py-2 rounded-lg bg-white text-red-500 font-bold hover:bg-gray-100 text-sm shadow">+ 新增</button>
                        </div>
                    </div>
                </nav>

                <div className="max-w-6xl mx-auto p-4 md:p-8">
                    <window.StatsPanel cards={cards} />
                    <div className="mb-4">
                        <input type="text" placeholder="🔍 搜索卡牌名称..." className="w-full p-3 border-2 rounded-xl outline-none bg-white shadow" value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <window.FilterPanel filters={filters} onFilterChange={handleFilterChange} stats={filterStats} />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCards.map(card => <window.CardItem key={card.id} card={card} onDelete={handleDelete} onEdit={handleEdit} />)}
                    </div>
                    {filteredCards.length === 0 && <div className="text-center py-20 opacity-50"><div className="text-6xl mb-4">🃏</div><p>没有找到匹配的卡牌</p></div>}
                </div>

                {showForm && <window.CardForm card={editCard} onSave={handleSave} onCancel={() => { setShowForm(false); setEditCard(null); }} />}
                {showThemeEditor && <window.ThemeEditor onClose={() => setShowThemeEditor(false)} />}
            </div>
        </window.ThemeContext.Provider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
