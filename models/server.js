//Inicializando Express
const express = require('express');

//Creando / Inicializando Servidor
const http = require('http');

//Socket - Configuration
const socketio = require('socket.io');

//Path
const path = require('path');
const Sockets = require('./sockets');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //HTTP Server
        this.server = http.createServer(this.app);

        //Configuraciones de Socket
        this.io = socketio(this.server, {/* configurations */});
    }

    middleware() {
        //Desplegar el directorio público
        this.app.use(express.static(path.resolve(__dirname, '../public')));
    }

    configureSockets() {
        new Sockets(this.io);
    }

    executeApp() {
        //Inicializar Middlewares
        this.middleware();

        //Inicializar Sockets
        this.configureSockets();

        //Escuchando en el puerto...
        this.server.listen(this.port, () => {
            console.log('Server running on port: ', this.port);
        });
    }

}

module.exports = Server;