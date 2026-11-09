const http = require('http');
const bedrock = require('bedrock-protocol');

// 1. Render ko 24/7 jagaye rakhne ke liye Web Server
const PORT = process.env.PORT || 10000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Aternos Bedrock Bot Online 24/7\n');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Web server listening on port ${PORT}`);
});

// 2. Bot Configuration
const CONFIG = {
  host: 'MinecraftSMP-bPym.aternos.me',
  port: 19132,
  username: 'AFK_Bot_247',
  version: '1.21.50' // Bedrock build version match
};

let bot = null;

function connectBot() {
  console.log(`Attempting direct connection to ${CONFIG.host}:${CONFIG.port}...`);

  try {
    bot = bedrock.createClient({
      host: CONFIG.host,
      port: CONFIG.port,
      username: CONFIG.username,
      offline: true,
      skipPing: true, // Discovery fail bypass karne ke liye zaruri
      version: CONFIG.version,
      connectTimeout: 60000,
      raknetBackend: 'jsp-raknet' // Cloud environments ke liye most compatible
    });

    bot.on('join', () => {
      console.log('>>> BEDROCK BOT SERVER MEIN SAFALTA-PURVAK ENTER HO GAYA! <<<');
    });

    bot.on('spawn', () => {
      console.log('>>> Bot world ke andar spawn ho gaya (AFK Active) <<<');
    });

    bot.on('kick', (reason) => {
      console.log('Bot kick hua:', JSON.stringify(reason));
    });

    bot.on('error', (err) => {
      console.log('Bot error:', err.message);
    });

    bot.on('close', () => {
      console.log('Connection band hua. 15 second mein re-connect karega...');
      bot = null;
      setTimeout(connectBot, 15000);
    });

  } catch (err) {
    console.log('Client init error:', err.message);
    setTimeout(connectBot, 15000);
  }
}

connectBot();

// Render process crash protection
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception:', err.message);
});

process.on('unhandledRejection', (reason) => {
  console.log('Unhandled Rejection:', reason);
});
