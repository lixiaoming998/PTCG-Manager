// frontend/js/components/ThemeEditor.js
window.ThemeEditor = function({ onClose }) {
    // 使用全局 Context
    const { themes, setTheme } = React.useContext(window.ThemeContext);
    const [customColors, setCustomColors] = React.useState({
        primary: '#FFCB05', secondary: '#FF9500', accent: '#FFCB05',
        background: '#FFF9E6', text: '#333333', cardBg: '#FFFFFF'
    });

    const handleSelectTheme = async (themeId) => {
        await window.api.setTheme(themeId);
        setTheme(themeId);
        onClose();
    };

    const handleSaveCustom = async () => {
        await window.api.saveCustomTheme(customColors);
        await window.api.setTheme('custom');
        setTheme('custom');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">🎨 主题设置</h2>
                    <button onClick={onClose} className="text-2xl opacity-50 hover:opacity-100">×</button>
                </div>

                <div className="mb-8">
                    <h3 className="text-sm font-bold opacity-50 mb-3">预设主题</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {Object.entries(themes?.themes || {}).filter(([id]) => id !== 'custom').map(([id, theme]) => (
                            <button key={id} onClick={() => handleSelectTheme(id)} className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${themes?.current === id ? 'border-4 border-blue-500' : 'border-gray-200'}`} style={{background: theme.navBg}}>
                                <div className="text-white font-bold text-sm mb-2">{theme.name}</div>
                                <div className="flex gap-1"><div className="w-6 h-6 rounded" style={{backgroundColor: theme.primary}}></div><div className="w-6 h-6 rounded" style={{backgroundColor: theme.secondary}}></div><div className="w-6 h-6 rounded" style={{backgroundColor: theme.accent}}></div></div>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-bold opacity-50 mb-3">自定义主题</h3>
                    <div className="space-y-4 bg-gray-50 p-4 rounded-xl">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {Object.entries(customColors).map(([key, value]) => (
                                <div key={key}>
                                    <label className="block text-xs opacity-50 mb-1">{key}</label>
                                    <input type="color" value={value} onChange={e => setCustomColors({...customColors, [key]: e.target.value})} className="w-full h-10 rounded cursor-pointer" />
                                </div>
                            ))}
                        </div>
                        <button onClick={handleSaveCustom} className="w-full py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600">应用自定义主题</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
