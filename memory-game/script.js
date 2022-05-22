let gameActive = false;
let cardClass;
let gameContainer = document.querySelector('#gameContainer');
const startGameButton = document.querySelector('#startGameButton');
///////////////////////////////////////////////////////////////////////////////// CREATE, DUPLICATE and MERGE ARRAYS
let animals = ['🐕', '🐈', '🐘', '🐁', '🐒', '🐅', '🐎', '🐪']
let animalsClone = [...animals];
animals = animals.concat(animalsClone);
///////////////////////////////////////////////////////////////////////////////// LOAD CARDS
shuffleCards()
loadCards()

function loadCards() {
    document.getElementById('gameCompleted').style.visibility = 'hidden';

    let renderCards = '';
    if(gameActive == false) {
        cardClass = "card flipped";
    } else {
        cardClass = "card";
    }

    animals.forEach(function (result) {
        (renderCards += `
            <div id="card" class="${cardClass}">
                <div class="cardFrontSide"></div>
                <div class="cardBackSide">${result}</div>
            </div>
        `); 
    }) 

    gameContainer.innerHTML = renderCards;
}
///////////////////////////////////////////////////////////////////////////////// SHUFFLE CARDS
function shuffleCards() {
    for (let i = animals.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        let temp = animals[i];
        animals[i] = animals[j];
        animals[j] = temp;
    }
}
///////////////////////////////////////////////////////////////////////////////// START THE GAME
let _initTime = Date.now()
let elapsedTime = 0;

function startGame() {
    if(gameActive == true) {
        gameActive = false;
        startGameButton.innerText = 'Start Game';
        loadCards()
    } else {
        gameContainer.innerHTML = '';
        startGameButton.style.display = 'none';
        gameActive = true;
        loadCards()
    }
    startTime() 
    document.getElementById('statsBoard').style.display = 'block';
}

function updateTime() {
    elapsedTime++
    startTime() 
    document.getElementById('statsBoard').innerHTML = `<b>Elapsed time in seconds:</b> ${elapsedTime}<br><b>Amount of tries:</b> ${amountOfTries}`;
}

function startTime() {
    setTimeout(() => { 
        updateTime() 
    }, 1000)
}  

///////////////////////////////////////////////////////////////////////////////// CLICK ON CARDS EVENT
document.addEventListener('click', event => {
    if (event.target.className.includes('card') && !event.target.parentElement.className.includes('flipped')) {
        flipCard(event.target.parentElement)
    }
})
///////////////////////////////////////////////////////////////////////////////// FLIP CARDS
let flippedCards = 0; 
let totalFlips = 0;
let amountOfTries = 0;

function flipCard(card) {
    flippedCards++
    
    if (flippedCards <= 2) {  
        card.classList.add('flipped') 

        if(flippedCards == 2) {
            amountOfTries++
            document.getElementById('statsBoard').innerHTML = `<b>Elapsed time in seconds:</b> ${elapsedTime}<br><b>Amount of tries:</b> ${amountOfTries}`;
        }
    }
    if (flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)')

        if (flippedCards[0].innerText === flippedCards[1].innerText) {
            flippedCards[0].classList.add('matched')
            flippedCards[1].classList.add('matched')
            totalFlips++
        }
        setTimeout(() => { flipCardsBack() }, 1000)
    }
    if(totalFlips == 8) {
        startGameButton.innerText= 'Play Again';
        setTimeout(() => { 
            document.getElementById('gameCompleted').style.visibility = 'visible';
            startGameButton.style.display = 'block';
            let totalTime = elapsedTime;
            document.getElementById('statsBoard').style.display = 'none';
            document.getElementById('gameCompleted').innerHTML = `
                Congratulations,<br>You have completed the game with ${amountOfTries} tries after ${totalTime} seconds!<br>
                Click on 'Play Again' above to start a new game, goodluck !
            `;

        }, 1000)
       
    }
} 

function flipCardsBack() {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })
    flippedCards = 0
}