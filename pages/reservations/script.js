import dados from '/scripts/padrao_paginas.js';

// Importa utilitários
import { formatarTitulo } from '/scripts/utils/formatadores.js';
import { mensagemWhatsappNovaReserva } from '/scripts/utils/mensagens_whatsapp.js'; 

// Carregar popup de edição
import popup_editar_informacoes from '/scripts/elements/popup_editar_informacoes.js';
document.body.insertAdjacentHTML('beforeend', popup_editar_informacoes);

// Cria listeners e funções do popup de edição
import { listenersPopup, abrirPopup } from '/scripts/functions/funcao_criar_popup_edicao.js';
listenersPopup();


// Cria os elementos de cartões
const cartoes = document.querySelector('.cartoes');
let conteudo = '';

dados.chavesNomesViagens.forEach(chave => {

    const dadosViagem = dados.dadosViagens[chave].dados;
    const novasReservas = [];
    
    Object.keys(dadosViagem).forEach(pessoa => {
        if (dadosViagem[pessoa]['Cobrança Realizada?'] === 'FALSE') {
            novasReservas.push({
                // 'chave-viagem': chave,
                'cpf': pessoa,
                'nome': dadosViagem[pessoa]['Nome Completo'],
                'telefone': dadosViagem[pessoa]['Telefone'],
                'forma-pagamento': dadosViagem[pessoa]['Forma de Pagamento']
            })
        }
    });

    // Se não houver novas reservas, retorna
    if(novasReservas.length === 0) return;
    
    const nomeViagem = formatarTitulo(chave);
    const data = dados.dadosViagens[chave].data;
    const dataFormatada = data.replace('.', '/');

    let itens = '';


    novasReservas.forEach(r => {

        let nome = r['nome'].trim();

        const formaPagamento =  r['forma-pagamento'].trim();

        const linkWhatsapp = mensagemWhatsappNovaReserva(r.telefone, nome, nomeViagem, dataFormatada, formaPagamento);

        if(nome.length > 25) nome = nome.slice(0, 25) + '...';

        itens +=
            `<div data-cpf="${r['cpf']}" data-viagem="${chave}" class="item">
                <span class="nome">${nome}</span>
                <a class="btn-whatsapp" href="${linkWhatsapp}" target="_blank" rel="noopener noreferrer"><i class="fi fi-brands-whatsapp"></i>Mensagem</a>
                <i class="flecha fi fi-rr-angle-right"></i>
            </div>`;
    })

    const chaveOriginal = chave + ' - ' + data;
    const tituloViagem = nomeViagem + ' - ' + dataFormatada;

    conteudo += 
        `<div class="viagem" data-viagem-chave="${chave}" data-viagem-chave-original="${chaveOriginal}">
            <div class="titulo-viagem"><i class="fi fi-rr-plane-alt"></i><span>${tituloViagem}</span></div>
            <div class="cartao">
                ${itens}
            </div>
        </div>`;
})

cartoes.innerHTML = conteudo;


// Cria os eventos de abrir popup
document.querySelector('.cartoes').addEventListener('click', (e) => abrirPopup(e, dados))
