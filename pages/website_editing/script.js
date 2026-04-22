// Elementos
import { cardTrip, screenButtons, getInputs } from '/scripts/elements/el_editar_site.js';


// Telas
const screens = document.querySelectorAll('.screen')


// Funções gerais
function toggleScreen(el, focus, title, legend) {
    screens.forEach(s => s.classList.add('hidden'))
    el.classList.toggle('hidden');

    if (focus) focus.focus()

    if (title) document.querySelector('#title').innerHTML = `<h1>${title}</h1>`;
    if (legend) document.querySelector('#title').innerHTML += `<span class="legend">${legend}</span>`;
}

const data = [{
    id: 5,
    data_inicio: '2026-07-03',
    roteiro: {
        nome: 'Chachoeiras Trip',
        locais: [
            { nome: 'Foz do Iguaçu' },
            { nome: 'Puerto Iguaçú (Argentina)' },
            { nome: 'Paraguai' }
        ]
    }
}]

// Carregamento da página

// Criar cards
const itineraryList = document.querySelector('#itinerary-list');

data.forEach(d => {
    const title = d.roteiro.nome;
    const itinerary = d.roteiro.locais.map(l => l.nome).join(' + ');
    const date = d.data_inicio.split('-').reverse().join('/');

    const card = cardTrip(1, title, itinerary, date);
    itineraryList.insertAdjacentHTML('afterBegin', card);
})

// Listeners

// !------------- Criar listeners dos cards

// Botão novo roteiro
document.querySelector('#btn-new-itinerary').addEventListener('click', () => {
    const selectTypeItinerary = document.querySelector('#screen-select-type-itinerary');
    toggleScreen(selectTypeItinerary, false, 'Novo roteiro', 'Selecione como criar um novo roteiro.');
});

// TELA 2
// Botão roteiro em branco
document.querySelector('#btn-new-itinerary-blank').addEventListener('click', () => {
    const formFirstScreen = document.querySelector('form fieldset[data-screen="0"]');
    toggleScreen(formFirstScreen, false, 'Novo roteiro')
});

// Botão copiar roteiro
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Formulário
const form = document.querySelector('#itinerary-form');

// Cria os botões e adiciona os ids dos alvos
const formScreens = form.querySelectorAll('fieldset');
for (let i = 0; i < formScreens.length; i++) {
    let btnOne = i === 0 ? 'disabled' : '';
    let btnTwo = i === formScreens.length - 1 ? 'disabled' : '';

    formScreens[i].insertAdjacentHTML('beforeend', screenButtons(btnOne, i - 1, btnTwo, i + 1));
}

// Seleciona os botões criados e adiciona listeners
const buttonsScreens = form.querySelectorAll('.buttons-toggle-screen button');
buttonsScreens.forEach(b => {
    b.addEventListener('click', () => {

        const target = b.getAttribute('data-target-screen');

        // Desnecessário - Verifica se todos os campos estão preenchidos
        // if (b.className === 'next-btn') {
        //     const currentId = Number(target) - 1;
        //     const fieldset = form.querySelector(`fieldset[data-screen="${currentId}"]`);

        //     const inputs = fieldset.querySelectorAll('input[required], select[required], textarea[required]');
        //     for (const input of inputs) {
        //         if (!input.value.trim()) {
        //             alert('Por favor, preencha todos os campos obrigatórios.');
        //             return;
        //         }
        //     }
        // }

        const fieldsetTarget = form.querySelector(`fieldset[data-screen="${target}"]`);
        toggleScreen(fieldsetTarget, fieldsetTarget.querySelector('legend'));
    });
});


// Adiciona listener aos botões de cancelar
const cancelButtons = document.querySelectorAll('.cancel-form');
cancelButtons.forEach(b => {
    b.addEventListener('click', () => {
        window.location.reload();
    })
})


// Botões de adicionar inputs
const btnsAddInputs = document.querySelectorAll('.btn-new-input');
btnsAddInputs.forEach(b => b.addEventListener('click', () => addInputs(b, b.getAttribute('data-type'))));

function addInputs(element, type) {
    // O length sempre retorna 1 número a mais
    const numberInput = document.querySelectorAll(`.${type}`).length;
    element.insertAdjacentHTML('beforebegin', getInputs(type, numberInput));
}


// Campos numéricos monetários

const inputMoney = document.querySelectorAll('input[data-type="money"]');

inputMoney.forEach(i => {
    i.addEventListener('input', (e) => {
        let value = e.target.value;

        // Remove tudo que não for número
        value = value.replace(/\D/g, '');

        // Converte para número decimal
        value = (Number(value) / 100).toFixed(2);

        // Formata como moeda brasileira
        value = value
            .replace('.', ',')
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        e.target.value = 'R$ ' + value;
    })
})


// Salvar dados
form.addEventListener('submit', e => {
    e.preventDefault();

    // Verificar se inputs obrigatórios estão preenchidos
    const formScreens = form.querySelectorAll('fieldset');
    for (const screen of formScreens) {
        const target = screen.getAttribute('data-screen');
        const inputsRequired = screen.querySelectorAll('[data-required="true"]');

        for (const input of inputsRequired) {
            if (!input.value.trim()) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                const field = form.querySelector(`fieldset[data-screen="${target}"]`);
                toggleScreen(field, field.querySelector('legend'));
                input.focus()
                return;
            }
        }
    }

    // Selecionar inputs
    const inputs = form.querySelectorAll('input, textarea, select')
    let formData = {};
    inputs.forEach(input => {
        formData[input.id] = input.value;
    })

    console.log(formData)

    // Criar nova viagem

    // async function atualizar() {
    //     const { data, error } = await supabase
    //     .from('viagens')
    //     .insert([
    //         {
    //             data_inicio: '2026-03-15',
    //             data_fim: '2026-03-20',
    //             vagas_total: 50,
    //             status_id: 1,
    //             valor_desconto: 0
    //         }
    //     ])
    //     console.log(data, error)
    // }
    console.log('Atualizado')
})
