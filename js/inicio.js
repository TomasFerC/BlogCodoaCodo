var properties = document.querySelectorAll(".property-item");

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

  // Llamar a la función changeSlide para mostrar la primera imagen
  changeSlide();

  // Agregar event listeners para los controles de flecha
  property.querySelector("#left-arrow").addEventListener("click", (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
    prevSlide(-1);
  });

  property.querySelector("#right-arrow").addEventListener("click", (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
    nextSlide(1);
  });
});

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



