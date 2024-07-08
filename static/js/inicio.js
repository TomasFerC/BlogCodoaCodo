// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Selecciona todas las propiedades
  var properties = document.querySelectorAll(".property-item");

  // Itera sobre cada propiedad para el carrusel de imágenes
  properties.forEach(property => {
      var slides = property.querySelectorAll(".slide");
      var dots = property.querySelectorAll(".dot");
      var index = 0;

      function prevSlide(n) {
          index += n;
          changeSlide();
      }

      function nextSlide(n) {
          index += n;
          changeSlide();
      }

      function changeSlide() {
          if (index > slides.length - 1) {
              index = 0;
          }

          if (index < 0) {
              index = slides.length - 1;
          }

          for (let i = 0; i < slides.length; i++) {
              slides[i].style.display = "none";
              dots[i].classList.remove("active");
          }

          slides[index].style.display = "block";
          dots[index].classList.add("active");
      }

      // Llama a la función changeSlide para mostrar la primera imagen
      changeSlide();

      // Agrega event listeners para los controles de flecha
      property.querySelector("#left-arrow").addEventListener("click", (event) => {
          event.preventDefault(); // Evita el comportamiento predeterminado del enlace
          prevSlide(-1);
      });

      property.querySelector("#right-arrow").addEventListener("click", (event) => {
          event.preventDefault(); // Evita el comportamiento predeterminado del enlace
          nextSlide(1);
      });
  });

  // Función para mostrar/ocultar el menú de filtros
  const filterHeader = document.querySelector('.filter-header');
  const toggleArrow = document.querySelector('.toggle-arrow');
  const filterMenu = document.querySelector('.filtros');

  function toggleFilterMenu() {
      filterMenu.classList.toggle('active');
      toggleArrowIcon(); // Llama a la función para cambiar el ícono de la flecha
  }

  function toggleArrowIcon() {
      // Cambia dinámicamente el contenido del span de la flecha entre ▼ y ▲
      if (toggleArrow.textContent === '▼') {
          toggleArrow.textContent = '▲'; // Cambia a flecha hacia arriba si estaba hacia abajo
      } else {
          toggleArrow.textContent = '▼'; // Cambia a flecha hacia abajo si estaba hacia arriba
      }
  }

  if (filterHeader && toggleArrow && filterMenu) {
      filterHeader.addEventListener('click', toggleFilterMenu);
  }

  // Verifica si la pantalla es lo suficientemente grande para cerrar el menú
  const mediaQuery = window.matchMedia('(min-width: 1090px)');

  function handleScreenSizeChange(mediaQuery) {
      if (mediaQuery.matches) {
          // Si la pantalla es lo suficientemente grande, y el menú está abierto, ciérralo
          if (filterMenu.classList.contains('active')) {
              filterMenu.classList.remove('active');
              toggleArrowIcon();
          }
      }
  }

  // Agrega un listener para detectar cambios en el tamaño de la pantalla
  mediaQuery.addListener(handleScreenSizeChange);

  // Ejecuta la función al cargar la página para verificar el tamaño de la pantalla inicialmente
  handleScreenSizeChange(mediaQuery);

  // Configuración para el formulario de filtros
  const form = document.querySelector('.filtros');

  form.addEventListener('submit', function(event) {
      event.preventDefault(); // Evita que el formulario se envíe automáticamente

      // Obtener los valores de los campos del formulario
      const busqueda = document.querySelector('input[name="busqueda"]').value;
      const tipoAccion = document.querySelector('#tipo_accion').value;
      const tipoPropiedad = document.querySelector('#tipo_propiedad').value;
      const zona = document.querySelector('#zona').value;
      const precioMinimo = document.querySelector('#precio_minimo').value;
      const precioMaximo = document.querySelector('#precio_maximo').value;

      // Realizar la solicitud AJAX usando Fetch
      fetch('/buscar', {
          method: 'POST',
          body: JSON.stringify({
              busqueda: busqueda,
              tipo_accion: tipoAccion,
              tipo_propiedad: tipoPropiedad,
              zona: zona,
              precio_minimo: precioMinimo,
              precio_maximo: precioMaximo
          }),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => response.json())
      .then(data => {
          // Manejar la respuesta del servidor, por ejemplo, actualizar la lista de propiedades mostradas
          console.log('Respuesta del servidor:', data);
          // Aquí podrías implementar la lógica para actualizar la lista de propiedades en tu página
      })
      .catch(error => {
          console.error('Error al enviar la solicitud:', error);
      });
  });
});
