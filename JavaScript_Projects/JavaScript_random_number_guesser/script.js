let form = document.querySelector('form');
let input = document.querySelector('#inputnum');
let userGuesses = document.querySelector('.guessed_num');
let result = document.querySelector('.result');
let rem = document.querySelector('.rem')
let play = true;
form.addEventListener('submit', () => {
    let num = input.value;
    let randomNum = Math.floor(Math.random() * 100) + 1;
    startGame();
    validateGuess
})

function validateGuess(guess){

}
function checkGuess(guess){

}
