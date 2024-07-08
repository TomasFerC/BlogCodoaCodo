// URL base para las solicitudes
const URL = "https://tomasferc.mysql.pythonanywhere-services.com/";

// Función para obtener la lista de propiedades desde el servidor
function obtenerPropiedades() {
    fetch(URL + 'propiedades')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al obtener las propiedades.');
            }
        })
        .then(data => {
            const propiedadesTable = document.getElementById('propiedades-table').getElementsByTagName('tbody')[0];
            propiedadesTable.innerHTML = ''; // Limpiar la tabla antes de insertar nuevos datos
            data.forEach(propiedad => {
                const row = propiedadesTable.insertRow();
                row.innerHTML = `
                    <td>${propiedad.id}</td>
                    <td>${propiedad.tipo_operacion}</td>
                    <td>${propiedad.tipo_propiedad}</td>
                    <td>${propiedad.zona}</td>
                    <td>${propiedad.descripcion}</td>
                    <td>${propiedad.precio}</td>
                    <td>${propiedad.dni_propietario}</td>
                    <td><button onclick="eliminarPropiedad(${propiedad.id})">Eliminar</button></td>
                `;
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al obtener las propiedades.');
        });
}

// Función para eliminar una propiedad
function eliminarPropiedad(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) {
        fetch(URL + `propiedades/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    obtenerPropiedades(); // Actualizar la lista después de eliminar
                    alert('Propiedad eliminada correctamente.');
                } else {
                    throw new Error('Error al eliminar la propiedad.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al eliminar la propiedad.');
            });
    }
}

// Cargar las propiedades al cargar la página
document.addEventListener('DOMContentLoaded', obtenerPropiedades);
