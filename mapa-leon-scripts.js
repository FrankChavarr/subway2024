// Función para obtener la dirección IP pública del usuario
function obtenerIP(callback) {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const userId = data.ip; // Usar la dirección IP como userId
            callback(userId);
        })
        .catch(error => {
            console.error('Error al obtener la dirección IP:', error);
            const defaultUserId = 'user_default'; // Si no se puede obtener la IP, usar un ID por defecto
            callback(defaultUserId);
        });
}

// Inicializando el mapa con Leaflet
const map = L.map('map').setView([12.4278204,-86.882466], 14); // León, Nicaragua

// Cargar el mapa satelital desde Esri
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    attribution: '© Esri'
}).addTo(map);


// Array de estaciones con coordenadas, datos de Spotify y nueva información
const estaciones = [
    { 
        coordinates: [12.4337713, -86.8804978],
        song: 'Toda la noche', 
        spotify: 'https://open.spotify.com/embed/track/7i2E6TIxjhZWIl85c51748?utm_source=generator',
        historia: 'La estación "Toda la noche" está inspirada en las noches llenas de música y energía en León, donde la banda comenzó su trayectoria.',
        descarga: 'material/toda_la_noche.zip',  // Material de descarga relacionado
        regalo: 'SUBTERRANEOLOGO.png' // Imagen del regalo, como un sticker
    },
    { 
        coordinates: [12.434932697960473, -86.87882525748682], 
        song: 'Disco León', 
        spotify: 'https://open.spotify.com/embed/track/7omJXWfbKGJq5wrsIa6Pfs?utm_source=generator',
        historia: 'La estación "Disco León" toma su nombre del álbum que captura la esencia de la vida urbana y vibrante de la ciudad.',
        descarga: 'material/disco_leon.zip',
        regalo: 'SUBTERRANEOLOGO.png'
    },
    { 
        coordinates: [12.417260946802514, -86.89270147473856], 
        song: 'Amanecer', 
        spotify: 'https://open.spotify.com/embed/track/7i2E6TIxjhZWIl85c51748?utm_source=generator',
        historia: 'La estación "Amanecer" refleja los primeros rayos del sol sobre León, representando nuevos comienzos y esperanza.',
        descarga: 'material/amanecer.zip',
        regalo: 'SUBTERRANEOLOGO.png'
    },
    { 
        coordinates: [12.436746, -86.879559], 
        song: 'Funky Love', 
        spotify: 'https://open.spotify.com/embed/track/7i2E6TIxjhZWIl85c51748?utm_source=generator',
        historia: '"Funky Love" se inspira en los vibrantes ritmos y el espíritu alegre que se respira en las calles de León.',
        descarga: 'material/funky_love.zip',
        regalo: 'SUBTERRANEOLOGO.png'
    },
    { 
        coordinates: [12.433501506831302, -86.8955729992695], 
        song: 'El Vuelo', 
        spotify: 'https://open.spotify.com/embed/track/7i2E6TIxjhZWIl85c51748?utm_source=generator',
        historia: 'La estación "El Vuelo" representa la libertad y la expansión del espíritu, inspirada por las aves que cruzan el cielo de León.',
        descarga: 'material/el_vuelo.zip',
        regalo: 'SUBTERRANEOLOGO.png'
    },
    { 
        coordinates: [12.41776514306273, -86.86961393544814], 
        song: 'Lavanda', 
        spotify: 'https://open.spotify.com/embed/track/7i2E6TIxjhZWIl85c51748?utm_source=generator',
        historia: 'La estación "Lavanda" está dedicada a la tranquilidad y la frescura del campo nicaragüense.',
        descarga: 'material/lavanda.zip',
        regalo: 'SUBTERRANEOLOGO.png'
    },
    { 
        coordinates: [12.431925482787864, -86.87884519510295], 
        song: 'La Pega', 
        spotify: 'https://open.spotify.com/embed/track/7i2E6TIxjhZWIl85c51748?utm_source=generator',
        historia: '"La Pega" está inspirada en los sonidos locales, como el tradicional afilador de cuchillos que recorre las calles de León.',
        descarga: 'material/la_pega.zip',
        regalo: 'SUBTERRANEOLOGO.png'
    }
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

// Inicialización de IndexedDB
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
                callback([]); // Si no hay progreso guardado, devolver un array vacío
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

obtenerIP(function(userId) {
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
            guardarProgreso(userId, unlockedStations);
        }, function () {
            alert('No se pudo obtener la ubicación.');
        }, { enableHighAccuracy: true, maximumAge: 3000, timeout: 5000 });
    } else {
        alert('Tu navegador no soporta geolocalización.');
    }
});

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
