"""
Flask 应用主文件
"""
from flask import Flask, send_from_directory
from flask_cors import CORS
import os
import sys

# 添加项目根目录到路径
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from config import DATABASE_PATH, THEMES_PATH, DATA_DIR
from backend.models import init_db


def create_app():
    app = Flask(__name__,
                static_folder='../frontend',
                template_folder='../frontend')

    # 启用跨域
    CORS(app)

    # 确保数据目录存在
    os.makedirs(DATA_DIR, exist_ok=True)

    # 初始化数据库
    init_db(DATABASE_PATH)

    # 注册路由
    from backend.routes.cards import cards_bp
    from backend.routes.themes import themes_bp

    app.register_blueprint(cards_bp, url_prefix='/api/cards')
    app.register_blueprint(themes_bp, url_prefix='/api/themes')

    # 主页路由
    @app.route('/')
    def index():
        return send_from_directory('../test/frontend', 'index.html')

    # 静态文件路由
    @app.route('/<path:path>')
    def static_files(path):
        return send_from_directory('../test/frontend', path)

    return app

# 创建应用实例
app = create_app()

if __name__ == '__main__':
    app.run(host=HOST, port=PORT, debug=DEBUG)
