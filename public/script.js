async function fetchNetworkInfo() {
    const outputElement = document.getElementById('output');
    const refreshBtn = document.getElementById('refreshBtn');
    
    try {
      // Mostrar estado de carregamento
      outputElement.innerHTML = '<div class="loading">Carregando informações de rede...</div>';
      refreshBtn.disabled = true;
      refreshBtn.textContent = 'Atualizando...';
  
      // Faz a requisição
      const response = await fetch('/api/network-info');
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Formata para exibir os dados de forma mais legível
      displayNetworkInfo(data);
      
    } catch (error) {
      console.error('Falha ao buscar informações:', error);
      outputElement.innerHTML = `
        <div class="error">
          <h3>Erro ao obter informações</h3>
          <p>${error.message}</p>
          <p>Tente novamente mais tarde.</p>
        </div>
      `;
    } finally {
      refreshBtn.disabled = false;
      refreshBtn.textContent = 'Atualizar Dados';
    }
  }
  
  function displayNetworkInfo(data) {
    const outputElement = document.getElementById('output');
    
    // Deixei a visualização mais amigável dos dados
    let html = `
      <div class="network-info">
        <div class="card">
          <h3 class="card-title">Informações Básicas</h3>
          <div class="info-grid">
            <span class="info-label">IP Público:</span>
            <span class="info-value">${data.ip || 'N/A'}</span>
            <span class="info-label">Provedor:</span>
            <span class="info-value">${data.isp?.isp || 'N/A'}</span>
            <span class="info-label">Localização:</span>
            <span class="info-value">${data.isp?.cidade || 'N/A'}, ${data.isp?.regiao || ''} ${data.isp?.pais || ''}</span>
          </div>
        </div>
  
        <div class="card">
          <h3 class="card-title">Conexão</h3>
          <div class="info-grid">
            <span class="info-label">Ping:</span>
            <span class="info-value">${data.ping?.tempo || 'N/A'} ms</span>
            <span class="info-label">Download:</span>
            <span class="info-value">${data.speed?.downloadMbps || 'N/A'} Mbps</span>
            <span class="info-label">Upload:</span>
            <span class="info-value">${data.speed?.uploadMbps || 'N/A'} Mbps</span>
            <span class="info-label">Tipo de NAT:</span>
            <span class="info-value">${data.nat?.nat || 'N/A'}</span>
          </div>
        </div>
  
        <div class="card">
          <h3 class="card-title">DNS</h3>
          <div class="info-grid">
            <span class="info-label">Servidores DNS:</span>
            <span class="info-value">${data.dns?.servidor?.join(', ') || 'N/A'}</span>
            <span class="info-label">Resposta Google:</span>
            <span class="info-value">${data.dns?.resposta || 'N/A'}</span>
          </div>
        </div>
  
        <div class="card">
          <h3 class="card-title">Rede Local</h3>
          ${data.local?.map(iface => `
            <div class="info-grid">
              <span class="info-label">Interface:</span>
              <span class="info-value">${iface.interface}</span>
              <span class="info-label">IP Local:</span>
              <span class="info-value">${iface.ip}</span>
              <span class="info-label">MAC:</span>
              <span class="info-value">${iface.mac}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  
    outputElement.innerHTML = html;
  }
  
  // Irá Adicionar evento ao botão de atualizar
  document.getElementById('refreshBtn')?.addEventListener('click', fetchNetworkInfo);
  
  // Para Carregar dados inicialmente
  document.addEventListener('DOMContentLoaded', fetchNetworkInfo);
  
  
  // Test Console
  // document.getElementById('output').textContent = 'Funcionando!';