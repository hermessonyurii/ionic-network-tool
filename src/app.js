const express = require('express');
const path = require('path');
const {
  getPublicIP,
  getISPInfo,
  getDNS,
  pingTest,
  getLocalNetworkInfo,
  getSpeedTest,
  detectNATType
} = require('./utils/networkUtils');

const app = express();
const PORT = 3000;

console.log('Iniciando o app.js');

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/network-info', async (req, res) => {
  try {
    // Obter todas as informações de rede
    const ip = await getPublicIP();
    const isp = await getISPInfo(ip);
    const dns = await getDNS();
    const ping = await pingTest();
    const local = getLocalNetworkInfo();
    const speed = await getSpeedTest();
    const nat = await detectNATType();

    // Enviar todas as informações juntas
    res.json({ ip, isp, dns, ping, local, speed, nat });
  } catch (error) {
    console.error('Erro ao obter informações de rede:', error);
    res.status(500).json({ error: 'Erro ao obter informações de rede', detalhes: error.message, stack: error.stack });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});