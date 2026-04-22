import { formatarClasse, formatarTitulo } from '/scripts/utils/formatadores.js';
import { mostrarPopupAlteracoes } from '/scripts/functions/funcao_carregar_alteracoes_viajantes.js';
import { numeroWhatsapp, mensagemWhatsappNovaReserva, mensagemWhatsappPagamento } from '/scripts/utils/mensagens_whatsapp.js'; 

// Campos que serão criados
const camposInput = [
    {
        titulo: 'Viagem',
        icone: 'fi fi-rr-plane-alt',
        campos: ['Roteiro', 'Data', 'Local de Embarque']
    },
    {
        titulo: 'Informações Pessoais',
        icone: 'fi fi-rr-user',
        campos: ['Data de Nascimento', 'Telefone']
    },
    {
        titulo: 'Documentos',
        icone: 'fi fi-rr-document',
        campos: ['CPF']
    },
    {
        titulo: 'Pagamento',
        icone: 'fi fi-rr-usd-circle',
        campos: ['Forma de Pagamento']
    }
];

const campoSelect = {
    titulo: 'Status Pagamento',
    opcoes: ['Em dia', 'Atrasado', 'Pendente', 'Cancelado', 'FREE', 'CANCELADO', '']
};

const camposCheckbox = [ 'Cobrança Realizada?', 'Pago' ];

const campoTextArea = {
    titulo: 'Observações',
    icone: 'fi fi-rr-edit',
    campo: 'Observações'
};


// Variável global para salvamento temporário de informações de viajante
let itensEditadosViajantes = {};


// Listeners internos do popup
export function listenersPopup() {
    const popup = document.querySelector('.popup-reserva');

    // Listener do botão de fechar do popup
    document.querySelector('.popup-reserva .icon-fechar').addEventListener('click', fecharPopup);


    // Listener do botão de mostrar/ocultar campos
    const botaoAtivarCamposOcultos = popup.querySelector('#btn-mostrar-campos-ocultos');
    botaoAtivarCamposOcultos.addEventListener('click', () => {

        botaoAtivarCamposOcultos.dataset.habilitado = String(botaoAtivarCamposOcultos.dataset.habilitado !== 'true')

        const span = botaoAtivarCamposOcultos.querySelector('span');
        const estado = botaoAtivarCamposOcultos.dataset.habilitado;

        span.textContent = estado === 'true' ? 'Ocultar campos' : 'Mostrar ocultos';
        
        popup.querySelectorAll('.campo-vazio').forEach(campo => campo.classList.toggle('oculto'));
    })


    // ----- Edição de formulário do popup -----


    const botaoAtivarEdicao = popup.querySelector('#btn-ativar-edicao');
    botaoAtivarEdicao.addEventListener('click', () => {

        if(botaoAtivarEdicao.dataset.habilitado === 'true') return;
        
        // Mudar permissão de readonly dos inputs e visual do botão
        permissaoEdicaoInputs(true);

        // Trocar botões para botões de edição
        trocarBotoes();
    })

    const camposEdicaoBloqueada = ['CPF', 'Roteiro', 'Data']

    function permissaoEdicaoInputs(permissao) {
        popup.querySelectorAll('.conteudo input, .conteudo textarea').forEach(input => {
            if(!camposEdicaoBloqueada.includes(input.dataset.chave)) input.readOnly = !permissao;
        })
        popup.querySelectorAll('.conteudo select, .conteudo input[type="radio"]').forEach(s => {
            s.disabled = !permissao;
        })

        botaoAtivarEdicao.dataset.habilitado = permissao;

        if(permissao) {
            botaoAtivarEdicao.querySelector('span').textContent = 'Edição ativada';
        } else {
            botaoAtivarEdicao.querySelector('span').textContent = 'Ativar edição';
        }
    }


    // Listener de "input" e "change" que salva em "itensEditadosViajante" quando um item for editado
    const conteudo = popup.querySelector('.conteudo');

    function registrarEdicao(e) {
        const campo = e.target;

        if (!campo.dataset.chave) return;

        itensEditadosViajantes[campo.dataset.chave] = campo.value;
    }

    conteudo.addEventListener('input', registrarEdicao);
    conteudo.addEventListener('change', registrarEdicao);

    // Botões de edição do popup
    const botoesVisualizacao = popup.querySelector('#botoes-visualizacao');
    const botoesEdicao = popup.querySelector('#botoes-edicao');

    // Botão descartar alterações
    document.querySelector('#btn-descartar').addEventListener('click', fecharPopup);

    // Botão salvar
    document.querySelector('#btn-salvar').addEventListener('click', () => {

        if(Object.keys(itensEditadosViajantes).length > 2) {
            // Salva os dados no localStorage
            const dadosSalvos = localStorage.getItem('dadosSalvos');
            let novosDados = [];
            if(dadosSalvos) novosDados = JSON.parse(dadosSalvos);

            novosDados.push(itensEditadosViajantes);
            localStorage.setItem('dadosSalvos', JSON.stringify(novosDados))

            // Carrega popup de alterações
            mostrarPopupAlteracoes();
        }

        fecharPopup();
    });

    // Funções gerais
    function fecharPopup() {
        popup.classList.remove('aberto');

        // Fecha o popup
        setTimeout(() => {
            popup.close()

            // Limpa o popup
            popup.querySelector('.conteudo').innerHTML = '';

            // Desbloqueia a rolagem da página
            document.body.style.overflow = '';

            // Limpa modificações na UX
            permissaoEdicaoInputs(false);

            // Força os botões inferiores a voltarem ao seu estado normal
            botoesVisualizacao.classList.remove('oculto');
            botoesEdicao.classList.add('oculto');

            // Limpa edições de visibilidade de campos ocultos
            botaoAtivarCamposOcultos.dataset.habilitado = 'false';
            botaoAtivarCamposOcultos.querySelector('span').textContent = 'Mostrar ocultos';

            // Limpa variável globlal
            itensEditadosViajantes = {};
        }, 400);
    }

    function trocarBotoes() {
        botoesVisualizacao.classList.toggle('oculto');
        botoesEdicao.classList.toggle('oculto');
    }
}


export function abrirPopup(e, dados) {
    const popup = document.querySelector('.popup-reserva');

    const item = e.target.closest('.item');
    if(!item) return;

    // Pega chaves de acesso
    const nomeViagem = item.closest('.viagem').dataset.viagemChave;
    const cpf = item.dataset.cpf;
    const chaveRoteiro = item.closest('.viagem').dataset.viagemChaveOriginal;

    // Salva informações principais em caso de edição
    itensEditadosViajantes['chave-roteiro'] = chaveRoteiro;
    itensEditadosViajantes['chave-cpf'] = cpf;

    // Pega informações do objeto dos dados e inclui informações da viagem
    const informacoes = {
        ...dados.dadosViagens[nomeViagem].dados[cpf],
        'Roteiro': formatarTitulo(nomeViagem),
        'Data': dados.dadosViagens[nomeViagem].data.replace('.', '/')
    };

    popup.querySelector('#nome').textContent = informacoes['Nome Completo'];
    popup.querySelector('#cidade').textContent = informacoes['Cidade'];

    let conteudo = '';

    // Campos input
    camposInput.forEach(secao => {
        conteudo += `<section><h3><i class="${secao.icone}"></i></i>${secao.titulo}</h3>`;

        secao.campos.forEach(campo => {

            // Cria o elemento
            let valor = informacoes[campo];
            valor = informacoes[campo] === 'TRUE' ? 'Sim' : valor;
            valor = informacoes[campo] === 'FALSE' ? 'Não' : valor;
            valor = informacoes[campo] === undefined ? '' : valor;

            // Se não houver conteúdo, oculta elemento
            let campoVazio = '';
            if(valor === '') campoVazio = 'campo-vazio oculto';

            conteudo += 
                `<span class="legenda ${campoVazio}">${campo}</span>
                <input type="text" data-chave="${campo}" value="${valor}" readonly class="${campoVazio}">`
        })
        if(secao['titulo'] !== 'Pagamento') conteudo += '</section>';
    })

    // Campos checkbox de pagamento
    camposCheckbox.forEach(campo => {
        let valor = informacoes[campo];

        let campoFalse = valor === 'FALSE' ? 'checked' : '';
        let campoTrue = valor === 'TRUE' ? 'checked' : '';

        conteudo +=
            `<span class="legenda">${campo}</span>
            <div class="true-false">
                <label><input type="radio" data-chave="${campo}" name="${campo}" value="FALSE" disabled ${campoFalse}>Não</label>
                <label><input type="radio" data-chave="${campo}" name="${campo}" value="TRUE" disabled ${campoTrue}>Sim</label>
            </div>`
    });

    // Campo select
    console.log(informacoes)
    let classe = formatarClasse(informacoes[campoSelect.titulo]);
    classe += informacoes[campoSelect.titulo] === '' ? 'campo-vazio oculto' : '';
    const titulo = campoSelect.titulo;

    const opcoes = campoSelect.opcoes
        .map(opcao => {
            const selecionado = informacoes[titulo] === opcao ? 'selected' : '';
            return `<option value="${opcao}" ${selecionado}>${opcao}</option>`;
        })
        .join('');

    conteudo += `
        <span class="legenda ${classe}">${titulo}</span>
        <select data-chave="${titulo}" class="${classe}" disabled>
            ${opcoes}
        </select>
    `;
    conteudo += '</section>';

    // Campo textArea
    conteudo += 
        `<section><h3><i class="${campoTextArea.icone}"></i></i>${campoTextArea.titulo}</h3>
        <textarea readonly data-chave="${campoTextArea.campo}">${informacoes[campoTextArea.campo]}</textarea></section>`;

    popup.querySelector('.conteudo').innerHTML = conteudo;

    // Atualiza botões Whatsapp
    if (numeroWhatsapp(informacoes['Telefone'])) {

        const numeroTelefone = informacoes['Telefone'];
        const nome = informacoes['Nome Completo'].trim();
        const tituloViagem = formatarTitulo(nomeViagem);
        const data = informacoes['Data'];
        const formaPagamento = informacoes['Forma de Pagamento'];
        const statusPagamento = informacoes['Status Pagamento'];
    
        popup.querySelector('#btn-whatsapp').href = numeroWhatsapp(numeroTelefone);
        popup.querySelector('#btn-mensagem-reserva').href = mensagemWhatsappNovaReserva(numeroTelefone, nome, tituloViagem, data, formaPagamento)
        popup.querySelector('#btn-mensagem-pagamento').href = mensagemWhatsappPagamento(numeroTelefone, nome, tituloViagem, data, formaPagamento, statusPagamento)
    }

    document.body.style.overflow = 'hidden';
    popup.showModal();
    
    popup.classList.add('aberto');

    document.activeElement.blur();
    document.querySelector('#popup-edicao-superior').focus(); 
}
