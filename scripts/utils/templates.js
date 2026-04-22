export function cartaoViagemCompleto(titulo, data, numNovasReservas, numAtrasado, numPendente, itens) {
    return `
        <div class="titulo">
            <div class="info">
                <h1>${titulo}</h1>
                <span>${data}</span>
            </div>
            <span class="selo nova-reserva">${numNovasReservas}</span>
            <span class="selo pagamento-atrasado">${numAtrasado}</span>
            <span class="selo pagamento-pendente">${numPendente}</span>
            <div class="btn-abrir-fechar-cartao"><i class="fi fi-rr-angle-down"></i></div>
        </div>
        <div class="conteudo">
            <div class="cabecalho">
                <span class="cabecalhoEsquerda">Nome</span>
                <span class="cabecalhoDireita">Pagamento</span>
            </div>
            ${itens}
        </div>`
}

export function itemReservaCompleto(classe, nome, statusPagamento, cpf) {
    return `<div data-cpf="${cpf}" class="item ${classe}">
        <span class="nome">${nome}</span>
        <span class="status">${statusPagamento}</span>
    </div>`;
}
