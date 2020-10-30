let buttonAdd = document.querySelector('#add-element');
let modal = document.querySelector('#modal');
let button = document.querySelector('#modal__button');

buttonAdd.addEventListener('click', function(){
    modal.classList.toggle('modal--open');
});

button.addEventListener('click', function(){
    modal.classList.toggle('modal--open');
});
