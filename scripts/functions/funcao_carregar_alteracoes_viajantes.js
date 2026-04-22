// Carrega no início da página
export function carregarAlteracoesViajantes() {

    // Seleciona elementos HTML
    const popup = document.querySelector('#popup-alteracoes');
    const telaCarregando = document.querySelector('#tela-carregando');

    // Se houver dados, mostra o popup
    mostrarPopupAlteracoes();

    // Adiciona eventos listener aos itens
    // Botão desfazer
    popup.querySelector('#popup-btn-desfazer').addEventListener('click', () => {
        popup.classList.add('oculto');
        localStorage.removeItem('dadosSalvos');
    });

    // Botão publicar
    popup.querySelector('#popup-btn-publicar').addEventListener('click', async () => {

        const dadosSalvos = JSON.parse(localStorage.getItem('dadosSalvos'));
        telaCarregando.classList.remove('oculto');

        try {
            // const res = await fetch('', {
            //     method: "POST",
            //     body: JSON.stringify(dadosSalvos)
            // });

            // if (!res.ok) throw new Error('Erro na requisição');

            // const retorno = await res.json();

            // if (!retorno.sucesso) {
            //     throw new Error(retorno.erro || 'Erro desconhecido');
            // }

            // SUCESSO
            telaCarregando.classList.add('oculto');
            mostrarMensagem('Alterações publicadas com sucesso!', 'A página será atualizada.');

            localStorage.removeItem('dadosSalvos');
            localStorage.setItem('recarregarDados', true);

            setTimeout(() => location.reload(), 3000);

        } catch (err) {
            console.error(err);

            telaCarregando.classList.add('oculto');
            mostrarMensagem('Erro ao publicar alterações', 'A página será recarregada.');
        }
    });

    function mostrarMensagem(texto, legenda) {
        const main = document.querySelector('main .cartoes');
        main.innerHTML = `<div class="cartao mensagem-feedback">${texto}<span class="legenda">${legenda}</span></div>`;
    };
};


export function mostrarPopupAlteracoes() {
    const popup = document.querySelector('#popup-alteracoes');
    const dadosSalvos = JSON.parse(localStorage.getItem('dadosSalvos'));
    if(dadosSalvos) {
        const stringAlteracoes = dadosSalvos.length + ' ' + (dadosSalvos.length === 1 ? 'alteração' : 'alterações');
        popup.querySelector('#numero-alteracoes').textContent = stringAlteracoes;
        popup.classList.remove('oculto');
    } 
};
