from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import mysql.connector
from werkzeug.utils import secure_filename
import os
import time

app = Flask(__name__)
app = Flask(__name__)
CORS(app)


class Catalogo:
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password
        )
        self.cursor = self.conn.cursor()
        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise err

        self.cursor.execute('''CREATE TABLE IF NOT EXISTS propiedades (
            id INT AUTO_INCREMENT PRIMARY KEY,
            tipo_operacion VARCHAR(255) NOT NULL,
            tipo_propiedad VARCHAR(255) NOT NULL,
            zona VARCHAR(255) NOT NULL,
            descripcion VARCHAR(255) NOT NULL,
            precio DECIMAL(10, 2) NOT NULL,
            imagen_url VARCHAR(255),
            dni_propietario INT(8))''')

        self.conn.commit()

        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)

    def listar_propiedades(self):
        self.cursor.execute("SELECT * FROM propiedades")
        propiedades = self.cursor.fetchall()
        return propiedades

    def consultar_propiedades(self, id):
        self.cursor.execute(f"SELECT * FROM propiedades WHERE id = {id}")
        return self.cursor.fetchone()

    def agregar_propiedades(self, tipo_operacion, tipo_propiedad, zona, descripcion, precio, imagen_url, dni_propietario):
        sql = "INSERT INTO propiedades (tipo_operacion, tipo_propiedad, zona, descripcion, precio, imagen_url, dni_propietario) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        valores = (tipo_operacion, tipo_propiedad, zona, descripcion, precio, imagen_url, dni_propietario)

        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.lastrowid

    def modificar_propiedades(self, id, nueva_tipo_operacion, nueva_tipo_propiedad, nueva_zona, nueva_descripcion, nuevo_precio, nueva_imagen_url, nuevo_dni_propietario):
        sql = "UPDATE propiedades SET tipo_operacion = %s, tipo_propiedad = %s, zona = %s, descripcion = %s, precio = %s, imagen_url = %s, dni_propietario = %s WHERE id = %s"
        valores = (nueva_tipo_operacion, nueva_tipo_propiedad, nueva_zona, nueva_descripcion, nuevo_precio, nueva_imagen_url, nuevo_dni_propietario, id)

        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.rowcount > 0

    def eliminar_propiedades(self, id):
        self.cursor.execute(f"DELETE FROM propiedades WHERE id = {id}")
        self.conn.commit()
        return self.cursor.rowcount > 0

catalogo = Catalogo(host='tomasferc.mysql.pythonanywhere-services.com', user='tomasferc', password='***.', database='tomasferc$miapp')

ruta_destino = '/home/tomasferc/mysite/static/img'

@app.route("/propiedades", methods=["GET"])
def listar_propiedades():
    propiedades = catalogo.listar_propiedades()
    return jsonify(propiedades)

@app.route("/propiedades/<int:id>", methods=["GET"])
def mostrar_propiedades(id):
    propiedades = catalogo.consultar_propiedades(id)
    if propiedades:
        return jsonify(propiedades)
    else:
        return "Propiedad no encontrada", 404

@app.route('/propiedades', methods=['POST'])
def agregar_propiedad():
    try:
        tipo_operacion = request.form['tipo_operacion']
        tipo_propiedad = request.form['tipo_propiedad']
        zona = request.form['zona']
        descripcion = request.form['descripcion']
        precio = request.form['precio']
        imagen = request.files['imagen']
        dni_propietario = request.form['propetario']

        nombre_imagen = secure_filename(imagen.filename)
        nombre_base, extension = os.path.splitext(nombre_imagen)
        nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"

        nuevo_id = catalogo.agregar_propiedades(tipo_operacion, tipo_propiedad, zona, descripcion, precio, nombre_imagen, dni_propietario)

        if nuevo_id:
            imagen.save(os.path.join(ruta_destino, nombre_imagen))
            return jsonify({"mensaje": "Propiedad agregada correctamente.", "id": nuevo_id, "imagen": nombre_imagen}), 201
        else:
            return jsonify({"mensaje": "Error al agregar la propiedad."}), 500

    except Exception as e:
        return jsonify({"mensaje": "Error en el servidor al procesar la solicitud.", "error": str(e)}), 500

@app.route("/propiedades/<int:id>", methods=["PUT"])
def modificar_propiedades(id):
    nueva_tipo_operacion = request.form['tipo_operacion']
    nueva_tipo_propiedad = request.form['tipo_propiedad']
    nueva_zona = request.form['zona']
    nueva_descripcion = request.form['descripcion']
    nuevo_precio = request.form['precio']
    nuevo_dni_propietario = request.form['dni_propietario']

    if 'imagen' in request.files:
        imagen = request.files['imagen']
        nombre_imagen = secure_filename(imagen.filename)
        nombre_base, extension = os.path.splitext(nombre_imagen)
        nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"

        imagen.save(os.path.join(ruta_destino, nombre_imagen))

        propiedades = catalogo.consultar_propiedades(id)
        if propiedades:
            imagen_vieja = propiedades["imagen_url"]
            ruta_imagen = os.path.join(ruta_destino, imagen_vieja)

            if os.path.exists(ruta_imagen):
                os.remove(ruta_imagen)
    else:
        propiedades = catalogo.consultar_propiedades(id)
        if propiedades:
            nombre_imagen = propiedades["imagen_url"]

    if catalogo.modificar_propiedades(id, nueva_tipo_operacion, nueva_tipo_propiedad, nueva_zona, nueva_descripcion, nuevo_precio, nombre_imagen, nuevo_dni_propietario):
        return jsonify({"mensaje": "Propiedad modificada"}), 200
    else:
        return jsonify({"mensaje": "Propiedad no encontrada"}), 403

@app.route("/propiedades/<int:id>", methods=["DELETE"])
def eliminar_propiedades(id):
    propiedades = catalogo.consultar_propiedades(id)
    if propiedades and 'imagen_url' in propiedades and propiedades['imagen_url']:
        ruta_imagen = os.path.join(ruta_destino, propiedades['imagen_url'])
        if os.path.exists(ruta_imagen):
            os.remove(ruta_imagen)

        if catalogo.eliminar_propiedades(id):
            return jsonify({"mensaje": "Propiedad eliminada"}), 200
        else:
            return jsonify({"mensaje": "Error al eliminar la propiedad"}), 403
    else:
        return jsonify({"mensaje": "Propiedad no encontrada"}), 404


@app.route('/')
def index():
    return render_template('inicio.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/error')
def error():
    return render_template('error.html')

@app.route('/news')
def news():
    return render_template('news.html')

@app.route('/registro')
def registro():
    return render_template('registro.html')

@app.route('/crud')
def crud():
    return render_template('crud.html')

@app.route('/altas')
def altas():
    return render_template('altas.html')

@app.route('/modificar')
def modificar():
    return render_template('modificar.html')


@app.route('/listado')
def listado():
    return render_template('listado.html')

@app.route('/eliminar')
def eliminar():
    return render_template('listadoEliminar.html')

if __name__ == '__main__':
    app.run(debug=True)
