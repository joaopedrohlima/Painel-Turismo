import dados from '/scripts/padrao_paginas.js';

console.log(dados)

// Carrega formatadores
import { formatarClasse } from '/scripts/utils/formatadores.js';

// Atualizar número de novas reservas
let numNovasReservas = 0;

dados.chavesNomesViagens.forEach(chave => {
    Object.keys(dados.dadosViagens[chave].dados).forEach(pessoa => {
        if (dados.dadosViagens[chave].dados[pessoa]['Cobrança Realizada?'] === 'FALSE') {
            numNovasReservas++;
        } 
    });
});
if (numNovasReservas > 0) {
    const cartaoReservas = document.querySelector('#reservas .cartao')
    const spanNumeroNovasReservas = cartaoReservas.querySelector('span')
    spanNumeroNovasReservas.textContent = numNovasReservas
    spanNumeroNovasReservas.textContent += numNovasReservas > 1 ? ' novas reservas' : ' nova reserva';

    cartaoReservas.classList.add('destaque')
}

// Atualizar cartões viagem
const conteinerCartoes = document.querySelector('#proximas-viagens .cartoes');
conteinerCartoes.innerHTML = '';
const chavesNomesViagens = dados.chavesNomesViagens;

// Data atual
const mesAtual = new Date().getMonth() + 1;
const anoAtual = new Date().getFullYear();

chavesNomesViagens.forEach(chave => {

    // Verificação de data
    const dataViagem = dados.dadosViagens[chave].data.replace('.', '/');
    const arrayDataViagem = dataViagem.split('/');
    const mesViagem = Number(arrayDataViagem[0]);
    const anoViagem = Number(arrayDataViagem[1]);

    if (anoViagem < anoAtual || mesViagem < mesAtual) return;

    // Cria o cartão
    const cartao = document.createElement('a');
    cartao.classList = 'cartao';
    cartao.href = `/pages/trips/index.html?cartao=${encodeURIComponent(formatarClasse(chave))}`;
    cartao.style.order = mesViagem;

    // Definir selos
    let seloNovaReserva = false;
    let seloPagAtrasado = false;
    let seloPagPendente = false;
    const dadosCartao = dados.dadosViagens[chave].dados;
    Object.values(dadosCartao).forEach(pessoa => {
        if (pessoa['Cobrança Realizada?'] === 'FALSE') seloNovaReserva = true;
        if (pessoa['Status Pagamento'] === 'Atrasado') seloPagAtrasado = true;
        if (pessoa['Status Pagamento'] === 'Pendente') seloPagPendente = true;
        if (seloNovaReserva && seloPagAtrasado && seloPagPendente) return;
    })

    cartao.innerHTML = cartaoViagem(chave, dataViagem, seloNovaReserva, seloPagAtrasado, seloPagPendente);
    conteinerCartoes.appendChild(cartao);
});


let numeroPagamentos = {
    Pendente: 0,
    Atrasado: 0
}

chavesNomesViagens.forEach(chave => {
    const viagem = dados.dadosViagens[chave].dados;
    Object.values(viagem).forEach(pessoa => {
            if(pessoa['Status Pagamento'] === 'Pendente') numeroPagamentos.Pendente++;
            if(pessoa['Status Pagamento'] === 'Atrasado') numeroPagamentos.Atrasado++;      
    })
});

criarBanner('Pendente');
criarBanner('Atrasado');

// Número de usuários pendentes
function criarBanner(nomeBanner) {
    const spanNumeroBanner = document.querySelector(`#pagamentos .${nomeBanner} .numero-pagamento`);
    spanNumeroBanner.textContent = numeroPagamentos[nomeBanner];
}


// Elementos:

// Cartão
function cartaoViagem(nomeViagem, data, seloNovaReserva, seloPagAtrasado, seloPagPendente) {
    let selos = '';
    if (seloNovaReserva) selos += '<span class="selo nova-reserva"><i class="fi fi-rr-form"></i></span>';
    if (seloPagAtrasado) selos += '<span class="selo pagamento-atrasado"><i class="fi fi-rr-usd-circle"></i></span>';
    if (seloPagPendente) selos += '<span class="selo pagamento-pendente"><i class="fi fi-rr-usd-circle"></i></span>';

    return `
        <h2>${formatarPrimeiraLetraMaiuscula(nomeViagem)}</h2>
        ${selos}
        <span class="data">${data}</span>`;
}


// Formatadores de texto
function formatarPrimeiraLetraMaiuscula(texto) {
    return texto
        .split(' ')
        .map(palavra => {
            if (palavra.length > 2) {
                return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
            }
            return palavra.toLowerCase();
        }).join(' ');
}