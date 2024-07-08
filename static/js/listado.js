const BASE_URL = "https://tomasferc.pythonanywhere.com/";
// Cuando subas a PythonAnywhere, cambia a la siguiente línea:
// const BASE_URL = "https://USUARIO.pythonanywhere.com/";

// Realizamos la solicitud GET al servidor para obtener todos los productos.
fetch(BASE_URL + 'propiedades')
    .then(function (response) {
        if (response.ok) {
            // Si la respuesta es exitosa, convertimos el cuerpo de la respuesta a JSON
            return response.json();
        } else {
            // Si hubo un error, lanzamos una excepción para manejarla en el siguiente catch
            throw new Error('Error al obtener las propiedades.');
        }
    })
    .then(function (data) {
        let tablaPropiedades = document.getElementById('tablaPropiedades'); // Seleccionamos el elemento donde se mostrarán los productos

        // Iteramos sobre cada producto y creamos filas en la tabla
        for (let propiedad of data) {
            let fila = document.createElement('tr'); // Creamos una nueva fila de tabla (<tr>) para cada producto

            // Construimos el contenido de la fila con los datos del producto
            fila.innerHTML = '<td>' + propiedad.id + '</td>' +
                '<td>' + propiedad.tipo_operacion + '</td>' +
                '<td>' + propiedad.tipo_propiedad + '</td>' +
                '<td>' + propiedad.zona + '</td>' +
                '<td>' + propiedad.descripcion + '</td>' +
                '<td>' + propiedad.precio + '</td>' +
                '<td>' + propiedad.dni_propietario + '</td>' +
                // Cambiamos la URL de la imagen dependiendo del entorno
                '<td><img src=https://www.pythonanywhere.com/user/tomasferc/files/home/tomasferc/mysite/static/img/' + propiedad.imagen_url +' alt="Imagen del producto" style="width: 100px;"></td>' + '<td align="right">'
+ '</td>';

                tablaPropiedades.appendChild(fila); // Agregamos la fila a la tabla
        }
    })
    .catch(function (error) {
        // Capturamos y manejamos errores, mostrando una alerta en caso de error al obtener los productos
        console.error('Error al obtener las propiedades:', error);
        alert('Error al obtener las propiedades.');
    });