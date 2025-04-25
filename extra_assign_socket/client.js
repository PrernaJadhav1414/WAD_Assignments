const { io } = require('socket.io-client');

const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('message', (msg) => {
    console.log(`Server says: ${msg}`);
    if (msg === 'Goodbye from the server!') {
        console.log('The server has disconnected you.');
        socket.disconnect();  
    }
});

process.stdin.on('data', (data) => {
    const message = data.toString().trim();
    socket.emit('message', message); 
});
