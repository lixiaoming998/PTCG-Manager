"""
PTCG Manager 配置文件
"""
import os

# 基础路径
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
BACKUP_DIR = os.path.join(DATA_DIR, 'backups')

# 数据库配置
DATABASE_PATH = os.path.join(DATA_DIR, 'ptcg.db')
THEMES_PATH = os.path.join(DATA_DIR, 'themes.json')

# 应用配置
SECRET_KEY = 'ptcg-manager-secret-key-2024'
DEBUG = True
HOST = '0.0.0.0'
PORT = 5000

# 宝可梦配置
POKEMON_TYPES = ['草', '火', '水', '雷', '超', '斗', '恶', '钢', '龙', '无']
CARD_TYPES = ['宝可梦', '支援者', '道具', '能量']
RARITIES = ['C', 'U', 'R', 'RR', 'SR', 'SAR', 'UR', 'HR', 'CSR', 'PR', '其他']
STAGES = ['基础', '1阶进化', '2阶进化', 'V进化', 'VMAX', 'VSTAR']
ENVIRONMENTS = ['F', 'G', 'H', 'I']
