import dados from '/scripts/padrao_paginas.js';

// Importa utilitários
import { formatarClasse, formatarTitulo, formatarCPF } from '/scripts/utils/formatadores.js';
import { cartaoViagemCompleto, itemReservaCompleto } from '/scripts/utils/templates.js';

// Carregar popup de edição
import popup_editar_informacoes from '/scripts/elements/popup_editar_informacoes.js';
document.body.insertAdjacentHTML('beforeend', popup_editar_informacoes);

// Cria listeners e funções do popup de edição
import { listenersPopup, abrirPopup } from '/scripts/functions/funcao_criar_popup_edicao.js';
listenersPopup();


// Cria os cartões de cada viagem
const chavesNomesViagens = dados.chavesNomesViagens;
const conteinerCartoes = document.querySelector('.cartoes');
conteinerCartoes.innerHTML = '';

chavesNomesViagens.forEach(viagem => {
    const cartao = document.createElement('div');
    cartao.classList = 'cartao viagem ' + formatarClasse(viagem);
    cartao.id = formatarClasse(viagem);
    cartao.setAttribute('data-viagem-chave', viagem);
    cartao.setAttribute('data-viagem-chave-original', viagem + ' - ' + dados.dadosViagens[viagem].data);

    let numNovasReservas = 0;
    let numAtrasado = 0;
    let numPendente = 0;

    // Cria os itens (viajante) dentro do cartão
    let itens = '';
    const dadosItens = dados.dadosViagens[viagem].dados;
    Object.values(dadosItens).forEach(item => {

        let status = '';

        if (item['Cobrança Realizada?'] === 'FALSE') {
            numNovasReservas++;
            status = 'Novo';
        }
        else {
            if (item['Status Pagamento'] === 'Atrasado') numAtrasado++;
            if (item['Status Pagamento'] === 'Pendente') numPendente++;
            status = item['Status Pagamento'];
        }

        itens += itemReservaCompleto(
            formatarClasse(status), 
            item['Nome Completo'], 
            status, 
            formatarCPF(item['CPF']));
    })

    // Cria o cartão HTML
    cartao.innerHTML = cartaoViagemCompleto(
        formatarTitulo(viagem), 
        dados.dadosViagens[viagem].data, 
        numNovasReservas, numAtrasado, numPendente, 
        itens);

    conteinerCartoes.appendChild(cartao);
});


// Cria eventos de abrir e fechar cartões
const cartoes = document.querySelectorAll('.cartao.viagem');
cartoes.forEach(cartao => {
    const conteudoCartao = cartao.querySelector('.conteudo')
    const botaoAbrirFechar = cartao.querySelector('.btn-abrir-fechar-cartao');

    botaoAbrirFechar.addEventListener('click', () => {
        botaoAbrirFechar.classList.toggle('rotacao-180');
        conteudoCartao.classList.toggle('conteudo-aberto');
    })
})


// Atualiza selos de pagamentos em cada cartão
const selos = document.querySelectorAll('.cartao .selo');
selos.forEach(selo => {
    if(selo.textContent === '0') selo.classList.add('oculto');
})


// Cria os eventos referentes ao popup
document.querySelector('.cartoes').addEventListener('click', (e) => abrirPopup(e, dados))


// Foco se usuário tiver clicado em cartão no início
const url = new URLSearchParams(window.location.search);

if (url.has('cartao')) {
    const viagem = url.get('cartao');
    const id = '#' + viagem;

    setTimeout(() => {
        window.location.href = id;

        const conteudoCartao = document.querySelector(`${id} .conteudo`)
        const botaoAbrirFechar = document.querySelector(`${id} .btn-abrir-fechar-cartao`);

        botaoAbrirFechar.classList.add('rotacao-180');
        conteudoCartao.classList.add('conteudo-aberto');
    }, 100)
}
