"""
卡牌相关 API
"""
from flask import Blueprint, request, jsonify
import sqlite3
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from config import DATABASE_PATH
from backend.models import get_db

cards_bp = Blueprint('cards', __name__)


@cards_bp.route('', methods=['GET'])
def get_cards():
    """获取所有卡牌"""
    conn = get_db(DATABASE_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM cards ORDER BY created_at DESC')
    rows = cursor.fetchall()
    conn.close()

    cards = [dict(row) for row in rows]
    return jsonify(cards)


@cards_bp.route('/<int:card_id>', methods=['GET'])
def get_card(card_id):
    """获取单个卡牌"""
    conn = get_db(DATABASE_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM cards WHERE id = ?', (card_id,))
    row = cursor.fetchone()
    conn.close()

    if row:
        return jsonify(dict(row))
    return jsonify({'error': 'Card not found'}), 404


@cards_bp.route('', methods=['POST'])
def add_card():
    """添加卡牌"""
    data = request.json

    # 能量卡无环境
    env = data.get('environment')
    if data.get('cardType') == '能量':
        env = None

    conn = get_db(DATABASE_PATH)
    cursor = conn.cursor()
    cursor.execute('''
                   INSERT INTO cards (name, cardType, rarity, environment, loginDate, type, hp, weakness, stage, effect,
                                      energyType)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                   ''', (
                       data.get('name'),
                       data.get('cardType'),
                       data.get('rarity'),
                       env,
                       data.get('loginDate'),
                       data.get('type'),
                       data.get('hp'),
                       data.get('weakness'),
                       data.get('stage'),
                       data.get('effect'),
                       data.get('energyType')
                   ))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()

    return jsonify({'status': 'success', 'id': new_id}), 201


@cards_bp.route('/<int:card_id>', methods=['PUT'])
def update_card(card_id):
    """更新卡牌"""
    data = request.json

    env = data.get('environment')
    if data.get('cardType') == '能量':
        env = None

    conn = get_db(DATABASE_PATH)
    cursor = conn.cursor()
    cursor.execute('''
                   UPDATE cards
                   SET name=?,
                       cardType=?,
                       rarity=?,
                       environment=?,
                       loginDate=?,
                       type=?,
                       hp=?,
                       weakness=?,
                       stage=?,
                       effect=?,
                       energyType=?
                   WHERE id = ?
                   ''', (
                       data.get('name'),
                       data.get('cardType'),
                       data.get('rarity'),
                       env,
                       data.get('loginDate'),
                       data.get('type'),
                       data.get('hp'),
                       data.get('weakness'),
                       data.get('stage'),
                       data.get('effect'),
                       data.get('energyType'),
                       card_id
                   ))
    conn.commit()
    conn.close()

    return jsonify({'status': 'updated'})


@cards_bp.route('/<int:card_id>', methods=['DELETE'])
def delete_card(card_id):
    """删除卡牌"""
    conn = get_db(DATABASE_PATH)
    cursor = conn.cursor()
    cursor.execute('DELETE FROM cards WHERE id = ?', (card_id,))
    conn.commit()
    conn.close()

    return jsonify({'status': 'deleted'})


@cards_bp.route('/export', methods=['GET'])
def export_cards():
    """导出所有卡牌"""
    conn = get_db(DATABASE_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM cards')
    rows = cursor.fetchall()
    cards = [dict(row) for row in rows]
    conn.close()

    from flask import Response
    import json
    response = Response(
        json.dumps(cards, indent=2, ensure_ascii=False),
        status=200,
        mimetype='application/json'
    )
    response.headers["Content-Disposition"] = "attachment; filename=ptcg_backup.json"
    return response
