let randomNumber = parseInt(Math.random()* 100 + 1);
const submit = document.querySelector("#subt");
const userInput = document.querySelector('#guessField');
const guessNum = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p')

let prevGuess = [] //array to keep a track of already guessed number
let numGuess = 1; //kitne guess user kar chuka hai
let PlayGame = true

if(PlayGame){
    submit.addEventListener('click', function(e){
        e.preventDefault()
        const guess = parseInt(userInput.value)
        validateGuess(guess)
    })
}

function validateGuess(guess){
    if(isNaN(guess)){
        alert('Please enter a valid number');
    }
    else if(guess < 1){
        alert('Please enter a number greater than 1');
    }
    else if(guess>100){
        alert('Please enter a number less than 100');
    }
    else{
        prevGuess.push(guess);
        if(numGuess===11){
            displayGuess(guess)
            displayMessage(`Game Over. Random number was ${randomNumber}`)
            endGame()
        }
        else{
            displayGuess(guess)
            checkGuess(guess)
        }
    }
}

function checkGuess(guess){
    if(guess === randomNumber){
        displayMessage(`You guesses it right`)
    }
    else if(guess < randomNumber){
        displayMessage(`Number is TOO Low`)
    }
    else if(guess > randomNumber){
        displayMessage(`Number is TOO High`)
    }
}

function displayGuess(guess){
    userInput.value=''
    guessNum.innerHTML += `${guess}, `
    numGuess++;
    remaining.innerHTML= `${11 - numGuess}`
}

function displayMessage(message){
    lowOrHi.innerHTML = `${message}`
}

function endGame(){
    userInput.value = '' //clear all the i/p by the user
    userInput.setAttribute('disabled', '') //setAttribute always works in key-value pair, hence we gave 2 values inside the bracket
    p.classList.add('button')
    p.innerHTML = `<h1 id="newGame">Start a new game</h1>`;
    startOver.appendChild(p)
    PlayGame = false;
    newGame()
}

function newGame(){
    const newGameButton = document.querySelector('#newGame')
    newGameButton.addEventListener('click', function(e){
        randomNumber = parseInt(Math.random()* 100 + 1);
        prevGuess= []
        numGuess = 1
        guessNum.innerHTML = ''
        remaining.innerHTML= `${11 - numGuess}`
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)
        PlayGame = true

    })
}