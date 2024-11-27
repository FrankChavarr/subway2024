// Datos de cada canción y sus detalles
const songDetails = {
    "Toda la noche": {
        description: "Primer sencillo del álbum, esta estación te lleva a una fiesta interminable bajo las luces de la ciudad.",
        link: "#"
    },
    "Disco León": {
        description: "La estación principal del subterráneo imaginario, donde el funk y el disco se encuentran.",
        link: "#"
    },
    "Amanecer": {
        description: "El comienzo de un nuevo día, con melodías suaves y ritmos vibrantes.",
        link: "#"
    },
    "Funky Love": {
        description: "Una parada llena de groove y romance, perfecta para los amantes de la buena música.",
        link: "#"
    },
    "Lavanda": {
        description: "Una estación perfumada y melódica, que te envuelve con su suavidad y encanto.",
        link: "#"
    },
    "El Vuelo": {
        description: "El cierre perfecto de este viaje, como un tren que despega hacia nuevos horizontes.",
        link: "#"
    }
};

// Función para mostrar detalles de la canción
document.querySelectorAll('.station').forEach(station => {
    station.addEventListener('click', () => {
        const song = station.getAttribute('data-song');
        document.getElementById('song-title').textContent = song;
        document.getElementById('song-description').textContent = songDetails[song].description;
        document.getElementById('song-link').setAttribute('href', songDetails[song].link);
        document.querySelector('.song-details').classList.remove('hidden');
    });
});

// Función para cerrar los detalles
document.querySelector('.btn-close').addEventListener('click', () => {
    document.querySelector('.song-details').classList.add('hidden');
});
// Toggle del menú de navegación en móvil
document.getElementById('nav-toggle').addEventListener('click', function () {
    document.getElementById('nav-menu').classList.toggle('active');
});
