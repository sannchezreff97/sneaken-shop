import os
from peewee import (
    Model, MySQLDatabase, SqliteDatabase, CharField, DecimalField,
    IntegerField, BooleanField, DateTimeField, ForeignKeyField
)
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

DB_NAME = os.getenv("DB_NAME", "sneaken_db")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "rootpassword")
DB_HOST = os.getenv("DB_HOST", "127.0.0.1")
DB_PORT = int(os.getenv("DB_PORT", 3306))

# Fallback to SQLite if MySQL service connection is not available for development testing
try:
    db = MySQLDatabase(
        DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT,
        charset='utf8mb4'
    )
except Exception:
    db = SqliteDatabase('sneaken_local.db')

class BaseModel(Model):
    class Meta:
        database = db

class Usuario(BaseModel):
    nombre = CharField(max_length=100)
    email = CharField(max_length=120, unique=True)
    password_hash = CharField(max_length=255)
    fecha_registro = DateTimeField(default=datetime.now)

class Categoria(BaseModel):
    nombre = CharField(max_length=50, unique=True)

class Producto(BaseModel):
    titulo = CharField(max_length=150)
    categoria = ForeignKeyField(Categoria, backref='productos')
    precio_ars = DecimalField(decimal_places=2, max_digits=10)
    cuotas_texto = CharField(max_length=100)
    imagen = CharField(max_length=255)
    es_liquidacion = BooleanField(default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'titulo': self.titulo,
            'categoria': self.categoria.nombre,
            'precio_ars': float(self.precio_ars),
            'cuotas_texto': self.cuotas_texto,
            'imagen': self.imagen,
            'es_liquidacion': self.es_liquidacion
        }

class Pedido(BaseModel):
    usuario = ForeignKeyField(Usuario, backref='pedidos', null=True)
    nombre_cliente = CharField(max_length=100)
    email_cliente = CharField(max_length=120)
    codigo_postal = CharField(max_length=10)
    provincia = CharField(max_length=100)
    total_ars = DecimalField(decimal_places=2, max_digits=10)
    metodo_pago = CharField(max_length=50)
    cuotas = IntegerField(default=1)
    fecha = DateTimeField(default=datetime.now)

class DetallePedido(BaseModel):
    pedido = ForeignKeyField(Pedido, backref='detalles', on_delete='CASCADE')
    producto = ForeignKeyField(Producto, backref='detalles_pedido')
    talle = IntegerField()
    cantidad = IntegerField()
    precio_unitario = DecimalField(decimal_places=2, max_digits=10)
