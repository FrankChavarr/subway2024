from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

def init_db():
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS user_progress (
            id TEXT PRIMARY KEY,
            latitude REAL,
            longitude REAL,
            song TEXT,
            spotify TEXT
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/')
def index():
    return "Welcome to the Progress Tracker!"

@app.route('/api/stations', methods=['GET'])
def get_stations():
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute('SELECT latitude, longitude, song, spotify FROM user_progress')
    rows = c.fetchall()
    conn.close()
    
    stations = [{'latitude': row[0], 'longitude': row[1], 'song': row[2], 'spotify': row[3]} for row in rows]
    return jsonify(stations), 200

@app.route('/update_progress', methods=['POST'])
def update_progress():
    data = request.json
    user_id = data['id']
    latitude = data['latitude']
    longitude = data['longitude']
    song = data['song']
    spotify = data['spotify']
    
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute('INSERT OR REPLACE INTO user_progress (id, latitude, longitude, song, spotify) VALUES (?, ?, ?, ?, ?)', (user_id, latitude, longitude, song, spotify))
    conn.commit()
    conn.close()
    
    return jsonify({'status': 'success'}), 200

@app.route('/get_progress/<user_id>', methods=['GET'])
def get_progress(user_id):
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute('SELECT latitude, longitude, song, spotify FROM user_progress WHERE id = ?', (user_id,))
    row = c.fetchone()
    conn.close()
    
    if row:
        return jsonify({'latitude': row[0], 'longitude': row[1], 'song': row[2], 'spotify': row[3]}), 200
    else:
        return jsonify({'error': 'User not found'}), 404

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
