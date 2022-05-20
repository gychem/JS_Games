let gameActive = false;
let cardClass;
let gameContainer = document.querySelector('#gameContainer');
const startGameButton = document.querySelector('#startGameButton');
///////////////////////////////////////////////////////////////////////////////// CREATE, DUPLICATE and MERGE ARRAYS
let animals = ['🐕', '🐈', '🐘', '🐁', '🐒', '🐅', '🐎', '🐪']
let animalsClone = [...animals];
animals = animals.concat(animalsClone);
///////////////////////////////////////////////////////////////////////////////// LOAD CARDS
loadCards()
function loadCards() {
    shuffleCards()
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
    gameContainer.innerHTML = '';
    startGameButton.innerText = 'Restart Game';
    gameActive = true;
    loadCards()
}
///////////////////////////////////////////////////////////////////////////////// CLICK ON CARDS EVENT
document.addEventListener('click', event => {
    const target = event.target
    const cardParentDiv = target.parentElement

    if (target.className.includes('card') && !cardParentDiv.className.includes('flipped')) {
        flipCard(cardParentDiv)
    // } else if (target.nodeName === 'BUTTON' && !target.className.includes('disabled')) {
    //     startGame()
     }
})
///////////////////////////////////////////////////////////////////////////////// FLIP CARDS
const state = {
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
}

const flipCard = card => {
    state.flippedCards++
    state.totalFlips++

    if (state.flippedCards <= 2) {  card.classList.add('flipped') }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)')

        if (flippedCards[0].innerText === flippedCards[1].innerText) {
            flippedCards[0].classList.add('matched')
            flippedCards[1].classList.add('matched')
        }

        setTimeout(() => {
            flipBackCards()
        }, 1000)
    }
} 

const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })

    state.flippedCards = 0
}