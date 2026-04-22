export function numeroWhatsapp(numero) {
    const numeroFormatado = formatarNumeroWhatsapp(numero);
    if(!numeroFormatado) return false;
    return 'https://wa.me/' + numeroFormatado;
}


export function mensagemWhatsappNovaReserva(numeroTelefone, nome, nomeViagem, data, formaPagamento) {
    const numero = formatarNumeroWhatsapp(numeroTelefone);
    if(!numero) return false;

    const mensagem = `Olá *${nome}*, ficamos felizes por você reservar uma viagem na *Trip Turismos*! Você reservou o roteiro *${nomeViagem}*, marcado para *${data}*. Sobre o pagamento, você optou pela forma de pagamento *${formaPagamento}*.`;
    
    return 'https://wa.me/' + numero + '?text=' + encodeURIComponent(mensagem);
}


export function mensagemWhatsappPagamento(numeroTelefone, nome, nomeViagem, data, formaPagamento, statusPagamento) {
    const numero = formatarNumeroWhatsapp(numeroTelefone);
    if(!numero) return false;

    const mensagem = `Olá *${nome}*, informamos que o status do pagamento para o roteiro *${nomeViagem}* (${data}) está *${statusPagamento.toUpperCase()}*. A forma de pagamento escolhida foi *${formaPagamento}*. Pedimos que acerte o valor restante o quanto antes para garantir uma viagem tranquila com a Trip Turismos.`;

    return 'https://wa.me/' + numero + '?text=' + encodeURIComponent(mensagem);
}


// Função para formatar número
function formatarNumeroWhatsapp(numero) {
    numero = String(numero);
    let nTel = numero.replace(/\D/g, '');

    if(!nTel || nTel.length < 10) return false;
    if(nTel && nTel.length === 10 || nTel.length === 11) nTel = '55' + nTel;
    return nTel;
}
