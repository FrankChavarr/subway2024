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
    { coordinates: [12.436149902732794, -86.8812666296772], song: 'Toda la noche', spotify: 'https://open.spotify.com/embed/track/7i2E6TIxjhZWIl85c51748?utm_source=generator' },
    { coordinates: [12.434932697960473, -86.87882525748682], song: 'Disco León', spotify: 'https://open.spotify.com/embed/track/7omJXWfbKGJq5wrsIa6Pfs?utm_source=generator' },
    { coordinates: [12.437522076719636, -86.87725260800912], song: 'Amanecer', spotify: 'https://open.spotify.com/embed/track/7i2E6TIxjhZWIl85c51748?utm_source=generator' },
    { coordinates: [12.366457960976588, -87.0308064679867], song: 'Funky Love', spotify: 'https://open.spotify.com/embed/track/7i2E6TIxjhZWIl85c51748?utm_source=generator' },
    { coordinates: [12.433501506831302, -86.8955729992695], song: 'El Vuelo', spotify: 'https://open.spotify.com/embed/track/7i2E6TIxjhZWIl85c51748?utm_source=generator' },
    { coordinates: [12.41776514306273, -86.86961393544814], song: 'Lavanda', spotify: 'https://open.spotify.com/embed/track/7i2E6TIxjhZWIl85c51748?utm_source=generator' },
    { coordinates: [12.431925482787864, -86.87884519510295], song: 'La Pega', spotify: 'https://open.spotify.com/embed/track/7i2E6TIxjhZWIl85c51748?utm_source=generator' }
];

// Personalización del ícono del marcador (círculo rosado con sombra neón)
const unlockedMarker = L.divIcon({
    className: 'custom-marker',
    html: '<div class="station-marker"></div>'
});

// Personalización del ícono del marcador bloqueado
const lockedMarker = L.divIcon({
    className: 'custom-marker locked',
    html: '<div class="station-marker locked"></div>'
});

// Array para almacenar los marcadores de las estaciones
let stationMarkers = [];

// IndexedDB: Inicializar base de datos
const dbName = 'StationProgressDB';
const storeName = 'unlockedStations';

function initIndexedDB() {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = function (event) {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: 'id' });
        }
    };

    request.onerror = function (event) {
        console.error('Error al abrir IndexedDB:', event.target.errorCode);
    };

    request.onsuccess = function (event) {
        console.log('IndexedDB inicializado correctamente.');
    };
}

initIndexedDB();

// Guardar progreso en IndexedDB
function guardarProgreso(userId, unlockedStations) {
    const request = indexedDB.open(dbName);

    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        // Guardar o actualizar progreso
        const data = { id: userId, stations: unlockedStations };
        const putRequest = store.put(data);

        putRequest.onsuccess = function () {
            console.log('Progreso guardado localmente en IndexedDB:', unlockedStations);
        };

        putRequest.onerror = function (event) {
            console.error('Error al guardar progreso en IndexedDB:', event.target.errorCode);
        };
    };
}

// Cargar progreso desde IndexedDB
function cargarProgreso(userId, callback) {
    const request = indexedDB.open(dbName);

    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);

        const getRequest = store.get(userId);

        getRequest.onsuccess = function (event) {
            const result = event.target.result;
            if (result) {
                callback(result.stations);
            } else {
                callback([]);
            }
        };

        getRequest.onerror = function (event) {
            console.error('Error al cargar progreso desde IndexedDB:', event.target.errorCode);
        };
    };
}

// Añadir los marcadores al mapa solo una vez
estaciones.forEach(estacion => {
    const marker = L.marker(estacion.coordinates, { icon: lockedMarker }).addTo(map);
    marker.isLocked = true;  // Inicialmente, todos los marcadores están bloqueados

    // Agregar evento de clic al marcador
    marker.on('click', function () {
        if (!marker.isLocked) {
            document.getElementById('song-title').innerText = estacion.song;
            document.getElementById('spotify-embed-container').innerHTML = `<iframe style="border-radius:12px; width: 100%; height: 352px;" src="${estacion.spotify}" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
            document.querySelector('.song-details').classList.remove('hidden');
        } else {
            alert(`Estación ${estacion.song} está bloqueada. Acércate más para desbloquearla.`);
        }
    });

    // Guardar el marcador en el array para su posterior actualización
    stationMarkers.push(marker);
});

// Cerrar el pop-up
document.querySelector('.btn-close').addEventListener('click', function () {
    document.querySelector('.song-details').classList.add('hidden');
    document.getElementById('spotify-embed-container').innerHTML = '';
});

// Función para verificar proximidad y actualizar marcadores
const proximityRadius = 50;

function checkProximity(userLat, userLng) {
    stationMarkers.forEach((marker, index) => {
        const estacion = estaciones[index];
        const distance = map.distance([userLat, userLng], estacion.coordinates);

        // Actualizar el estado de bloqueo/desbloqueo y el ícono del marcador
        if (distance <= proximityRadius) {
            if (marker.isLocked) {
                marker.setIcon(unlockedMarker);
                marker.isLocked = false;
            }
        } else {
            if (!marker.isLocked) {
                marker.setIcon(lockedMarker);
                marker.isLocked = true;
            }
        }
    });
}

// Obtener la ubicación en tiempo real del usuario y agregar un marcador
let userMarker;
let firstUpdate = true;

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function (position) {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        if (userMarker) {
            userMarker.setLatLng([userLat, userLng]); // Actualiza la ubicación del marcador sin crear uno nuevo
        } else {
            userMarker = L.marker([userLat, userLng]).addTo(map); // Crea el marcador en la primera ubicación
        }

        // Centrar el mapa con un pequeño delay para asegurar una experiencia más fluida
        if (firstUpdate || map.distance(userMarker.getLatLng(), [userLat, userLng]) > 50) {
            map.setView([userLat, userLng], 13, { animate: true });
            firstUpdate = false;
        }

        // Verificar la proximidad del usuario a las estaciones
        checkProximity(userLat, userLng);

        // Aquí se puede comprobar qué estaciones han sido desbloqueadas y guardarlas
        const unlockedStations = stationMarkers.filter(marker => !marker.isLocked).map(marker => estaciones[stationMarkers.indexOf(marker)].song);

        // Guardar el progreso en IndexedDB
        const userId = 'user_default'; // ID fijo para esta implementación
        guardarProgreso(userId, unlockedStations);
    }, function () {
        alert('No se pudo obtener la ubicación.');
    }, { enableHighAccuracy: true, maximumAge: 3000, timeout: 5000 });
} else {
    alert('Tu navegador no soporta geolocalización.');
}

// Función para actualizar la barra de progreso
function actualizarProgresoBarra() {
    // Calcula el porcentaje de progreso basado en las estaciones desbloqueadas
    const totalEstaciones = estaciones.length;
    const estacionesDesbloqueadas = stationMarkers.filter(marker => !marker.isLocked).length;
    const progreso = (estacionesDesbloqueadas / totalEstaciones) * 100;

    // Actualizar la barra de progreso con el nuevo valor
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = progreso + '%'; // Establece el ancho de la barra
}

// Llamar a la función para actualizar la barra después de comprobar la proximidad
function checkProximity(userLat, userLng) {
    stationMarkers.forEach((marker, index) => {
        const estacion = estaciones[index];
        const distance = map.distance([userLat, userLng], estacion.coordinates);

        // Actualizar el estado de bloqueo/desbloqueo y el ícono del marcador
        if (distance <= proximityRadius) {
            if (marker.isLocked) {
                marker.setIcon(unlockedMarker);
                marker.isLocked = false;
            }
        } else {
            if (!marker.isLocked) {
                marker.setIcon(lockedMarker);
                marker.isLocked = true;
            }
        }
    });

    // Después de comprobar la proximidad, actualizamos la barra de progreso
    actualizarProgresoBarra();
}
