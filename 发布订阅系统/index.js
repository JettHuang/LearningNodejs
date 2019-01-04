// publish-subscript
'use strict';
const events = require('events');
const net = require('net');
const channel = new events.EventEmitter();

console.log('channel: ' + channel);

channel.clients = {};
channel.subscriptions = {};
channel.on('join', (id, client) => {
    console.log("this: " + channel + ", clients: " + channel.clients);

    channel.clients[id] = client;
    channel.subscriptions[id] = (senderId, message) => {
        if (id != senderId) {
            channel.clients[id].write(message);
        }
    };
    channel.on('broadcast', channel.subscriptions[id]);
});

const server = net.createServer(client => {
    const id = `${client.remoteAddress}:${client.remotePort}`;
    console.log('client connected: ' + id);

    channel.emit('join', id, client);
    client.on('data', data => {
        data = data.toString();
        channel.emit('broadcast', id, data);
    });
});

server.listen(8888);