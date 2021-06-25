class Sockets {

    constructor(io) {
        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        //On Connections
        this.io.on('connection', (socket) => {
            socket.emit('welcome', {
                msg: 'Bienvenido al server',
                time: new Date()
            });
    
        //Listen Event
            socket.on('msgDom', (data) => {
                console.log(data);
                this.io.emit('msg-from-server', data);
            });
        
        });
    }

}

module.exports = Sockets;