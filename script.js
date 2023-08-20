/*Bonus fechar pagina */

var fecharBotao = document.getElementById("fecharPagina");

fecharBotao.addEventListener("click", function() {
  
  window.close();
});




const atendimentosContainer = document.getElementById('atendimentos');


/*Exibir 3 ultimos atendimentos */

const mostrarMaisButton = document.getElementById('mostrar-mais');
let atendimentosExibidos = 3; //quando o ela é criada no html ela é chamada.
const atendimentosPorVez = 3;

function criarDivAtendimento(atendimento) {
  const divAtendimento = document.createElement('div');
  divAtendimento.classList.add('div-atendimento');

  const dataHora = new Date(atendimento.data_e_hora);
  const operadorId = atendimento.operador.id;
  const clienteTelefone = atendimento.cliente.telefone;
  const mensagemEnviada = atendimento.historico[atendimento.historico.length - 1].mensagem_enviada;
  const mensagemRecebida = atendimento.historico[atendimento.historico.length - 1].mensagem_recebida;

  divAtendimento.innerHTML = `
    <p>Data e Hora: ${dataHora.toLocaleString()}</p>
    <p>idOperador: ${operadorId}</p>
    <p>Telefone do Cliente: ${clienteTelefone}</p>
    <p>Mensagem Enviada: ${mensagemEnviada}</p>
    <p>Mensagem Recebida: ${mensagemRecebida}</p>
  `;

  return divAtendimento;
}

/*carregas os ultimos atendimentos no carregamento da pagina */

function renderizarAtendimentos(atendimentos) {
  atendimentosContainer.innerHTML = '';

  atendimentos.forEach(atendimento => {
    const div = document.createElement('div');
    div.classList.add('atendimento');
    const divAtendimento = criarDivAtendimento(atendimento);
    div.appendChild(divAtendimento);
    atendimentosContainer.appendChild(div);
  });
}

/*faz o filtro buscando atendimento do operador selecionado no icone */

function mostrarAtendimentos(operadorId) {
  const url = '/api/dados_historico.json'; 
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const ultimasMensagens = data.registros.map(registro => {
        const historico = registro.historico;
        const ultimaMensagem = historico[historico.length - 1];
        return {
          ...registro,
          operador: { id: ultimaMensagem.idOperador },
          cliente: { telefone: registro.cliente.telefone },
          mensagem_enviada: ultimaMensagem.mensagem_enviada,
          mensagem_recebida: ultimaMensagem.mensagem_recebida
        };
      });

      if (operadorId) {
        const atendimentosOperador = ultimasMensagens.filter(atendimento => atendimento.operador.id === operadorId);
        renderizarAtendimentos(atendimentosOperador);
      } else {
        renderizarAtendimentos(ultimasMensagens.slice(0, atendimentosExibidos));
      }
    })
    .catch(error => console.error('Erro ao buscar dados da API:', error));
}

/*mostra mais atendimentos além dos tres primeiros de incio */

function mostrarMaisAtendimentos() {
  atendimentosExibidos += atendimentosPorVez;
  mostrarAtendimentos();
}

// Carregar automaticamente ao carregar a página
window.addEventListener('DOMContentLoaded', () => mostrarAtendimentos(null));









    /*seção 2 */

const operatorIcons = document.querySelectorAll('#operator-icons ');
const tableBody = document.getElementById('table-body');
const loadingMessage = document.getElementById('loading-message');
const noRecordsMessage = document.getElementById('no-records-message');
const initialRecordsCount = 6;
let filteredOperator = null;
let allRecords = null;

/*filtra atendimentos conforme o operador selecionado */

operatorIcons.forEach(icon => {
  icon.addEventListener('click', () => {
      filteredOperator = icon.getAttribute('data-operator');
      updateTable();
  });
});

const displayedStartDate = document.getElementById('date-range'); // Substitua pelo ID real do elemento de exibição de data

// ...




const todayButton = document.getElementById('today-button');
const last3DaysButton = document.getElementById('last-3-days-button');
const last7DaysButton = document.getElementById('last-7-days-button');
const last15DaysButton = document.getElementById('last-15-days-button');
const customRangeButton = document.getElementById('custom-range-button');
const startDateSelector = document.getElementById('custom-start-date');
const endDateSelector = document.getElementById('custom-end-date');



todayButton.addEventListener('click', () => {
    todayButton.classList.add('active');
    last3DaysButton.classList.remove('active');
    last7DaysButton.classList.remove('active');
    last15DaysButton.classList.remove('active');
    customRangeButton.classList.remove('active');
    updateTable();
});

last3DaysButton.addEventListener('click', () => {
    todayButton.classList.remove('active');
    last3DaysButton.classList.add('active');
    last7DaysButton.classList.remove('active');
    last15DaysButton.classList.remove('active');
    customRangeButton.classList.remove('active');
    updateTable();
});

last7DaysButton.addEventListener('click', () => {
    todayButton.classList.remove('active');
    last3DaysButton.classList.remove('active');
    last7DaysButton.classList.add('active');
    last15DaysButton.classList.remove('active');
    customRangeButton.classList.remove('active');
    updateTable();
});

last15DaysButton.addEventListener('click', () => {
    todayButton.classList.remove('active');
    last3DaysButton.classList.remove('active');
    last7DaysButton.classList.remove('active');
    last15DaysButton.classList.add('active');
    customRangeButton.classList.remove('active');
    updateTable();
});

customRangeButton.addEventListener('click', () => {
    todayButton.classList.remove('active');
    last3DaysButton.classList.remove('active');
    last7DaysButton.classList.remove('active');
    last15DaysButton.classList.remove('active');
    customRangeButton.classList.add('active');
    updateTable();
});

/*renderiza e faz as atualizações, na div criada no html */

const updateTable = () => {
    tableBody.innerHTML = '';
    loadingMessage.style.display = 'block';
    noRecordsMessage.style.display = 'none';

    /*depois do operador escolhido antes tem uma busca simulanda por 2 sgundos. */
    
    setTimeout(() => {
        const recordsToDisplay = filteredOperator
            ? allRecords.filter(record => record.nomeOperador === filteredOperator)
            : allRecords.slice(0, initialRecordsCount);
        
        recordsToDisplay.forEach(registro => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style=" padding: 5px 5px;">${registro.data_inicio.substr(0, 10)}</td>
                <td style=" padding: 5px 5px;">${registro.data_inicio.substr(11, 5)}</td>
                <td style=" padding: 5px 5px;">${registro.nomeOperador}</td>
                <td style=" padding: 5px 5px;">${registro.numero_de_origem}</td>
                <audio controls>
                <source src="${registro.url_do_audio}" type="audio/mpeg">
                Seu navegador não suporta a reprodução de áudio.
            </audio>
            `;
            tableBody.appendChild(row);
        });

        loadingMessage.style.display = 'none';
        if (filteredOperator && recordsToDisplay.length === 0) {
            noRecordsMessage.style.display = 'block';
        }
    }, 2000);
};

fetch('/Api/dados_chamadas_gravadas.json') 
    .then(response => response.json())
    .then(data => {
        allRecords = data.registros.slice().reverse();
        updateTable();
    })
    .catch(error => console.error('Erro:', error));







  
// Função para formatar datas no formato desejado

const formatDate = () => {
    const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
    return new Date().toLocaleDateString('pt-BR', options);
};



// Atualizar o intervalo de datas dinamicamente
const updateDateRange = () => {
    const displayedDates = tableBody.querySelectorAll('tr td:first-child');
    
    if (displayedDates.length > 0) {
        const startDate = formatDate(displayedDates[0].textContent);
        const endDate = formatDate(displayedDates[displayedDates.length - 1].textContent);
        const dateRangeElement = document.getElementById('date-range');
        dateRangeElement.textContent = `${startDate} à ${endDate}`;
    }
};

// Chame a função sempre que a tabela for atualizada
const observer = new MutationObserver(updateDateRange);
observer.observe(tableBody, { childList: true });

// Chame a função inicialmente para exibir o intervalo de datas atual
updateDateRange();



