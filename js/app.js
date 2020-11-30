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
            displayCard(rawData.data.sprites.other['official-artwork'].front_default, 
                        rawData.data.id, rawData.data.name, 
                        rawData.data.base_experience,  
                        rawData.data.types[0].type.name);   
                        
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

const background_colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#F4E7DA',
    rock: '#D5D5D4',
    fairy: '#FCEAFF',
    poison: '#98D7A5',
    bug: '#F8D5A3',
    dragon: '#97B3E6',
    psychic: '#EAEDA1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}

let count = 0;

const displayCard = (url, attibuteId, attibuteName, attibuteExperience, attibuteType) => {

    document.getElementById('back-pokemons').disabled = false;
    const color = background_colors[attibuteType];

    let card = document.createElement('div');
    card.className = 'card container';
    card.id = 'card-' + count;
    card.style.background = color;
    const mainBody = document.getElementById('container-card');
    mainBody.appendChild(card);

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.id = 'card-body-' + count;
    const mainCard = document.getElementById('card-' + count);
    mainCard.appendChild(cardBody);

    const imgContainer = document.createElement('div');
    imgContainer.className = 'img-container';
    imgContainer.id = 'img-container-' + count;
    // obtener elemento del DOM
    const divBody = document.getElementById('card-body-' + count);
    divBody.appendChild(imgContainer);

    // crear nodo tipo img
    const imgElement = document.createElement('img');
    // agregar atributos
    imgElement.className = 'img-pokemon';
    imgElement.id = 'img-pokemon-' + count;
    imgElement.setAttribute('src', url);
    const divContainerImg = document.getElementById('img-container-' + count);
    divContainerImg.appendChild(imgElement);
    
    const orderPokemon = document.createElement('h5');
    orderPokemon.innerHTML = 'Id: ' + attibuteId;
    orderPokemon.className = 'order-pokemon';
    orderPokemon.id = 'order-pokemon-' + count;

    const title = document.createElement('h4');
    title.innerHTML = 'Name: ' + attibuteName;
    title.id = 'title' + count;

    const textType = document.createElement('p');
    textType.innerHTML = 'Type: ' + attibuteType;
    textType.id = 'text-type-' + count; 
    textType.className = 'text-type'; 

    const textExperience = document.createElement('p');
    textExperience.innerHTML = 'Base Experience: ' + attibuteExperience;
    textExperience.id = 'text-experience-' + count;
    textExperience.className = 'text-experience'; 

    // agregar el nodo al div
    divBody.appendChild(orderPokemon);
    divBody.appendChild(title);
    divBody.appendChild(textType);
    divBody.appendChild(textExperience);

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