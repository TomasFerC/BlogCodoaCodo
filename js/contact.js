var formulario = document.getElementById('formulario'),
  nombre = formulario.nombreUsuario,
  correo = formulario.emailUsuario,
  mensaje = formulario.mensajeUsuario;
let error = document.getElementById('error');
var radios = document.getElementsByName('operacion');
var checkboxes = document.getElementsByName('terminos');

function limpiarListaErrores() {
 // Elimino los errores para arrancar a controlar de nuevo
  while (error.firstChild) {
      error.removeChild(error.firstChild);
  }
}

function verificarRadio() {

  for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
          return;
      }
  }
    error.innerHTML += '<li> Por favor selecciona una opción </li>';
    error.style.display = 'block';;
}

function verificarCheckbox() {
  
  var checkboxesSeleccionados = [];
  for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
          checkboxesSeleccionados.push(checkboxes[i].value);
      }
  }
  if (checkboxesSeleccionados.length > 0) {
    return;
  } else {
    error.innerHTML += '<li> Por favor acepta los terminos </li>';
    error.style.display = 'block';;
  }
}

function validarNombres(e) {
  limpiarListaErrores();
  
  if (nombre.value == '' ) {
    error.innerHTML += '<li> Por favor ingresa el Nombre </li>';
    error.style.display = 'block';    
  }

  if ((correo.value == '' )) {
    error.innerHTML += '<li> Por favor ingresa el email </li>';
    error.style.display = 'block';
  }
  else{ 
    error.style.display = 'none';
  }
  
  if ((mensaje.value == '' )) {
    error.innerHTML += '<li> Por favor ingresa un mensaje </li>';
    error.style.display = 'block';
   }
  else{ 
        error.style.display = 'none';
   }
   verificarRadio();
   verificarCheckbox()
    
   // Evita que el formulario se envíe si la validación falla
    e.preventDefault();
  }


formulario.addEventListener('submit', validarNombres);
