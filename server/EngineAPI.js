const websocket = require('websocket');

module.exports = class EngineAPI {
  constructor(server, engine, port = 3001) {
    const websocketServer = new websocket.server({ httpServer: server });
    websocketServer.on('request', (event) => this.addSocket(event));
    console.log(`websocket server initiated.`);

    engine.on('start', (sampling) => this.broadcastMessage({ sample: sampling }));
    engine.on('stop', (sampling) => this.broadcastMessage({ sample: sampling }));
    engine.on('dutycycle', ({ dutycycle, client }) => this.broadcastMessage({ dc: dutycycle, client }));
    this.engine = engine;

    this.sockets = {};
    this.clients = 0;
  }

  sendMessageSample(socket, context) {
    context.sendMessage(socket, { sample: context.engine.sampling });
  }

  addSocket(event) {
    const socketId = this.clients++; // uuid.v1();
    this.sockets[socketId] = event.accept(null, event.origin);
    this.sockets[socketId].origin = event.origin; // origin of connection, client address
    this.sockets[socketId].samplerate = 2000; // sample rate at which socket sends sample updates
    this.sockets[socketId].on('message', (event) => this.receiveMessage(event, socketId));
    this.sockets[socketId].on('close', (event) => {
      clearInterval(this.sockets[socketId].samplerateId);
      this.removeSocket(event, socketId);
    });
    this.sendMessage(this.sockets[socketId], { client: `client-${socketId}` });

    /**
     * at a sample rate, poll socket clients of current Engine metrics
     */
    new Promise((resolve, reject) => {
      this.sockets[socketId].samplerateId = setInterval(this.sendMessageSample, this.sockets[socketId].samplerate, this.sockets[socketId], this);
    });

    console.log(`Connection to ${event.origin} established as client-${socketId}.`);
  }

  removeSocket(event, socketId) {
    const origin = this.sockets[socketId].origin;
    delete this.sockets[socketId];
    console.log(`Connection to ${origin} terminated.`);
  }

  sendMessage(socket, message) {
    socket.sendUTF(JSON.stringify(message));
  }

  receiveMessage(event, socketId) {
    if (event.type === 'utf8') {
      const message = JSON.parse(event.utf8Data);
      const [type] = Object.keys(message);
      switch (type) {
        case 'dc':
          // if no value, it's a request
          if (message[type] === null) this.sendMessage(this.sockets[socketId], { dc: this.engine.dutycycle, client: 'Engine' });
          // if has value, update value
          else this.engine.dutycycle = { dutycycle: message[type], client: `client-${socketId}` };
          break;
        case 'samplerate':
          this.socket[socketId].samplerate = message[type];
        default:
          console.log(`received ambiguous message type: ${type}`);
          break;
      }
    }
  }

  broadcastMessage(message) {
    Object.keys(this.sockets).map((id) => this.sendMessage(this.sockets[id], message));
  }
}
