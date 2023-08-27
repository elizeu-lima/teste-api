/*Bonus fechar pagina */

var fecharBotao = document.getElementById("fecharPagina");

fecharBotao.addEventListener("click", function() {
  
  window.close();
});






/*Exibir 3 ultimos atendimentos */

const atendimentosContainer = document.getElementById('atendimentos');
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