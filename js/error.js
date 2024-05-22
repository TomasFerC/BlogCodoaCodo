let visible = true;
setInterval(() => {
    const container = document.getElementById('blinkContainer');
    container.style.opacity = visible ? '0.5' : '1';
    visible = !visible;
}, 1000); // Cambia la opacidad cada segundo