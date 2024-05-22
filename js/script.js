document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector("header")
    const footer = document.querySelector("footer")


    header.innerHTML = `
<div>
<!-- Contenido del encabezado -->
<div id="sidebar-off">
    <div class="logo">
        <img src="/img/31196549_7680244.png" alt="Logo CoDo Prop">
    </div>
    <nav class="main-navigation">
        <ul>
            <li><a href="./index.html">Inicio</a></li>
            <li><a href="./news.html">Noticias</a></li>
            <li><a href="./contact.html">Contacto</a></li>
        </ul>
    </nav>
    <div class="user-actions">
        <button>Iniciar sesión</button>
        
    </div>
</div>
<div id="sidebar-on">
    <div class="toggle-btn">
        <span>&#9776;</span>
    </div>
    <ul>
        <li><img src="/img/31196549_7680244.png" alt="Logo CoDo Prop" class="logo"></li>
        <li><a href="./index.html">Inicio</a></li>
        <li><a href="./news.html">Noticias</a></li>
        <li><a href="./contact.html">Contacto</a></li>
        <li><a href="./register.html">Iniciar sesión</a></li>
        
    </ul>
</div>
`;

    footer.innerHTML = `
<div class="footer-content">
<p>&copy; 2023 CoDo Prop - Todos los derechos reservados.</p>
<div class="social-media-links">
    <a href="https://facebook.com" target="_blank"><i class="fab fa-facebook-f"></i></a>
    <a href="https://instagram.com" target="_blank"><i class="fab fa-instagram"></i></a>
    <a href="https://twitter.com" target="_blank"><i class="fab fa-twitter"></i></a>
</div>
</div>
`;

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