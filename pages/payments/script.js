import dados from '/scripts/padrao_paginas.js';

// Importa utilitários
import { formatarTitulo, formatarClasse } from '/scripts/utils/formatadores.js';
import { mensagemWhatsappPagamento } from '/scripts/utils/mensagens_whatsapp.js'; 

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
    const clientesPagamento = [];
    
    Object.keys(dadosViagem).forEach(pessoa => {
        const dadosPessoa = dadosViagem[pessoa];
        if (dadosPessoa['Cobrança Realizada?'] === 'TRUE' && (dadosPessoa['Status Pagamento'] === 'Pendente' || dadosPessoa['Status Pagamento'] === 'Atrasado')) {
            clientesPagamento.push({
                'cpf': pessoa,
                'nome': dadosPessoa['Nome Completo'],
                'telefone': dadosPessoa['Telefone'],
                'forma-pagamento': dadosPessoa['Forma de Pagamento'],
                'status-pagamento': dadosPessoa['Status Pagamento']
            })
        }
    });

    // Se não houver pagamentos atrasados ou pendentes, retorna
    if(clientesPagamento.length === 0) return;
    
    const nomeViagem = formatarTitulo(chave);
    const data = dados.dadosViagens[chave].data;
    const dataFormatada = data.replace('.', '/');

    let itens = '';

    clientesPagamento.forEach(r => {

        let nome = r['nome'].trim();

        const formaPagamento =  r['forma-pagamento'].trim();
        const statusPagamento = r['status-pagamento'].trim();

        const linkWhatsapp = mensagemWhatsappPagamento(r.telefone, nome, nomeViagem, dataFormatada, formaPagamento, statusPagamento);

        let botaoWhatsapp = `class="btn-whatsapp" href="${linkWhatsapp}"`;
        if (!linkWhatsapp) botaoWhatsapp = 'class="btn-whatsapp desabilitado"';

        if(nome.length > 25) nome = nome.slice(0, 25) + '...';

        itens +=
            `<div data-cpf="${r['cpf']}" data-viagem="${chave}" class="item ${formatarClasse(statusPagamento)}">
                <span class="nome">${nome}</span>
                <span class="status">${statusPagamento}</span>
                <a ${botaoWhatsapp} target="_blank" rel="noopener noreferrer"><i class="fi fi-brands-whatsapp"></i></a>
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