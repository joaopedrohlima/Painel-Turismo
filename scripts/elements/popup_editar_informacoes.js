export default
    `<dialog class="popup-reserva">
        <div class="dialog-content">
            <div class="barra-superior" id="popup-edicao-superior" tabindex="-1">
                <div class="botao" id="btn-ativar-edicao" data-habilitado="false">
                    <i class="fi fi-rr-pencil"></i>
                    <span>Ativar edição</span>
                </div>
                <div class="botao" id="btn-mostrar-campos-ocultos" data-habilitado="false">
                    <i class="fi fi-rr-eye"></i>
                    <span>Mostrar ocultos</span>
                </div>
                <div class="icon-fechar"><i class="fi fi-rr-cross"></i></div>
            </div>
            
            <div class="cabecalho">
                <div class="img-perfil"><i class="fi fi-rr-circle-user"></i></div>
                <div class="informacoes">
                    <h2 id="nome" class="dado" data-chave="Nome Completo"></h2>
                    <span class="dado" data-chave="Cidade" id="cidade"></span>
                </div>
            </div>

            <div class="conteudo"></div>

            <div class="botoes" id="botoes-visualizacao">
                <a class="botao whatsapp" id="btn-whatsapp" target="_blank" rel="noopener noreferrer"><i class="fi fi-brands-whatsapp"></i>Abrir contato</a>
                <a class="botao mensagem" id="btn-mensagem-reserva" target="_blank" rel="noopener noreferrer"><i class="fi fi-brands-whatsapp"></i>Mensagem de nova reserva</a>
                <a class="botao mensagem" id="btn-mensagem-pagamento" target="_blank" rel="noopener noreferrer"><i class="fi fi-brands-whatsapp"></i>Mensagem de pagamento</a>
            </div>  
            
            <div class="botoes oculto" id="botoes-edicao">
                <button class="botao descartar-alteracoes" id="btn-descartar" type="button"><i class="fi fi-rr-trash"></i>Descartar alterações</button>
                <button class="botao salvar" id="btn-salvar" type="button"><i class="fi fi-rr-disk"></i></i>Salvar</button>
            </div>
        </div>
    </dialog>
    
    <section id="mensagem-feedback" class="oculto">Concluído com sucesso!</section>`;
