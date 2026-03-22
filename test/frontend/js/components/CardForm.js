// frontend/js/components/CardForm.js
// 使用 window.CONFIG
window.CardForm = function({ card, onSave, onCancel }) {
    const isEdit = !!card;
    const [formData, setFormData] = React.useState(card || {
        loginDate: new Date().toISOString().split('T')[0],
        name: '', cardType: '宝可梦', rarity: 'R', environment: 'H',
        type: '', hp: '', weakness: '', stage: '', effect: '', energyType: '基本能量'
    });

    const handleChange = (field, value) => {
        let newFormData = { ...formData, [field]: value };
        if (field === 'cardType' && value === '能量') newFormData.environment = '';
        if (field === 'cardType' && value !== '能量' && !formData.environment) newFormData.environment = 'H';
        setFormData(newFormData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim()) return alert('请输入卡牌名称');
        onSave(formData);
    };

    // 注意：这里引用 CONFIG 改为 window.CONFIG
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={onCancel}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl my-8" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-2xl">🃏</span> {isEdit ? '编辑卡牌' : '录入新卡'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold opacity-50 mb-1 uppercase">卡牌名称 *</label>
                        <input className="w-full p-2 border-2 rounded-lg outline-none" value={formData.name} onChange={e => handleChange('name', e.target.value)} placeholder="输入卡牌名称" autoFocus />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold opacity-50 mb-1">类型</label>
                            <select className="w-full p-2 border-2 rounded-lg bg-white" value={formData.cardType} onChange={e => handleChange('cardType', e.target.value)}>
                                {window.CONFIG.CARD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold opacity-50 mb-1">稀有度</label>
                            <select className="w-full p-2 border-2 rounded-lg bg-white" value={formData.rarity} onChange={e => handleChange('rarity', e.target.value)}>
                                {window.CONFIG.RARITIES.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                        </div>
                    </div>

                    {formData.cardType !== '能量' && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <label className="block text-xs font-bold opacity-50 mb-2">环境标志</label>
                            <div className="flex gap-2">
                                {window.CONFIG.ENVIRONMENTS.map(env => (
                                    <button key={env} type="button" onClick={() => handleChange('environment', env)}
                                        className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${formData.environment === env ? 'env-badge text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}>
                                        {env}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold opacity-50 mb-1">登录日期</label>
                        <input type="date" className="w-full p-2 border-2 rounded-lg" value={formData.loginDate} onChange={e => handleChange('loginDate', e.target.value)} />
                    </div>

                    {formData.cardType === '宝可梦' && (
                        <div className="space-y-3 p-3 bg-red-50 rounded-lg border border-red-100">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs opacity-50 mb-1">属性</label>
                                    <select className="w-full p-2 border rounded-lg bg-white text-sm" value={formData.type || ''} onChange={e => handleChange('type', e.target.value)}>
                                        <option value="">选择</option>
                                        {window.CONFIG.POKEMON_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs opacity-50 mb-1">HP</label>
                                    <input type="number" className="w-full p-2 border rounded-lg text-sm" value={formData.hp || ''} onChange={e => handleChange('hp', e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs opacity-50 mb-1">进化</label>
                                    <select className="w-full p-2 border rounded-lg bg-white text-sm" value={formData.stage || ''} onChange={e => handleChange('stage', e.target.value)}>
                                        <option value="">选择</option>
                                        {window.CONFIG.STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs opacity-50 mb-1">弱点</label>
                                    <select className="w-full p-2 border rounded-lg bg-white text-sm" value={formData.weakness || ''} onChange={e => handleChange('weakness', e.target.value)}>
                                        <option value="">选择</option>
                                        {window.CONFIG.POKEMON_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {(formData.cardType === '支援者' || formData.cardType === '道具') && (
                        <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                            <label className="block text-xs opacity-50 mb-1">效果/特性</label>
                            <textarea className="w-full p-2 border rounded-lg text-sm" value={formData.effect || ''} onChange={e => handleChange('effect', e.target.value)} rows="2" />
                        </div>
                    )}

                    {formData.cardType === '能量' && (
                        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                            <label className="block text-xs opacity-50 mb-1">能量类型</label>
                            <div className="flex gap-2 mb-2">
                                {['基本能量', '特殊能量'].map(et => (
                                    <button key={et} type="button" onClick={() => handleChange('energyType', et)}
                                        className={`flex-1 p-2 rounded text-sm font-medium ${formData.energyType === et ? 'bg-yellow-400 text-white' : 'bg-white border'}`}>
                                        {et}
                                    </button>
                                ))}
                            </div>
                            {formData.energyType === '特殊能量' && (
                                <textarea className="w-full p-2 border rounded-lg text-sm" placeholder="特殊能量效果..." value={formData.effect || ''} onChange={e => handleChange('effect', e.target.value)} />
                            )}
                        </div>
                    )}

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onCancel} className="flex-1 py-2 border-2 rounded-lg hover:bg-gray-50 font-bold">取消</button>
                        <button type="submit" className="flex-1 py-2 btn-primary rounded-lg shadow font-bold">保存</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
