document.addEventListener('DOMContentLoaded', function () {

    const sidebarOn = document.getElementById('sidebar-on');
    const toggleBtn = document.querySelector('#sidebar-on .toggle-btn span');

    function toggleSidebar() {
        sidebarOn.classList.toggle('active');
        toggleMenuIcon(); // Llama a la función para cambiar el ícono del menú
    }

    function toggleMenuIcon() {
        if (sidebarOn.classList.contains('active')) {
            toggleBtn.innerHTML = '&#10006;'; // Cambia el icono a una cruz cuando el menú está expandido
        } else {
            toggleBtn.innerHTML = '&#9776;'; // Cambia el icono a la hamburguesa cuando el menú está contraído
        }
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleSidebar);
    }

    // Verifica si la pantalla es lo suficientemente grande para desactivar el menú desplegable
    const mediaQuery = window.matchMedia('(min-width: 1090px)');

    function handleScreenSizeChange(mediaQuery) {
        if (mediaQuery.matches) {
            // Si la pantalla es lo suficientemente grande y el menú está abierto, ciérralo
            if (sidebarOn.classList.contains('active')) {
                sidebarOn.classList.remove('active');
                toggleMenuIcon();
            }
        }
    }

    // Agrega un listener para detectar cambios en el tamaño de la pantalla
    mediaQuery.addEventListener('change', handleScreenSizeChange);

    // Ejecuta la función al cargar la página para verificar el tamaño de la pantalla inicialmente
    handleScreenSizeChange(mediaQuery);

    const loginButton = document.querySelector('.user-actions button:nth-child(1)');

    if (loginButton) {
        loginButton.addEventListener('click', function () {
            window.location.href = 'register.html'; // Redirige al hacer clic en "Iniciar sesión"
        });

    }
});

