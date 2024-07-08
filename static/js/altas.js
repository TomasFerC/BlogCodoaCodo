// URL base para las solicitudes
const URL = "https://tomasferc.mysql.pythonanywhere-services.com/";
// Si se sube a un servidor, usar la URL correspondiente
// const URL = "https://USUARIO.pythonanywhere.com/";

// Capturamos el evento de envío del formulario
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('formulario').addEventListener('submit', function (event) {
        event.preventDefault(); // Evitamos que se envíe el formulario

        var formData = new FormData(this);

        // Realizamos la solicitud POST al servidor
        fetch(URL + 'propiedades', {
            method: 'POST',
            body: formData // Enviamos formData que puede contener archivos
        })
            .then(function (response) {
                if (response.ok) {
                    // Si la respuesta es exitosa, convertimos los datos a JSON
                    return response.json();
                } else {
                    // Si hubo un error, lanzamos una excepción para manejarla más adelante
                    throw new Error('Error al agregar el producto.');
                }
            })
            .then(function (data) {
                // Mostramos una alerta de éxito y limpiamos el formulario
                alert('Producto agregado correctamente.');
            })
            .catch(function (error) {
                // Mostramos una alerta en caso de error
                alert('Error al agregar el producto.');
            })
            .finally(function () {
                // Limpiar los campos del formulario
                formulario.reset();
            });
    });
});
