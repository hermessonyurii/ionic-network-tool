# 🛠️ Diagnóstico de Rede - Ferramenta Completa

Bem-vindo ao projeto **Diagnóstico de Rede**! Esta aplicação foi desenvolvida para capturar e exibir características detalhadas da sua rede, atendendo a todos os requisitos de um desafio técnico de análise e diagnóstico de redes.

---

## ✨ Funcionalidades
- **Captura do Tipo de NAT** (com resposta amigável caso indisponível)
- **Detecção de Servidores DNS**
- **Identificação do Provedor de Serviços (ISP)**
- **Coleta do Endereço IP Público**
- **Coleta de Propriedades de Rede Interna** (IP local, MAC, máscara, interface)
- **Verificação de Conectividade Externa** (ping)
- **Análise de Performance da Rede** (download, upload, latência)
- **Interface Web Responsiva e Moderna**

---

## 👨‍💻 Autor
- **Nome:** Hermesson Yuri
- **Portfólio:** [hermessonyuri.com](https://www.hermessonyuri.com)
- **LinkedIn:** [linkedin.com/in/hermesson-yuri](https://www.linkedin.com/in/hermesson-yuri)
- **GitHub:** [github.com/hermessonyurii](https://github.com/hermessonyurii)
- **DIO.me:** [dio.me/users/contato_39140](https://www.dio.me/users/contato_39140)

---

## ▶️ Como rodar o projeto localmente

### 1. Clone o repositório
```bash
git clone https://github.com/hermessonyurii/ionic-network-tool.git
cd ionic-network-tool
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Estrutura de pastas criada (comandos utilizados)
```bash
mkdir src
mkdir src/utils
mkdir public
```

### 4. Criação dos arquivos principais (comandos utilizados)
```bash
touch src/app.js
# Utilitários de rede
mkdir -p src/utils && touch src/utils/networkUtils.js
# Frontend
cd public && touch index.html script.js style.css && cd ..
```

### 5. Rodando o servidor localmente
```bash
npm start
```
Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 📂 Estrutura do Projeto
```
ionic-network-tool/
├── package.json
├── package-lock.json
├── README.md
├── node_modules/
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
└── src/
    ├── app.js
    └── utils/
        └── networkUtils.js
```

---

## 📝 Requisitos Atendidos
1. **Captura do Tipo de NAT:** Identificação automática ou mensagem amigável caso indisponível.
2. **Detecção de Servidores DNS:** Mostra todos os servidores DNS e resposta do Google.
3. **Identificação do Provedor de Serviços (ISP):** Busca via IPinfo.io, mostrando nome, localização e ASN.
4. **Coleta do Endereço IP Público:** Exibe o IP externo do usuário.
5. **Coleta de Propriedades de Rede Interna:** Lista IP local, MAC, máscara e interface.
6. **Verificação de Conectividade Externa:** Teste de ping para google.com.
7. **Análise de Performance da Rede:** Mede download, upload e latência.
8. **Interface do Usuário:** Web app moderno, responsivo e fácil de usar.

---

## 💡 Observações
- O campo NAT pode aparecer como "Indisponível" em alguns ambientes, devido a restrições de rede ou sistema operacional.
- O provedor e localização dependem da base de dados pública do IPinfo.io e podem não aparecer para todos os IPs.
- O projeto pode ser facilmente adaptado para outros serviços de IP, caso deseje.

---

## 📬 Contato
Fique à vontade para entrar em contato pelo [LinkedIn](https://www.linkedin.com/in/hermesson-yuri) ou pelo [portfólio](https://www.hermessonyuri.com)!

---

**Feito com dedicação por [Hermesson Yuri](https://www.hermessonyuri.com).** 
