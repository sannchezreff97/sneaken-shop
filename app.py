import os
from flask import Flask
from flask_wtf.csrf import CSRFProtect
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'sneaken-super-secret-key-change-in-production-2026')

# Medidas de Seguridad Requeridas (PPI 2026)
# 1. Protección CSRF
csrf = CSRFProtect(app)

# 2. Protección contra Fuerza Bruta (Flask-Limiter)
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://"
)

# 3. Cabeceras de Seguridad: XSS (CSP) y Clickjacking (X-Frame-Options)
@app.after_request
def set_security_headers(response):
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['Content-Security-Policy'] = "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: http: data: blob:;"
    return response

# Registro de Rutas
from routes import register_routes
register_routes(app)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

