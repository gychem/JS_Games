// CURRENTLY WORKING ON 1 DECK UPDATE TO 6 DECKS
// 


const suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
const values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King",];
let deck = [];
const startNewGamebtn = document.getElementById('startNewGame');
let player; 
let computer;
let mergedComputerHand; 
let mergedPlayerHand
let dealPlayerCards;
let dealComputerCards;
let gameActive = false;
let standActive = false;
let bank = 500;
let currentBet = 0;


function startNewGame()
{
    if(gameActive == true) {
        deck = [];
        standActive = false;
    }
    gameActive = true;
    startNewGamebtn.innerText = 'Restart Game';
    createDeck();
    shuffleCards();
    dealHands();
    document.getElementById('message').innerHTML = 'You have started a new game, goodluck !';
    console.log(deck)
}


function createDeck() {
    for (let i = 0; i < suits.length; i++) {
        for (let x = 0; x < values.length; x++) {
            let weight = parseInt(values[x]);
            if (values[x] == "Jack" || values[x] == "Queen" || values[x] == "King") {
                weight = 10;
            }
            if (values[x] == "Ace") {
                weight = 11;
            }
            let card = { Value: values[x], Suit: suits[i], Weight: weight };
            deck.push(card);
        }
    }
}

function shuffleCards() {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}


document.querySelector('#bank').innerHTML = `<b>Bank:</b> €${bank}`
document.querySelector('#currentBet').innerHTML = `<b>Current Bet:</b> €${currentBet}`

// ON DRAW GIVE MONEY BACK
// ON WIN DOUBLE THE MONEY

function placeBet(amount) {
    if(bank < amount) {
        document.getElementById('message').innerHTML = `
        You don't have enough money in the bank!
        <button id="resetBank" onclick="resetBank()" type="button">RESET BANK</button>`;
    } else if (bank >= amount) {
        currentBet = currentBet + amount;
        bank = bank - amount;
        console.log("Bet placed " + amount + " Total amount " + currentBet)
        document.querySelector('#bank').innerHTML = `<b>Bank:</b> €${bank}`
        document.querySelector('#currentBet').innerHTML = `<b>Current Bet:</b> €${currentBet}`
    }
}

function resetBank() {
    bank = 500;
    document.querySelector('#bank').innerHTML = `<b>Bank:</b> €${bank}`
    document.getElementById('message').innerHTML = `PLACE YOUR BET`;
    
}

function gameLost() {
    currentBet = 0;
    document.querySelector('#currentBet').innerHTML = `<b>Current Bet:</b> €${currentBet}`
}

function gameWon() {
    bank = bank + (currentBet * 2);
    currentBet = 0;
    document.querySelector('#bank').innerHTML = `<b>Bank:</b> €${bank}`
    document.querySelector('#currentBet').innerHTML = `<b>Current Bet:</b> €${currentBet}`
}

function gameDraw() {
    bank = bank + currentBet;
    currentBet = 0;
    document.querySelector('#bank').innerHTML = `<b>Bank:</b> €${bank}`
    document.querySelector('#currentBet').innerHTML = `<b>Current Bet:</b> €${currentBet}`
}



function dealHands()
{
    for (let i = 0; i < 2; i++) {
        dealComputerCards = deck.slice(Math.max(deck.length - 2, 0)); 
        deck.pop(dealComputerCards);
        dealPlayerCards = deck.slice(Math.max(deck.length - 2, 0)); 
        deck.pop(dealPlayerCards);
    }
    player = { Name: 'Player', Points: 0, Hand: dealPlayerCards, };
    computer = { Name: 'Computer', Points: 0, Hand: dealComputerCards, };
    console.log(player, computer);
   

    for (let index = 0; index < player.Hand.length; index++) {
        player.Points = player.Points + player.Hand[index].Weight;       
    }
    for (let index = 0; index < computer.Hand.length; index++) {
        computer.Points = computer.Points + computer.Hand[index].Weight;       
    }
 renderCards();
}

function renderCards()
{
    let renderComputerCards = "";
    let renderPlayerCards = "";

    if(standActive == false) {
        for(let i = 1; i < computer.Hand.length; i++)
        {
            (renderComputerCards += `
            <img src="./cardimages/backSide.png">
            <img src="./cardimages/${computer.Hand[i].Suit}${computer.Hand[i].Value}.png">
            `); 
        }
    } else if(standActive == true) {
        computer.Hand.forEach(function (result) {
            (renderComputerCards += `<img src="./cardimages/${result.Suit}${result.Value}.png">`); 
        })
    }

    player.Hand.forEach(function (result) {
        (renderPlayerCards += `<img src="./cardimages/${result.Suit}${result.Value}.png">`); 
    })
  
    document.getElementById("computer").innerHTML = renderComputerCards;
    document.getElementById("player").innerHTML = renderPlayerCards;
}




function hitCard(playerOrComputer)
{
    let card = deck.pop();
    playerOrComputer.Hand.push(card);
    renderCards();
    playerOrComputer.Points = playerOrComputer.Points + card.Weight;
    check();
}

function check()
{
    console.log("player:" + player.Points);
    console.log("computer:" + computer.Points);
    if (player.Points > 21)
    {
        gameLost();
        document.getElementById('message').innerHTML = 'You <font color="darkred">LOST</font> the game.';
    } 
    else if (computer.Points > 21)
    {
        gameWon();
        document.getElementById('message').innerHTML = 'You have <font color="darkgreen">WON</font> won the game.';
    } 
    else if (computer.Points >= 18)
    {
        if(computer.Points > player.Points) {
            gameLost();
            document.getElementById('message').innerHTML = 'You <font color="darkred">LOST</font> the game.';    
        } else if(player.Points > computer.Points) {
            gameWon();
            document.getElementById('message').innerHTML = 'You have <font color="darkgreen">WON</font> won the game.';
        } else if(player.Points == computer.Points) {
            gameDraw();
            document.getElementById('message').innerHTML = 'Draw';
        } 
    }
}

function stand()
{
    standActive = true;
    if(computer.Points < 18)
        for (let i; computer.Points < 18; i++) {
            hitCard(computer);
        }
    else check();
}





