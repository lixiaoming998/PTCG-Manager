"""
主题相关 API
"""
from flask import Blueprint, request, jsonify
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from config import THEMES_PATH

themes_bp = Blueprint('themes', __name__)

# 默认主题
DEFAULT_THEMES = {
    "current": "pikachu",
    "themes": {
        "pikachu": {
            "name": "皮卡丘黄",
            "primary": "#FFCB05",
            "secondary": "#FF0000",
            "accent": "#FFCB05",
            "background": "#FFF9E6",
            "text": "#333333",
            "cardBg": "#FFFFFF",
            "navBg": "linear-gradient(135deg, #FFCB05 0%, #FF9500 100%)"
        },
        "pokeball": {
            "name": "精灵球红",
            "primary": "#FF0000",
            "secondary": "#FFFFFF",
            "accent": "#333333",
            "background": "#FFF0F0",
            "text": "#333333",
            "cardBg": "#FFFFFF",
            "navBg": "linear-gradient(135deg, #FF0000 0%, #CC0000 100%)"
        },
        "mewtwo": {
            "name": "超梦紫",
            "primary": "#9B59B6",
            "secondary": "#8E44AD",
            "accent": "#D5A6E6",
            "background": "#F5E6FF",
            "text": "#333333",
            "cardBg": "#FFFFFF",
            "navBg": "linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)"
        },
        "greninja": {
            "name": "甲贺忍蛙蓝",
            "primary": "#3498DB",
            "secondary": "#2980B9",
            "accent": "#5DADE2",
            "background": "#E6F7FF",
            "text": "#333333",
            "cardBg": "#FFFFFF",
            "navBg": "linear-gradient(135deg, #3498DB 0%, #2980B9 100%)"
        },
        "eevee": {
            "name": "伊布棕",
            "primary": "#D68E8E",
            "secondary": "#C47D7D",
            "accent": "#EAB0B0",
            "background": "#FFF5E6",
            "text": "#333333",
            "cardBg": "#FFFFFF",
            "navBg": "linear-gradient(135deg, #D68E8E 0%, #C47D7D 100%)"
        },
        "dark": {
            "name": "暗夜模式",
            "primary": "#2C3E50",
            "secondary": "#34495E",
            "accent": "#3498DB",
            "background": "#1A1A2E",
            "text": "#EAEAEA",
            "cardBg": "#16213E",
            "navBg": "linear-gradient(135deg, #2C3E50 0%, #34495E 100%)"
        }
    }
}


def load_themes():
    """加载主题配置"""
    if not os.path.exists(THEMES_PATH):
        save_themes(DEFAULT_THEMES)
        return DEFAULT_THEMES

    with open(THEMES_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_themes(themes):
    """保存主题配置"""
    with open(THEMES_PATH, 'w', encoding='utf-8') as f:
        json.dump(themes, f, indent=2, ensure_ascii=False)


@themes_bp.route('', methods=['GET'])
def get_themes():
    """获取所有主题"""
    themes = load_themes()
    return jsonify(themes)


@themes_bp.route('/current', methods=['PUT'])
def set_current_theme():
    """设置当前主题"""
    data = request.json
    theme_id = data.get('themeId')

    themes = load_themes()
    themes['current'] = theme_id
    save_themes(themes)

    return jsonify({'status': 'success'})


@themes_bp.route('/custom', methods=['POST'])
def save_custom_theme():
    """保存自定义主题"""
    data = request.json

    themes = load_themes()
    themes['themes']['custom'] = {
        "name": "自定义",
        "primary": data.get('primary'),
        "secondary": data.get('secondary'),
        "accent": data.get('accent'),
        "background": data.get('background'),
        "text": data.get('text'),
        "cardBg": data.get('cardBg'),
        "navBg": f"linear-gradient(135deg, {data.get('primary')} 0%, {data.get('secondary')} 100%)"
    }
    save_themes(themes)

    return jsonify({'status': 'success'})
