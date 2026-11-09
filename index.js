const http = require('http');
const bedrock = require('bedrock-protocol');

// 1. Render ko 24/7 active rakhne ke liye HTTP Server
const PORT = process.env.PORT || 10000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Aternos 24/7 Bedrock Bot is Running!\n');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Web server listening on port ${PORT}`);
});

// 2. Server Configuration
const CONFIG = {
  host: 'MinecraftSMP-bPym.aternos.me',
  port: 19132,
  username: 'AFK_Bot_247',
  offline: true
};

let botClient = null;

function startBot() {
  console.log(`Connecting to ${CONFIG.host}:${CONFIG.port} as ${CONFIG.username}...`);

  try {
    botClient = bedrock.createClient({
      host: CONFIG.host,
      port: CONFIG.port,
      username: CONFIG.username,
      offline: CONFIG.offline,
      skipPing: false,
      connectTimeout: 45000,
      raknetBackend: 'raknet-native' // Fast and stable RakNet handshake
    });

    botClient.on('join', () => {
      console.log('>>> SUCCESS: Bedrock Bot server me enter ho gaya! <<<');
    });

    botClient.on('spawn', () => {
      console.log('>>> Bot world me spawn ho chuka hai (AFK mode on) <<<');
    });

    botClient.on('kick', (packet) => {
      console.log('Bot kick hua. Reason:', JSON.stringify(packet.message || packet));
    });

    botClient.on('error', (err) => {
      console.log('Bedrock Client Error:', err.message);
    });

    botClient.on('close', () => {
      console.log('Connection closed. 15 second me reconnect kar raha hai...');
      botClient = null;
      setTimeout(startBot, 15000);
    });

  } catch (error) {
    console.log('Bot initialization error:', error.message);
    setTimeout(startBot, 15000);
  }
}

// Bot start karein
startBot();

// Crash protection
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception caught:', err.message);
});

process.on('unhandledRejection', (reason) => {
  console.log('Unhandled Rejection caught:', reason);
});
