// Toggle del menú de navegación en móvil
document.getElementById('nav-toggle').addEventListener('click', function () {
    document.getElementById('nav-menu').classList.toggle('active');
});

// Inicializando el mapa con Leaflet
const map = L.map('map').setView([12.4378, -86.8780], 13); // León, Nicaragua

// Cargar el mapa satelital desde Esri
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    attribution: '© Esri'
}).addTo(map);

// Array de estaciones con coordenadas y datos de Spotify
const estaciones = [
    { 
        coordinates: [12.436149902732794, -86.8812666296772], 
        song: 'Toda la noche', 
        spotify: 'https://open.spotify.com/embed/track/7i2E6TIxjhZWIl85c51748?utm_source=generator' 
    },
    { 
        coordinates: [12.434932697960473, -86.87882525748682], 
        song: 'Disco León', 
        spotify: 'https://open.spotify.com/embed/track/7i2E6TIxjhZWIl85c51748?utm_source=generator' 
    },
    { 
        coordinates: [12.437522076719636, -86.87725260800912], 
        song: 'Amanecer', 
        spotify: 'https://open.spotify.com/embed/track/7i2E6TIxjhZWIl85c51748?utm_source=generator' 
    },
    { 
        coordinates: [12.366457960976588, -87.0308064679867], 
        song: 'Funky Love', 
        spotify: 'https://open.spotify.com/embed/track/7i2E6TIxjhZWIl85c51748?utm_source=generator' 
    },
    { 
        coordinates: [12.433501506831302, -86.8955729992695], 
        song: 'El Vuelo', 
        spotify: 'https://open.spotify.com/embed/track/7i2E6TIxjhZWIl85c51748?utm_source=generator' 
    },
    { 
        coordinates: [12.41776514306273, -86.86961393544814], 
        song: 'Lavanda', 
        spotify: 'https://open.spotify.com/embed/track/7i2E6TIxjhZWIl85c51748?utm_source=generator' 
    },
    { 
        coordinates: [12.431925482787864, -86.87884519510295], 
        song: 'La Pega', 
        spotify: 'https://open.spotify.com/embed/track/7i2E6TIxjhZWIl85c51748?utm_source=generator' 
    }
];

// Personalización del ícono del marcador (círculo rosado con sombra neón)
const customMarker = L.divIcon({
    className: 'custom-marker',
    html: '<div class="station-marker"></div>' // Clase para aplicar estilos y animación
});

// Añadir los puntos al mapa con íconos personalizados
estaciones.forEach(estacion => {
    const marker = L.marker(estacion.coordinates, { icon: customMarker }).addTo(map);
    marker.on('click', function() {
        document.getElementById('song-title').innerText = estacion.song;
        document.getElementById('spotify-embed-container').innerHTML = `<iframe style="border-radius:12px; width: 100%; height: 352px;" src="${estacion.spotify}" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
        document.querySelector('.song-details').classList.remove('hidden');
    });
});

// Cerrar el pop-up
document.querySelector('.btn-close').addEventListener('click', function () {
    document.querySelector('.song-details').classList.add('hidden');
    document.getElementById('spotify-embed-container').innerHTML = ''; // Limpia el iframe al cerrar
});

// Obtener la ubicación en tiempo real del usuario y agregar un marcador
let userMarker; // Variable global para el marcador del usuario

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function(position) {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        // Crear o mover el marcador de la ubicación del usuario
        if (userMarker) {
            userMarker.setLatLng([userLat, userLng]);
        } else {
            userMarker = L.marker([userLat, userLng]).addTo(map);
        }

        map.setView([userLat, userLng], 13); // Mover la vista al usuario
    }, function() {
        alert('No se pudo obtener la ubicación.');
    });
} else {
    alert('Tu navegador no soporta geolocalización.');
}
