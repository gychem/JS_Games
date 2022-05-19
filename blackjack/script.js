// CURRENTLY WORKING ON 1 DECK UPDATE TO 6 DECKS
// Update styling 
// Update COMPUTER - stay - make first card hidden

const suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
const values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King",];
let deck = [];
const startNewGamebtn = document.getElementById('startNewGame');

function startNewGame()
{
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

let player; 
let computer;
let mergedComputerHand; 
let mergedPlayerHand
let dealPlayerCards;
let dealComputerCards;
let standActive = false;

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

    // computer.Hand.forEach(function (result) {
    //   (renderComputerCards += `
    //   <img src="./cardimages/backSide.png">
    //   <img src="./cardimages/${result.Suit}${result.Value}.png">
    //   `); 
    // })
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

    //backSide.png


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
        document.getElementById('message').innerHTML = 'You <font color="darkred">LOST</font> the game.';
    } 
    else if (computer.Points > 21)
    {
        document.getElementById('message').innerHTML = 'You have <font color="darkgreen">WON</font> won the game.';
    } 
    else if (computer.Points >= 18)
    {
        if(computer.Points > player.Points)
            document.getElementById('message').innerHTML = 'You <font color="darkred">LOST</font> the game.';
        else if(player.Points > computer.Points)
            document.getElementById('message').innerHTML = 'You have <font color="darkgreen">WON</font> won the game.';
        else if(player.Points == computer.Points)
            document.getElementById('message').innerHTML = 'Draw';
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





