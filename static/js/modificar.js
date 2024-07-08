document.addEventListener('DOMContentLoaded', function () {
    const URL = "https://tomasferc.pythonanywhere.com/";

    // Variables de estado para controlar los datos del formulario y la visibilidad
    let id = '';
    let tipo_operacion = '';
    let tipo_propiedad = '';
    let zona = '';
    let descripcion = '';
    let precio = '';
    let dni_propietario = '';
    let imagen_url = '';
    let imagenSeleccionada = null;
    let imagenUrlTemp = null;
    let mostrarDatosPropiedad = false;

    // Event listener para el formulario de obtener propiedad
    document.getElementById('form-obtener-propiedad').addEventListener('submit', function (event) {
        event.preventDefault();
        const codigo = document.getElementById('id').value;

        fetch(URL + 'propiedades/' + codigo)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al obtener los datos de la propiedad.');
                }
            })
            .then(data => {
                // Asignar datos obtenidos a variables de estado
                id = data.id;
                tipo_operacion = data.tipo_operacion;
                tipo_propiedad = data.tipo_propiedad;
                zona = data.zona;
                descripcion = data.descripcion;
                precio = data.precio;
                dni_propietario = data.dni_propietario;
                imagen_url = data.imagen_url;
                mostrarDatosPropiedad = true; // Activa la vista del segundo formulario
                mostrarFormulario();
            })
            .catch(error => {
                alert('ID no encontrado.');
            });
    });

    // Mostrar el formulario con los datos de la propiedad
    function mostrarFormulario() {
        if (mostrarDatosPropiedad) {
            document.getElementById('operacionModificar').value = tipo_operacion;
            document.getElementById('propiedadModificar').value = tipo_propiedad;
            document.getElementById('zonaModificar').value = zona;
            document.getElementById('descripcionModificar').value = descripcion;
            document.getElementById('precioModificar').value = precio;
            document.getElementById('dniPropietarioModificar').value = dni_propietario;

            const imagenActual = document.getElementById('imagen-actual');
            if (imagen_url && !imagenSeleccionada) { // Verificar si hay una URL de imagen y no se ha seleccionado una nueva imagen
                imagenActual.src = 'https://www.pythonanywhere.com/user/tomasferc/files/home/tomasferc/mysite/static/img/' + imagen_url;
                imagenActual.style.display = 'block'; // Mostrar la imagen actual
            } else {
                imagenActual.style.display = 'none'; // Ocultar la imagen si no hay URL
            }

            document.getElementById('datos-propiedad').style.display = 'block'; // Mostrar el formulario con los datos
        } else {
            document.getElementById('datos-propiedad').style.display = 'none'; // Ocultar el formulario si no hay datos
        }
    }

    // Event listener para la selección de imagen
    document.getElementById('nuevaImagen').addEventListener('change', function (event) {
        const file = event.target.files[0];
        imagenSeleccionada = file;
        imagenUrlTemp = URL.createObjectURL(file); // Crear URL temporal para vista previa

        const imagenVistaPrevia = document.getElementById('imagen-vista-previa');
        imagenVistaPrevia.src = imagenUrlTemp;
        imagenVistaPrevia.style.display = 'block'; // Mostrar vista previa de la imagen seleccionada
    });

    // Event listener para guardar cambios
    document.getElementById('form-guardar-cambios').addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('id', id);
        formData.append('tipo_operacion', document.getElementById('operacionModificar').value);
        formData.append('tipo_propiedad', document.getElementById('propiedadModificar').value);
        formData.append('zona', document.getElementById('zonaModificar').value);
        formData.append('descripcion', document.getElementById('descripcionModificar').value);
        formData.append('precio', document.getElementById('precioModificar').value);
        formData.append('dni_propietario', document.getElementById('dniPropietarioModificar').value);

        // Si se seleccionó una nueva imagen, agregarla al formData
        if (imagenSeleccionada) {
            formData.append('imagen', imagenSeleccionada, imagenSeleccionada.name);
        }

        fetch(URL + 'propiedades/' + id, {
            method: 'PUT',
            body: formData,
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al guardar los cambios de la propiedad.');
                }
            })
            .then(data => {
                alert('Propiedad actualizada correctamente.');
                limpiarFormulario();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al actualizar la propiedad.');
            });
    });

    // Limpiar formulario y restablecer variables de estado
    function limpiarFormulario() {
        document.getElementById('id').value = '';
        document.getElementById('operacionModificar').value = '';
        document.getElementById('propiedadModificar').value = '';
        document.getElementById('zonaModificar').value = '';
        document.getElementById('descripcionModificar').value = '';
        document.getElementById('precioModificar').value = '';
        document.getElementById('dniPropietarioModificar').value = '';
        document.getElementById('nuevaImagen').value = '';

        const imagenActual = document.getElementById('imagen-actual');
        imagenActual.style.display = 'none';

        const imagenVistaPrevia = document.getElementById('imagen-vista-previa');
        imagenVistaPrevia.style.display = 'none';

        id = '';
        tipo_operacion = '';
        tipo_propiedad = '';
        zona = '';
        descripcion = '';
        precio = '';
        dni_propietario = '';
        imagen_url = '';
        imagenSeleccionada = null;
        imagenUrlTemp = null;
        mostrarDatosPropiedad = false;

        document.getElementById('datos-propiedad').style.display = 'none';
    }
});
