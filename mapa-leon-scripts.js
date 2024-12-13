// Función para generar un ID único (usada como respaldo si no hay IP)
function generarUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

// Función para obtener el userId (intenta usar la IP, pero genera un UUID si falla)
function obtenerUserId(callback) {
    const userIdKey = 'userId';

    // Verificar si ya tenemos un ID guardado en localStorage
    let userId = localStorage.getItem(userIdKey);
    if (userId) {
        callback(userId); // Usar el ID ya existente
        return;
    }

    // Si no hay un ID en localStorage, intentamos obtener la IP
    fetch('https://api.ipify.org?format=json')
        .then((response) => response.json())
        .then((data) => {
            userId = data.ip; // Usar la IP como userId
            localStorage.setItem(userIdKey, userId); // Guardar en localStorage
            callback(userId);
        })
        .catch((error) => {
            console.error('Error al obtener la IP:', error);
            // Generar un UUID como respaldo
            userId = generarUUID();
            localStorage.setItem(userIdKey, userId); // Guardar en localStorage
            callback(userId);
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
var estaciones = [
    { 
        id: 'station4',
        estado:true,
        coordinates: [12.433747850816363, -86.88047674554787],
        song: 'Toda la noche', 
        spotify: 'https://open.spotify.com/embed/track/3Sjp5ZVLKzLqTi8ll8IEeP?utm_source=generator',
        historia: 'En este momento te encuentras en el majestuoso Teatro José de la Cruz Mena, un ícono cultural de León, Nicaragua, y un homenaje vivo al legado del célebre compositor que lleva su nombre. Inaugurado en 1905, este teatro se alza como un testigo de la rica historia artística de la ciudad. Con su arquitectura neoclásica y su elegante fachada, ha sido el escenario de innumerables presentaciones de ópera, teatro y música que han cautivado a generaciones. Cada rincón del teatro guarda ecos de aplausos y melodías que conectan el pasado con el presente, haciendo de este espacio una parada obligatoria para los amantes de la cultura y la historia.',
        letra: `
Toda la noche:

Entre las sombras de la ciudad, el ritmo late sin cesar
Bajo el resplandor neón, León enciende su canción
Luces que parpadean al compás del corazón
Música que resuena en la calle, nos invita a bailar

Coro:
Creciendo va creciendo
El amor nos va convirtiendo en algo más, ayayay
Toda la noche, toda la noche
Bailar con vos por toda la ciudad

Creciendo va creciendo
El amor nos va convirtiendo en algo más, ayayay
Toda la noche, toda la noche
Bailar con vos por toda la ciudad

El tiempo se detiene mientras el ritmo nos envuelve en su magia
En cada esquina una historia por contar, el susurro de la noche
La lluvia cae suavemente, inundamos el alma de la ciudad
Flota en el aire lentamente, invitándonos a bailar

Coro:
Creciendo va creciendo
El amor nos va convirtiendo en algo más, ayayay
Toda la noche, toda la noche
Bailar con vos por toda la ciudad

Creciendo va creciendo
El amor nos va convirtiendo en algo más, ayayay
Toda la noche, toda la noche
Bailar con vos por toda la ciudad
`,

        descarga: 'material/toda_la_noche_subterraneo.mp3',  // Material de descarga relacionado
    },
    { 
        id: 'station5',
        estado:true,
        coordinates: [12.434932697960473, -86.87882525748682],
        song: 'Disco León', 
        spotify: 'https://open.spotify.com/embed/track/0gFGBpd6LiPLFMVidC9wg0?utm_source=generator',
        historia: `Bienvenido al Parque Central Juan José Quezada, el corazón vibrante de León y un lugar lleno de historia y tradición. Este emblemático espacio público lleva el nombre del héroe nacional Juan José Quezada, reconocido por su valiente participación en la defensa de la soberanía nicaragüense durante la histórica Batalla de San Jacinto. Rodeado por imponentes edificios coloniales y la majestuosa Catedral de León, el parque ha sido, por décadas, un punto de encuentro para locales y visitantes.
        
        Al costado norte, se encuentra el edificio de la Alcaldía Municipal, el cual alberga la sirena que suena diariamente, es una tradición que marca momentos específicos del día siendo estos las 7:00 a.m. y las 12:00 p.m. En la canción "Disco León" puedes escuchar el sonido de la sirena y vivir esa experiencia sonora.`,
        letra: `
        Disco León:

        Bajo las luces, el ritmo nos guía
        Entre la multitud, tu mirada me atrapa
        Movemos los cuerpos al compás del son
        Y en cada paso, se enciende la pasión
        
        Baila conmigo, bajo la luna brillante
        Deja que el deseo nos lleve adelante
        Y en este baile quiero conquistarte
        Con cada giro, con cada movimiento sutil
        En este instante el mundo es solo nuestro
        
        Coro:
        Mírame por favor
        Dime que te fascina
        Mírame por favor
        Siente la vibración
        Mírame por favor
        Dime que te fascina
        Mírame por favor
        Siente, Disco León
        
        Mírame por favor
        Dime que te fascina
        Mírame por favor
        Siente la vibración
        Mírame por favor
        Siente, Disco León
        
        El tiempo se detiene y la noche no avanza
        Y en este vaivén, vaivén descubrimos la sonrisa la noche
        Tus ojos color ámbar y el deseo de un amanecer juntos 
        
        Coro:
        Mírame por favor
        Dime que te fascina
        Mírame por favor
        Siente la vibración
        Mírame por favor
        Dime que te fascina
        Mírame por favor
        Siente, Disco León
        
        Mírame por favor
        Dime que te fascina
        Mírame por favor
        Siente la vibración
        Mírame por favor
        Dime que te fascina
        Mírame por favor
        Siente, Disco León.
`,

        descarga: 'material/disco_león_subterraneo.mp3',  // Material de descarga relacionado
    },
    { 
        id: 'station2',
        estado:true,
        coordinates: [12.4367756,-86.8790378], 
        song: 'Amanecer', 
        spotify: 'https://open.spotify.com/embed/track/0Z59Ert8jWHxIcTjd7yxDi?utm_source=generator',
        historia: `Bienvenido al histórico Paraninfo de la Universidad Nacional Autónoma de Nicaragua, León (UNAN-León), un emblemático edificio que ha sido testigo de momentos clave en la historia de Nicaragua. Fundada en 1812, la UNAN-León es la universidad más antigua del país y ha sido un centro de conocimiento y cultura durante más de dos siglos.

        El Paraninfo, con su arquitectura neoclásica, ha albergado innumerables eventos académicos y culturales. Sin embargo, uno de los momentos más significativos ocurrió el 18 de julio de 1979, cuando, tras el triunfo de la Revolución Sandinista, se instaló la primera Junta de Gobierno de Reconstrucción Nacional en este mismo recinto.
        
        Al visitar el Paraninfo, no solo se aprecia su valor arquitectónico, sino también su profundo significado histórico como escenario de transformaciones que han moldeado el destino de la nación.`,
        letra: `
        Amanacer:

        La noche es joven
        En cada risa y abrazo
        Encuentro mi armonía
        Vos sos esa melodía
        
        Un instante eterno
        Bajo las luces brillantes
        Siente el ritmo en tu cuerpo 
        Dejate llevar sin miedo
        
        Llegamos al amanecer, Cada momento, 
        una razón para ser, mismo sentimiento
        
        Coro:
        Cada paso es un baile, cada sonrisa es un verso,
        Llegamos al amanecer, cada momento
        Una razón para ser
        
        Así que levanta tus manos
        Deja que el ritmo te lleve
        Agarrame bien la cintura
        Y recuerdame para siempre
        
        Llegamos al amanecer, Cada momento, 
        una razón para ser, mismo sentimiento
        
        Coro:
        Cada paso es un baile, cada sonrisa es un verso,
        Llegamos al amanecer, cada momento
        Una razón para ser
`,
        descarga: 'material/amanecer_subterraneo.mp3',

    },
    { 
        id: 'station1',
        estado:true,
        coordinates: [12.4346107, -86.8816895], 
        song: 'Funky Love', 
        spotify: 'https://open.spotify.com/embed/track/6aQX82GweFeq01KG1qO0bO?utm_source=generator',
        historia: `Bienvenido al Centro de Arte Fundación Ortiz-Gurdián, un tesoro cultural en el corazón de la ciudad. Este museo, inaugurado en el año 2000, está compuesto de seis casas coloniales restauradas que datan de los siglos XVIII y XIX, cada una con su propia historia y arquitectura distintiva.

        Estas casas albergan una impresionante colección de arte que incluye obras de artistas de renombre como Picasso, Miró, Fernando Botero, Chagall, Matisse, Diego Rivera, entre otros.`,
        letra: `
        Funky Love:

Funky amor ritmo que nos une
Vos sos mi funky love 
Funky amor ritmo que nos une

En la ciudad de León, bajo las luces brillantes
Donde la calle se mezcla con pasión
Caminamos por la calle, al ritmo de la seducción
Como las nubes en el aire, una dulce conexión

Eres mi musa, sonrisa bella, un cuadro de picasso
Colores y versos, nuestro destino divino y terso
Bailamos juntos como dos locos por la noche
Vos y yo enrredados, un lazo hemos creado

Funky amor ritmo que nos une
Vos sos mi funky love
Funky amor ritmo que nos une
Vos sos mi funky, vos sos mi Funky
Vos sos mi funky love

Coro:
Funky amor ritmo que nos une
Bajo las estrellas en el rincón
Vos sos mi funky love

Funky amor ritmo que nos une
Bajo las estrellas en el rincón
Vos sos mi Funky Love

Tus ojos son el reflejo de un cielo estrellado
Como un verso de Sabina, nuestro amor es declarado
En cada palabra, encuentro una melodía
Con una mirada tuya y mía, nuestra sinfonía

Nuestro amor es la ola, la ola, la ola
La brisa que no se desgrana
Al compás de la playa, la playa, la playa
Nuestras almas se entrelazan
El tiempo se detiene cuando estamos juntos
Bajo la luz tenue, vibramos hasta lo más profundo 

Funky amor ritmo que nos une
Vos sos mi funky love
Funky amor ritmo que nos une
Vos sos mi funky, vos sos mi Funky
Vos sos mi funky love

Coro:
Funky amor ritmo que nos une
Bajo las estrellas en el rincón
Vos sos mi funky love

Funky amor ritmo que nos une
Bajo las estrellas en el rincón
Vos sos mi Funky Love
`,
        descarga: 'material/funky_love_subterraneo.mp3',
    },
    { 
        id: 'station7',
        estado:true,
        coordinates: [12.43359223077556, -86.89552607333378], 
        song: 'El Vuelo', 
        spotify: 'https://open.spotify.com/embed/track/5JvSykCQFREhciHEVyHuYq?utm_source=generator',
        historia: `Bienvenido a la Plaza de Sutiaba, un espacio emblemático que refleja la rica herencia cultural esta comunidad.

        Esta plaza, ubicada en el extremo occidental de la ciudad, ha sido el corazón de la vida comunitaria desde el siglo XVII. En 1610 se estableció la Plaza Mayor, marcando el inicio de la configuración urbana del poblado indígena, finalizando este proceso en 1752 con la construcción de la Casa Cural.
        
        Al visitar la Plaza de Sutiaba, no solo se aprecia su valor arquitectónico y paisajístico, sino que también se experimenta la esencia de una comunidad que ha preservado sus tradiciones y legado a lo largo de los siglos.`,
        letra: `
        El vuelo:

        Caer en cuenta que recordar y sonreír
        Es disfrutar y conocer
        Sentir que un desvío nos haría fallar
        Caminar entre volcanes y encontrar el más alto
        
        Para ver el cielo, sobre el bosque
        Preguntarnos si ese es el cuál alcanzar
        Y remontar el vuelo 
        
        Tomar en cuenta lo que se quiere construir
        Y hacía donde caminar
        Cruzar la puerta que lleva hacía la libertad
        Desafiar al mismo tiempo el pensamiento
        
        E ir tras tu sueños, e ilusiones
        Preguntarte si así es como hay que empezar
        Y remontar el vuelo
        Y remontar el vuelo 
        
        Parararapa papara, Parararapa papara
        Parararapa paparara
        Parararapa papara, Parararapa papara
        Parararapa papara
        
        Caer en cuenta que recordar y sonreír
        Es disfrutar y conocer
        Sentir que un desvío nos haría fallar
        Caminar entre volcanes y encontrar el más alto
        
        Para ver el cielo, sobre el bosque
        Preguntarnos si ese es el cuál alcanzar
        Y remontar el vuelo 
        Y remontar el vuelo
        
        Tomar en cuenta lo que se quiere construir
        Y hacía donde caminar.
`,
        descarga: 'material/el_vuelo_subterraneo.mp3',
    },
    {
        id: 'station6', 
        estado:true,
        coordinates: [12.41776514306273, -86.86961393544814], 
        song: 'Lavanda', 
        spotify: 'https://open.spotify.com/embed/track/1RR4Ssmc640PaBIm8dEfeb?utm_source=generator',
        historia: `Bienvenido al Parque Centenario Rubén Darío, un emblemático espacio que honra al insigne poeta nicaragüense Rubén Darío, nacido en León. Inaugurado en el 2016 en conmemoración del centenario de su fallecimiento. El parque destaca por su majestuoso pórtico con una placa-retrato de Darío y un vibrante jardín. 

        Este espacio forma parte del "Paseo de los Leones", un circuito que embellece la entrada sur de la ciudad, ofreciendo a los visitantes una cálida bienvenida.
        
        A pocos metros de aquí, se encuentra el Estadio Rigoberto López Pérez, inaugurado en septiembre de 2024 y nombrado en honor al héroe nacional Rigoberto López Pérez, este moderno estadio cuenta con una capacidad para 7,200 espectadores.
        
        Al recorrer estos espacios, se  logra aprecia la belleza de la mezcla arquitectónica con la naturaleza de la ciudad.`,
        letra: `
        Lavanda:
        Canción Instrumental.
`,
        descarga: 'material/lavanda_subterraneo.mp3',
    },
    { 
        id: 'station3',
        estado:true,
        coordinates: [12.431925482787864, -86.87884519510295], 
        song: 'La Pega', 
        spotify: 'https://open.spotify.com/embed/track/5H3yKYaPa70nsn7vtVozoo?utm_source=generator',
        historia: `En este momento te encuentras en la antigua Cárcel La 21, hoy convertida en el Museo de Mitos y Leyendas de León. Construida en 1921, su nombre proviene de ese mismo año. Inicialmente, funcionó como prisión común, pero tras la muerte del dictador Anastasio Somoza García en 1956, se transformó en un centro de detención y tortura para opositores al régimen somocista. Este oscuro capítulo de la historia nicaragüense perduró hasta 1979, cuando las fuerzas Sandinistas liberaron la ciudad. Hoy, las celdas de La 21 albergan exposiciones que cuentan las leyendas y tradiciones de la ciudad, ofreciendo una visión amplia de la cultura leonesa`,
        letra: `
        La Pega:

        Puedo sentir el calor del sol
        O esconderme de un huracán
        A veces pienso que está mal
        A veces hago, como, todos los demás

        Coro:
        No volteo si quiera a mirar
        Aunque siento que no puedo más
        Esta historia tiene el mismo final
        Y la pega me hace olvidar

        A veces es confuso, nos volvemos ilusos
        Un día sin realidad, un mundo sin vanidad
        Es egoísmo o es una falsedad
        Prefieres un poco de paz
        O completar, para tapinear

        Coro:
        No volteo si quiera a mirar
        Aunque siento que no puedo más
        Esta historia tiene el mismo final
        Y la pega me hace olvidar
`,
        descarga: 'material/la_pega_subterraneo.mp3',
    }
];


// Obtener las estaciones del localStorage y convertirlas de nuevo a un objeto
const estacionesGuardadas = JSON.parse(localStorage.getItem('estacionesLocales'));

// Verificar si se cargó correctamente
if (estacionesGuardadas) {
    console.log(estacionesGuardadas);
} else {
    
    localStorage.setItem("estacionesLocales", JSON.stringify(estaciones));
}


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
        console.log('IndexedDB inicializada.');
    };
    request.onerror = function (event) {
        console.error('Error al abrir IndexedDB:', event.target.errorCode);
    };
}
initIndexedDB();

// Función para guardar progreso
function guardarProgreso(userId, unlockedStations) {
    console.log('Guardando progreso para ID:', userId);
    const request = indexedDB.open(dbName);
    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        const data = { id: userId, stations: unlockedStations };
        const putRequest = store.put(data);
        putRequest.onsuccess = function () {
            console.log('Progreso guardado:', data);
        };
        putRequest.onerror = function (event) {
            console.error('Error al guardar progreso:', event.target.error);
        };
    };
    request.onerror = function (event) {
        console.error('Error al abrir IndexedDB para guardar:', event.target.errorCode);
    };
}

// Función para cargar progreso
function cargarProgreso(userId, callback) {
    console.log('Cargando progreso para ID:', userId);
    const request = indexedDB.open(dbName);
    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);

        const getRequest = store.get(userId);
        getRequest.onsuccess = function (event) {
            const result = event.target.result;
            console.log('Progreso cargado:', result);
            callback(result ? result.stations : []);
        };
        getRequest.onerror = function (event) {
            console.error('Error al cargar progreso:', event.target.error);
            callback([]);
        };
    };
    request.onerror = function (event) {
        console.error('Error al abrir IndexedDB para cargar:', event.target.errorCode);
        callback([]);
    };
}

// Función para obtener un userId único
function obtenerUserId(callback) {
    const storedId = localStorage.getItem('userId');
    if (storedId) {
        console.log('User ID cargado de localStorage:', storedId);
        callback(storedId);
        return;
    }

    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const userId = data.ip || `user_${Date.now()}`;
            localStorage.setItem('userId', userId);
            console.log('User ID obtenido y guardado en localStorage:', userId);
            callback(userId);
        })
        .catch(error => {
            console.error('Error al obtener la IP:', error);
            const fallbackId = `user_${Date.now()}`;
            localStorage.setItem('userId', fallbackId);
            console.log('User ID de respaldo generado:', fallbackId);
            callback(fallbackId);
        });
}

// Añadir los marcadores al mapa solo una vez
function actualizarMarcadores() {
    
    
    // Eliminar todos los marcadores del mapa
    stationMarkers.forEach(marker => map.removeLayer(marker));


    // Recuperar el objeto y convertirlo de nuevo a JSON
    estaciones = JSON.parse(localStorage.getItem("estacionesLocales"));

    estaciones.forEach(estacion => {
        const marker = L.marker(estacion.coordinates, { icon: lockedMarker }).addTo(map);
        //marker.isLocked = true;  // Inicialmente, todos los marcadores están bloqueados
        marker.isLocked = estacion.estado;
        if(!estacion.estado)
            marker.setIcon(unlockedMarker);
    
        // Agregar evento de clic al marcador
        marker.on('click', function () {
            if (!marker.isLocked) {
                document.getElementById('song-title').innerText = estacion.song;
                document.getElementById('spotify-embed-container').innerHTML = `<iframe style="border-radius:12px; width: 100%; height: 352px;" src="${estacion.spotify}" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
                document.getElementById('song-history').innerText = `Sobre del lugar: ${estacion.historia}`;
        // Añadir letra de la canción
        document.getElementById('song-lyrics').innerText = `${estacion.letra}`;
                document.getElementById('download-material').innerHTML = `
                <a href="${estacion.descarga}" download class="download-link">Descargar Mp3 Grátis</a>
            `;
                document.querySelector('.song-details').classList.remove('hidden');
            } else {
                alert(`Estación ${estacion.song} está bloqueada. Acércate más para desbloquearla.`);
            }
        });
    // Cerrar el pop-up
    document.querySelector('.btn-close').addEventListener('click', function () {
        document.querySelector('.song-details').classList.add('hidden');
        document.getElementById('spotify-embed-container').innerHTML = ''; // Limpia el iframe al cerrar
    });
        // Guardar el marcador en el array para su posterior actualización
        stationMarkers.push(marker);
    });
}
actualizarMarcadores();
actualizarProgresoBarra();


// Función para verificar proximidad y actualizar marcadores
const proximityRadius = 30;
function checkProximity(userLat, userLng) {
    stationMarkers.forEach((marker, index) => {
        const estacion = estaciones[index];
        const distance = map.distance([userLat, userLng], estacion.coordinates);

        // Actualizar el estado de desbloqueo y el ícono del marcador
        if (distance <= proximityRadius) {
            if (marker.isLocked) {
                marker.setIcon(unlockedMarker);
                marker.isLocked = false;

                estaciones[index].estado = false;

                // Convertir el objeto a una cadena JSON y guardarlo
                localStorage.removeItem("estacionesLocales");
                localStorage.setItem("estacionesLocales", JSON.stringify(estaciones));

                actualizarMarcadores();
                actualizarProgresoBarra();
            }
        //   
        } 

    })
}

// Definir un ícono personalizado para la ubicación del usuario
const userIcon = L.icon({
    iconUrl: 'esedesubterraneo.png', // Cambia esto por la ruta de tu imagen
    iconSize: [40, 40], // Tamaño del ícono [ancho, alto]
    iconAnchor: [20, 40], // Punto del ícono que se posicionará en la ubicación [x, y]
    popupAnchor: [0, -40], // Punto donde se abrirá el popup (si usas uno)
});
// Obtener la ubicación en tiempo real del usuario y agregar un marcador
let userMarker;
let firstUpdate = true;

obtenerUserId(function (userId) {
    console.log('User ID:', userId);

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            function (position) {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                // Actualizar o crear el marcador de la ubicación del usuario
                if (userMarker) {
                    userMarker.setLatLng([userLat, userLng]); // Actualiza la ubicación del marcador sin crear uno nuevo
                } else {
                    userMarker = L.marker([userLat, userLng]).addTo(map); // Crea el marcador en la primera ubicación
                }

                // Centrar el mapa en la ubicación del usuario si es la primera actualización
                // o si se ha desplazado una distancia significativa
                if (firstUpdate || map.distance(userMarker.getLatLng(), [userLat, userLng]) > 50) {
                    map.setView([userLat, userLng], 13, { animate: true });
                    firstUpdate = false;
                }

                // Verificar la proximidad del usuario a las estaciones
                checkProximity(userLat, userLng);

                // Obtener las estaciones desbloqueadas
                const unlockedStations = stationMarkers
                    .filter(marker => !marker.isLocked)
                    .map(marker => estaciones[stationMarkers.indexOf(marker)].id);

                // Guardar el progreso en IndexedDB
                guardarProgreso(userId, unlockedStations);
            },
            function () {
                alert('No se pudo obtener la ubicación.');
            },
            { enableHighAccuracy: true, maximumAge: 2000, timeout: 4000 }
        );
    } else {
        alert('Tu navegador no soporta geolocalización.');
    }
});


// Función para actualizar la barra de progreso
function actualizarProgresoBarra() {
    // Calcula el porcentaje de progreso basado en las estaciones desbloqueadas
    const totalEstaciones = estaciones.length;
    const estacionesDesbloqueadas = stationMarkers.filter(marker => !marker.isLocked).length;
    const progreso = (estacionesDesbloqueadas / totalEstaciones) * 7;

    // Actualizar la barra de progreso con el nuevo valor
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = progreso + '%'; // Establece el ancho de la barra
}

