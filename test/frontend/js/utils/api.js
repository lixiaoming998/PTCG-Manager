// frontend/js/utils/api.js
const API_URL = 'http://127.0.0.1:5000/api';

window.api = {
    async getCards() {
        const res = await fetch(`${API_URL}/cards`);
        return res.json();
    },
    async addCard(card) {
        const res = await fetch(`${API_URL}/cards`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(card)
        });
        return res.json();
    },
    async updateCard(id, card) {
        const res = await fetch(`${API_URL}/cards/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(card)
        });
        return res.json();
    },
    async deleteCard(id) {
        await fetch(`${API_URL}/cards/${id}`, { method: 'DELETE' });
    },
    async getThemes() {
        const res = await fetch(`${API_URL}/themes`);
        return res.json();
    },
    async setTheme(themeId) {
        await fetch(`${API_URL}/themes/current`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({themeId})
        });
    },
    async saveCustomTheme(theme) {
        await fetch(`${API_URL}/themes/custom`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(theme)
        });
    }
};
