/*import { openDB } from 'https://unpkg.com/idb?module';

const INTERVALO_CACHE = 60; // Em minutos

const db = await openDB('excursaoIrmaosDB', 1, {
    upgrade(db) {
        // Conferir se o banco de dados não foi criado
        if (!db.objectStoreNames.contains('dados')) {
            db.createObjectStore('dados', { keyPath: 'id' });
        }
    }
})

const cache = await db.get('dados', 'cache');

const recarregarDados = localStorage.getItem('recarregarDados');
if (recarregarDados) {
    localStorage.removeItem('recarregarDados');
    await buscarNovosDados();
} 
else {
    if (!cache) {
        await buscarNovosDados();
    }
    else if (Date.now() - cache.dataCache.getTime() > 1000 * 60 * INTERVALO_CACHE) {
        await buscarNovosDados();
    }
}

const cacheAtualizado = await db.get('dados', 'cache');
const dadosCache = cacheAtualizado.conteudo;


async function buscarNovosDados() {
    db.put('dados', { id: 'cache', conteudo: await buscarDadosPlanilha(), dataCache: new Date() });
}*/

async function buscarDadosPlanilha() {
    const response = await fetch('/dados/dados.json');
    const dados = await response.json();
    console.log(dados)
    return dados;
}

const dadosCache = await buscarDadosPlanilha()


export default dadosCache;