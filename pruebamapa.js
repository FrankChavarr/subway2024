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
        spotify: 'https://open.spotify.com/embed/track/7omJXWfbKGJq5wrsIa6Pfs?utm_source=generator' 
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
const unlockedMarker = L.divIcon({
    className: 'custom-marker',
    html: '<div class="station-marker"></div>' // Clase para aplicar estilos y animación
});

// Personalización del ícono del marcador bloqueado
const lockedMarker = L.divIcon({
    className: 'custom-marker',
    html: '<div class="station-marker locked"></div>' // Clase para aplicar estilos y animación
});

// Añadir los puntos al mapa con íconos personalizados
estaciones.forEach(estacion => {
    const marker = L.marker(estacion.coordinates, { icon: lockedMarker }).addTo(map); // Usar solo el ícono bloqueado
    marker.on('click', function() {
        if (!marker.isLocked) {
            document.getElementById('song-title').innerText = estacion.song;
            document.getElementById('spotify-embed-container').innerHTML = `<iframe style="border-radius:12px; width: 100%; height: 352px;" src="${estacion.spotify}" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
            document.querySelector('.song-details').classList.remove('hidden');
        } else {
            alert(`Estación ${estacion.song} está bloqueada. Acércate más para desbloquearla.`);
        }
    });
    
    // Marcar que inicialmente está bloqueado
    marker.isLocked = true;

    // Agregar el marcador al mapa
    marker.addTo(map);
});

// Cerrar el pop-up
document.querySelector('.btn-close').addEventListener('click', function () {
    document.querySelector('.song-details').classList.add('hidden');
    document.getElementById('spotify-embed-container').innerHTML = ''; // Limpia el iframe al cerrar
});

// --- FUNCIONALIDAD 1: BLOQUEAR ESTACIONES POR PROXIMIDAD ---
const proximityRadius = 100;

function checkProximity(userLat, userLng) {
    estaciones.forEach((estacion, index) => {
        const distance = map.distance([userLat, userLng], estacion.coordinates);
        
        if (distance <= proximityRadius) {
            const marker = L.marker(estacion.coordinates, { icon: unlockedMarker }).addTo(map);
            marker.isLocked = false; // Desbloquear la estación
            marker.on('click', function() {
                document.getElementById('song-title').innerText = estacion.song;
                document.getElementById('spotify-embed-container').innerHTML = `<iframe style="border-radius:12px; width: 100%; height: 352px;" src="${estacion.spotify}" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
                document.querySelector('.song-details').classList.remove('hidden');
            });
        } else {
            // Si la estación está bloqueada y el usuario está cerca, mostrar un mensaje
            const marker = L.marker(estacion.coordinates, { icon: lockedMarker }).addTo(map);
            marker.on('click', function() {
                alert(`Estación ${estacion.song} está bloqueada. Acércate más para desbloquearla.`);
            });
        }
    });
}

// --- FUNCIONALIDAD 2: GENERAR ID ÚNICO POR IP ---
function generateUniqueId(ip) {
    const hash = ip.split('').reduce((hash, char) => {
        return hash + char.charCodeAt(0);
    }, 0);
    return `user_${hash}`;
}

// Obtener la ubicación en tiempo real del usuario y agregar un marcador
let userMarker;

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function(position) {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        if (userMarker) {
            userMarker.setLatLng([userLat, userLng]);
        } else {
            userMarker = L.marker([userLat, userLng]).addTo(map);
        }

        map.setView([userLat, userLng], 13);
        
        checkProximity(userLat, userLng);
        
    }, function() {
        alert('No se pudo obtener la ubicación.');
    });
} else {
    alert('Tu navegador no soporta geolocalización.');
}
