const http = require('http');
const bedrock = require('bedrock-protocol');

// Render keep-alive server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Aternos Bedrock Bot Active 24/7\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Web server listening on port ${PORT}`);
});

function createBedrockBot() {
  console.log('Connecting Bedrock bot...');

  const client = bedrock.createClient({
    host: 'MinecraftSMP-bPym.aternos.me',
    port: 19132,
    username: 'AFK_Bot_247',
    offline: true,
    skipPing: true,
    connectTimeout: 30000
  });

  client.on('join', () => {
    console.log('>>> Bedrock Bot successfully server me join ho gaya! <<<');
  });

  client.on('kick', (reason) => {
    console.log('Bot kick hua:', JSON.stringify(reason));
  });

  client.on('close', () => {
    console.log('Connection close hua. 15 second me reconnect kar raha hai...');
    setTimeout(createBedrockBot, 15000);
  });

  client.on('error', (err) => {
    console.log('Bedrock error:', err.message);
  });
}

createBedrockBot();
