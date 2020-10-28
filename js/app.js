document.getElementById('back-pokemons').disabled = true;
document.getElementById('clean-pokemons').disabled = true;

function handleKeyPress(e){ 
    var key=e.keyCode || e.which; 
    if (key==13){ 
        retrievePokemon();
    } 
    document.getElementById('clean-pokemons').disabled = false;
}

const retrievePokemon = async () => {
    document.getElementById('clean-pokemons').disabled = false;
    
    const name = document.getElementById('pokemon-name').value.toLowerCase().trim('');
    let rawData = {};

    if (name) {
        try {
            rawData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            displayCard(rawData.data.sprites.front_default, rawData.data.order, rawData.data.name, 
                        rawData.data.base_experience,  rawData.data.types[0].type.name);   
                        
            const labelError =  document.getElementById('input-component-error');
            labelError.innerHTML = 'This is correct!';
            labelError.className = 'show-ok';  

        } catch (error) {
            const labelError =  document.getElementById('input-component-error');
            labelError.innerHTML = 'The process was invalid! ' +  error;
            labelError.className = 'show';

        }
    } else if (!name || name === ''){
        const labelError =  document.getElementById('input-component-error');
        labelError.innerHTML = 'The process was invalid!';
        labelError.className = 'show';
    }

}

/* const showStats = stats => {

} */

let count = 0;

const displayCard = (url, attibuteOrder, attibuteName, attibuteExperience, attibuteType) => {

    document.getElementById('back-pokemons').disabled = false;

    let card = document.createElement('div');
    card.className = 'card container';
    card.id = 'card-' + count;
    const mainBody = document.getElementById('container-card');
    mainBody.appendChild(card);

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.id = 'card-body-' + count;
    const mainCard = document.getElementById('card-' + count);
    mainCard.appendChild(cardBody);

    // crear nodo tipo img
    const imgElement = document.createElement('img');
    // agregar atributos
    imgElement.className = 'img-pokemon';
    imgElement.id = 'img-pokemon-' + count;
    imgElement.setAttribute('src', url);
    
    const orderPokemon = document.createElement('h5');
    orderPokemon.innerHTML = 'Order: ' + attibuteOrder;
    orderPokemon.id = 'order-pokemon-' + count;

    const title = document.createElement('h4');
    title.innerHTML = 'Name: ' + attibuteName;
    title.id = 'title' + count;

    const textExperience = document.createElement('p');
    textExperience.innerHTML = 'Base Experience: ' + attibuteExperience;
    textExperience.id = 'text-experience-' + count;

    const textOrder = document.createElement('p');
    textOrder.innerHTML = 'Order: ' + attibuteOrder;
    textOrder.id = 'text-order-' + count;

    const textType = document.createElement('p');
    textType.innerHTML = 'Type: ' + attibuteType;
    textType.id = 'text-type-' + count; 
    textType.className = 'text-type'; 

    const addPokemon = document.createElement('a');
    addPokemon.innerHTML = 'Add to Pokedex';
    addPokemon.id = 'add-pokemon-' + count; 
    addPokemon.className = 'add-pokemon'; 
    addPokemon.setAttribute('href', '*');

    // obtener elemento del DOM
    const divBody = document.getElementById('card-body-' + count);
    // agregar el nodo al div
    divBody.appendChild(imgElement);
    divBody.appendChild(orderPokemon);
    divBody.appendChild(title);
    divBody.appendChild(textExperience);
    divBody.appendChild(textType);
    divBody.appendChild(addPokemon);

    count++; 

}

const cleanForm = () => {
    document.getElementById('pokemon-name').value = '';

    const labelError =  document.getElementById('input-component-error');
    labelError.className = 'hide';

    document.getElementById('clean-pokemons').disabled = true;
}

const goBack = () => {
    cleanForm();

    let father = document.getElementById('container-card');

    if (father.hasChildNodes()) {
        while (father.childNodes.length >= 1){
            father.removeChild(father.firstChild);
        }
    }

    document.getElementById('back-pokemons').disabled = true;
}


window.onload = () => {
    document.getElementById('get-pokemons').addEventListener('click', retrievePokemon);
    document.getElementById('clean-pokemons').addEventListener('click', cleanForm);
    document.getElementById('back-pokemons').addEventListener('click', goBack);
}