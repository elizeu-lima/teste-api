var fecharBotao = document.getElementById("fecharPagina");

fecharBotao.addEventListener("click", function() {
  // Fecha a janela atual
  window.close();
});

// função para fazer a chamada à API
async function fetchAPI(url){
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

//Função para exibir osdados na página
function displayData(data){
    const registrosDiv = document.getElementById('registros');
    data.registros.forEach(registro => {
        const registroDiv = document.createElement('div');
        registroDiv.innerHTML = `
        <h2>Registo ID: ${registro.id}</h2>
        `
    })
}

// Função para exibir os dados na página
function displayData(data) {
    const registrosDiv = document.getElementById('registros');
    data.registros.forEach(registro => {
        const registroDiv = document.createElement('div');
        registroDiv.innerHTML = `
            <h2>Registro ID: ${registro.id}</h2>
            <p>Data e Hora: ${registro.data_e_hora}</p>
            <p>Operador: ${registro.operador.nome}</p>
            <p>Cliente: ${registro.cliente.nome}</p>
            <p>Tipo de Contato: ${registro.tipo_de_contato.join(', ')}</p>
            <h3>Histórico:</h3>
            <ul>
                ${registro.historico.map(item => `
                    <li>
                        Enviado em ${item.data_e_hora}: ${item.mensagem_enviada}<br>
                        Recebido em ${item.data_e_hora}: ${item.mensagem_recebida}
                    </li>
                `).join('')}
            </ul>
        `;
        registrosDiv.appendChild(registroDiv);
        console.log(data);
    });
}

// URL da API
const apiURL = '/api/dados_historico.json';

// Chamar a API e exibir os dados na página
fetchAPI(apiURL)
    .then(data => displayData(data))
    .catch(error => console.error('Erro ao buscar dados da API:', error));