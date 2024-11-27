// Añadir funcionalidad a la galería y el formulario de suscripción

// Evento para la suscripción al newsletter
document.getElementById('newsletter-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('¡Gracias por suscribirte a nuestro newsletter!');
    this.reset();
});
// Toggle del menú de navegación en móvil
document.getElementById('nav-toggle').addEventListener('click', function () {
    document.getElementById('nav-menu').classList.toggle('active');
});
