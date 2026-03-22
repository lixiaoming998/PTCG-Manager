"""
数据模型
"""
import sqlite3
import os


def get_db(db_path):
    """获取数据库连接"""
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn


def init_db(db_path):
    """初始化数据库"""
    if not os.path.exists(db_path):
        conn = get_db(db_path)
        cursor = conn.cursor()

        # 创建卡牌表
        cursor.execute('''
                       CREATE TABLE cards
                       (
                           id          INTEGER PRIMARY KEY AUTOINCREMENT,
                           name        TEXT NOT NULL,
                           cardType    TEXT NOT NULL,
                           rarity      TEXT,
                           environment TEXT,
                           loginDate   TEXT,
                           type        TEXT,
                           hp          INTEGER,
                           weakness    TEXT,
                           stage       TEXT,
                           effect      TEXT,
                           energyType  TEXT,
                           created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                       )
                       ''')

        conn.commit()
        conn.close()
        print("✅ 数据库初始化完成")
