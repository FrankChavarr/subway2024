// Intentar reproducir el video automáticamente
document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('background-video');

    // Intentar reproducir el video cuando la página carga
    var playPromise = video.play();

    if (playPromise !== undefined) {
        playPromise.then(function () {
            // Reproducción automática exitosa
        }).catch(function (error) {
            // Fallo en la reproducción automática, intentar con un evento de interacción
            document.addEventListener('click', function () {
                video.play();
            });
        });
    }
});

// Toggle del menú de navegación en móvil
document.getElementById('nav-toggle').addEventListener('click', function () {
    document.getElementById('nav-menu').classList.toggle('active');
});
