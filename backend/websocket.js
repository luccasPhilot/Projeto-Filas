const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Novo cliente WebSocket conectado');

    ws.on('message', (message) => {
        console.log('Mensagem recebida:', message);
        // Aqui você pode adicionar lógica para lidar com as mensagens recebidas
    });

    ws.send('Conexão WebSocket estabelecida');
});

module.exports = wss; // Exporta o servidor WebSocket para uso no app.js
