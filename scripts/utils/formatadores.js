export function formatarClasse(texto) {
    return texto
        .toLowerCase()
        .trim()
        .normalize('NFD')                 // separa letra + acento
        .replace(/[\u0300-\u036f]/g, '')  // remove apenas os acentos
        .replace(/\s+/g, '-')             // espaços → hífen
        .replace(/[^a-z0-9-]/g, '');      // remove caracteres inválidos
}


export function formatarTitulo(texto) {
    return texto
        .trim()
        .split(' ')
        .map(palavra => {
            if (palavra.length > 2) {
                return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
            }
            return palavra.toLowerCase();
        }).join(' ');
}


export function formatarCPF(texto) {
    texto = String(texto);
    return texto.replace(/\D/g, '');
}


function formt(texto) {
    return texto.replace(/\s/g, '-')
}

function retirarHifens(texto) {
    return texto.replace(/-/g, ' ')
}

function limparTudo(texto) {
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '');
}