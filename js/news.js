/* Filtrado enter noticias y notas */
function filterNews(filter) {
    const newsItems = document.querySelectorAll('.maingrid-box, .maingrid-box2');
    newsItems.forEach(item => {
        if ((filter === 'noticias' && item.classList.contains('noticias')) ||
            (filter === 'autor' && item.classList.contains('autor'))) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    console.log('Filtered by:', filter);
}

/* Restable la pagina */
function resetPage() {
    window.location.reload();
}

function goToHomePage() {
    const button = document.querySelector('.animated-button'); // Selecciona el botón
    button.classList.add('button-click-animation'); // Agrega la clase para la animación

    setTimeout(() => {
        window.location.href = 'index.html'; // Redirige después de un breve retraso
    }, 300); // Espera 300 milisegundos (0.3 segundos) antes de redirigir
}