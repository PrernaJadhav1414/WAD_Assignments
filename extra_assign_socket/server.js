const http = require('http');
const { Server } = require('socket.io');
const { io } = require('socket.io-client');
const readline = require('readline');

const server = http.createServer();
const ioServer = new Server(server);

const socketToSelf = io('http://localhost:3000');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptInput() {
    rl.question('Server: ', (msg) => {
        socketToSelf.emit('message', `From server: ${msg}`);  
        console.log(`Server sends: ${msg}`); 

        ioServer.emit('message', `Server says: ${msg}`);
        promptInput(); 
    });
}

socketToSelf.on('connect', () => {
    console.log('Server connected to itself');
    promptInput();  
});

socketToSelf.on('message', (msg) => {
    console.log(`Server (self) says: ${msg}`);
});

ioServer.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('message', (msg) => {
        console.log(`Client says: ${msg}`);

        if (msg.toLowerCase() === 'by') {
            console.log('Client sent "by server", disconnecting client...');
            socket.emit('message', 'Goodbye from the server!'); 
            socket.disconnect();  
        } else {
            socket.emit('message', `Server received: "${msg}"`);  
        }
    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
