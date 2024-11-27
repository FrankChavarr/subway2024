import sqlite3

def init_db():
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    
    # Elimina la tabla si ya existe (solo para propósitos de prueba)
    c.execute('DROP TABLE IF EXISTS user_progress')
    
    # Crear la tabla con las columnas correctas
    c.execute('''
        CREATE TABLE user_progress (
            id TEXT PRIMARY KEY,
            latitude REAL,
            longitude REAL,
            song TEXT,
            spotify TEXT
        )
    ''')
    
    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
    print("Base de datos y tabla inicializadas.")
