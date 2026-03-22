#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
PTCG Manager 启动脚本
"""
import os
import sys

# 添加项目根目录到路径
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from backend.app import create_app
from config import HOST, PORT, DEBUG

if __name__ == '__main__':
    app = create_app()
    print(f"""
    ══════════════════════════════════════════
       PTCG Manager 启动成功!                   
    ══════════════════════════════════════════
       访问地址: http://{HOST}:{PORT}           
       按 Ctrl+C 停止服务                       
    ══════════════════════════════════════════
    """)
    app.run(host=HOST, port=PORT, debug=DEBUG)
