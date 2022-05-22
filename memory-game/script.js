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

function flipCard(card) {
    flippedCards++
    

    if (flippedCards <= 2) {  card.classList.add('flipped') }

    if (flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)')

        if (flippedCards[0].innerText === flippedCards[1].innerText) {
            flippedCards[0].classList.add('matched')
            flippedCards[1].classList.add('matched')
            totalFlips++
        }
        setTimeout(() => { flipCardsBack() }, 1000)

        console.log("totalflips" +totalFlips);
    }

    if(totalFlips == 8) {
        startGameButton.innerText= 'Play Again';
        setTimeout(() => { 
            document.getElementById('gameCompleted').style.visibility = 'visible';
            startGameButton.style.display = 'block';
        }, 1000)
       
    }
} 

function flipCardsBack() {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })
    flippedCards = 0
}