const socket = io();
let map, markers = {};
let currentRoom = "";

function handleAuth(type) {
    const nameInput = document.getElementById('username').value;
    let roomInput = document.getElementById('room-id').value;

    if (!nameInput) return alert("Please enter your name");

    if (type === 'create') {
        currentRoom = Math.floor(100000 + Math.random() * 900000).toString();
        alert("Your New Room ID: " + currentRoom);
    } else {
        if (!roomInput) return alert("Please enter a Room ID to join");
        currentRoom = roomInput;
    }

    startApp(nameInput, currentRoom);
}

function startApp(username, roomId) {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('map').style.display = 'block';

    map = L.map('map').setView([35.29, 75.64], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    socket.emit('join-room', { roomId, username });

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            (pos) => {
                socket.emit('send-location', {
                    roomId,
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                });
            },
            (err) => console.error(err),
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    }
}

socket.on('receive-location', (data) => {
    const { id, username, latitude, longitude } = data;

    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map)
            .bindTooltip(username, { permanent: true, direction: 'top', className: 'user-label' })
            .openTooltip();
    }
});

socket.on('user-left', (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});