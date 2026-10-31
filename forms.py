from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, IntegerField, SelectField
from wtforms.validators import DataRequired, Email, Length, EqualTo

class LoginForm(FlaskForm):
    email = StringField('Correo Electrónico', validators=[DataRequired(), Email()])
    password = PasswordField('Contraseña', validators=[DataRequired()])
    submit = SubmitField('Iniciar Sesión')

class RegisterForm(FlaskForm):
    nombre = StringField('Nombre Completo', validators=[DataRequired(), Length(min=2, max=100)])
    email = StringField('Correo Electrónico', validators=[DataRequired(), Email()])
    password = PasswordField('Contraseña', validators=[DataRequired(), Length(min=6)])
    confirm_password = PasswordField('Confirmar Contraseña', validators=[DataRequired(), EqualTo('password', message='Las contraseñas no coinciden')])
    submit = SubmitField('Registrarse')

class CheckoutForm(FlaskForm):
    nombre_titular = StringField('Nombre en la tarjeta', validators=[DataRequired(), Length(min=3)])
    numero_tarjeta = StringField('Número de Tarjeta', validators=[DataRequired(), Length(min=13, max=19)])
    expiracion = StringField('Vencimiento (MM/AA)', validators=[DataRequired(), Length(min=5, max=5)])
    cvv = StringField('Código CVV', validators=[DataRequired(), Length(min=3, max=4)])
    cuotas = SelectField('Cuotas', choices=[('1', '1 Cuota sin interés'), ('3', '3 Cuotas sin interés'), ('6', '6 Cuotas sin interés'), ('12', '12 Cuotas')], validators=[DataRequired()])
    codigo_postal = StringField('Código Postal', validators=[DataRequired()])
    submit = SubmitField('Confirmar y Pagar')
