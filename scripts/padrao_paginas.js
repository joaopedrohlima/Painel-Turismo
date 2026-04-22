// Cria o listener para recarregar a página
document.querySelector('header #btn-recarregar').addEventListener('click', () => {
    localStorage.setItem('recarregarDados', true);
    window.location.reload();
})

// Carregar popup de alterações
import popup_alteracoes_salvas from '/scripts/elements/popup_alteracoes_salvas.js';
document.body.insertAdjacentHTML('beforeend', popup_alteracoes_salvas);

// Verfica se existem dados de edição de viajantes não salvos
import { carregarAlteracoesViajantes } from '/scripts/functions/funcao_carregar_alteracoes_viajantes.js';
carregarAlteracoesViajantes();

// Carrega os dados do cache ou novos
import dados from '/scripts/functions/funcao_carregar_dados.js';

export default dados;
