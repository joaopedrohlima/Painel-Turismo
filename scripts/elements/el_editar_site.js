export function cardTrip(id, title, itinerary, date) {
    return `
        <div class="box card-trip" id="${id}">
            <span class="trip-name">${title}</span>
            <h2 class="title">${itinerary}</h2>
            <span class="date">${date}</span>
        </div>`
};

/*
export function cardTrip(title, itinerary, date) {
    return `
        <div class="box card-trip">
            <span class="trip-name">${title}</span>
            <h2 class="title">${itinerary}</h2>
            <span class="date">${date}</span>
            <div class="buttons">
                <button class="btn-edit">Editar</button>
                <button class="btn-copy">Copiar</button>
                <button class="btn-remove">Excluir</button>
            </div>
        </div>`
};
*/

export function screenButtons(btn1Disabled, btn1Number, btn2Disabled, btn2Number) {
    return `
        <div class="buttons-toggle-screen">
            <button ${btn1Disabled} type="button" class="previous-btn" data-target-screen="${btn1Number}">Anterior</button>
            <button ${btn2Disabled} type="button" class="next-btn" data-target-screen="${btn2Number}">Próximo</button>
        </div>
        <button type="button" class="cancel-form">Cancelar</button>
        <button type="submit">Salvar</button>`
};

export function getInputs(type, index) {
    const number = index + 1;
    const inputs = {
        'tourist-spot': 
            `<div class="tourist-spot" data-index="${index}">
                <h4>Destino ${number}</h4>
                <label for="tourist-spot-name-${index}">Nome do ponto turístico</label>
                <input id="tourist-spot-name-${index}" name="tourist_spot_name[${index}]" class="tourist-spot-name" type="text" placeholder="Ex: Cataratas do Iguaçu">
                <label for="tourist-spot-description-${index}">Descrição</label>
                <textarea id="tourist-spot-description-${index}" name="tourist_spot_description[${index}]" class="tourist-spot-description" placeholder="Ex: Passarelas e mirantes que levam você a poucos metros das quedas."></textarea>
            </div>`
    }
    return inputs[type];
}
