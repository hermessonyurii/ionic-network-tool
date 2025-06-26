const axios = require('axios');
const dns = require('dns');
const os = require('os');
const ping = require('ping');
const speedTest = require('speedtest-net');
const natType = require('nat-type-identifier');

async function getPublicIP() {
  try {
    const res = await axios.get('https://api.ipify.org?format=json');
    return res.data.ip;
  } catch (err) {
    console.error('Erro ao obter IP público:', err);
    return null;
  }
}

async function getISPInfo(ip) {
  try {
    const token = '8623ad025d180f'; // Seu token ipinfo.io
    const res = await axios.get(`https://ipinfo.io/${ip}?token=${token}`);
    return {
      ip: res.data.ip,
      isp: res.data.org || res.data.isp || res.data.company || 'N/A',
      cidade: res.data.city || 'N/A',
      regiao: res.data.region || 'N/A',
      pais: res.data.country || 'N/A',
      asn: res.data.asn || '',
      org: res.data.org || '',
      raw: res.data // Inclui todos os dados crus para debug
    };
  } catch (err) {
    console.error('Erro ao obter informações do ISP:', err);
    return { erro: 'Falha ao obter informações do ISP', detalhes: err.message };
  }
}

async function getDNS() {
  return new Promise((resolve) => {
    dns.lookup('google.com', (err, address, family) => {
      if (err) {
        console.error('Erro ao verificar DNS:', err);
        resolve({ servidor: dns.getServers(), resposta: null });
      } else {
        resolve({ servidor: dns.getServers(), resposta: address });
      }
    });
  });
}

async function pingTest() {
  try {
    const result = await ping.promise.probe('google.com');
    return {
      host: result.host,
      tempo: result.time,
      online: result.alive
    };
  } catch (err) {
    console.error('Erro no teste de ping:', err);
    return { host: 'google.com', tempo: null, online: false };
  }
}

function getLocalNetworkInfo() {
  try {
    const interfaces = os.networkInterfaces();
    const infos = [];

    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {
        if (!iface.internal && iface.family === 'IPv4') {
          infos.push({
            interface: name,
            ip: iface.address,
            mac: iface.mac,
            netmask: iface.netmask
          });
        }
      }
    }

    return infos;
  } catch (err) {
    console.error('Erro ao obter informações de rede local:', err);
    return [];
  }
}

async function getSpeedTest() {
  try {
    const result = await speedTest({ acceptLicense: true, acceptGdpr: true });
    return {
      downloadMbps: (result.download.bandwidth * 8 / 1e6).toFixed(2),
      uploadMbps: (result.upload.bandwidth * 8 / 1e6).toFixed(2),
      ping: result.ping.latency
    };
  } catch (err) {
    console.error('Erro no teste de velocidade:', err);
    return { erro: "Falha ao testar velocidade", detalhes: err.message };
  }
}

async function detectNATType() {
  try {
    const result = await natType();
    if (!result || typeof result !== 'string') {
      return { nat: 'Indisponível' };
    }
    return { nat: result };
  } catch (err) {
    console.error('Erro ao identificar NAT:', err);
    return { nat: 'Indisponível', erro: err.message };
  }
}

module.exports = {
  getPublicIP,
  getISPInfo,
  getDNS,
  pingTest,
  getLocalNetworkInfo,
  getSpeedTest,
  detectNATType
};