/*
Add extra options for the player: lizard & spock
Keep track of the score after multiple games
Add more options for a player to choose from (example: a risky option that awards more points but has a higher chance of losing)
Add even more options (but avoid using 100 if statements)
Can you make a player win 100% of the games? Or win 75%? not to raise any suspicion
*/

const weaponRock = document.getElementById("weaponRock");
const weaponPaper = document.getElementById("weaponPaper");
const weaponScissor = document.getElementById("weaponScissor");
const result = document.getElementById("result");
const computerChoice = document.getElementById("computerChoice");
const playAgain = document.getElementById("playAgain");
let weaponChoice;
let computerChoiceInput;

weaponRock.addEventListener("click", function() { //Rock
    chooseWeapon("Rock");
}, false);

weaponPaper.addEventListener("click", function() { //Paper
    chooseWeapon("Paper");
}, false);

weaponScissor.addEventListener("click", function() { //Scissor
    chooseWeapon("Scissor");
}, false);

function chooseWeapon(weapon) {

   

    let randomWeapon = ['Rock', 'Paper', 'Scissor'][Math.floor(Math.random() * 3)];
    
   computerChoice.style.visibility = "visible";
   weaponChoice = `weapon${weapon}`;
   computerChoiceInput = `choice${randomWeapon}`;

   weaponRock.disabled = true;
   weaponPaper.disabled = true;
   weaponScissor.disabled = true;
   
    if(weapon == randomWeapon) {
        result.innerText = `Draw !`;
        document.getElementById(weaponChoice).style.border = "2px solid orange";
        document.getElementById(computerChoiceInput).style.border = "2px solid orange";
    } else if((weapon == "Rock" && randomWeapon == "Scissor") || (weapon == "Scissor" && randomWeapon == "Paper") || (weapon == "Paper" && randomWeapon == "Rock")) {
        document.getElementById(weaponChoice).style.border = "2px solid green";
        document.getElementById(computerChoiceInput).style.border = "2px solid red";
        result.innerText = `You have won !`;
        updateScore('player')
    } else {
        result.innerText = `You have lost !`;
        updateScore('computer')
        document.getElementById(weaponChoice).style.border = "2px solid red";
        document.getElementById(computerChoiceInput).style.border = "2px solid green";
    }

    playAgain.style.visibility = "visible";

    
}

let computerScore = 0;
let playerScore = 0;

function updateScore(scoreTo)  {
    document.getElementById('scoreBoard').style.visibility = 'visible'
    if(scoreTo == 'computer') {
        computerScore++
        document.getElementById('scoreBoard').innerHTML = `Your score: ${playerScore} - Computer's score: ${computerScore}`
    } else if(scoreTo == 'player') {
        playerScore++
        document.getElementById('scoreBoard').innerHTML = `Your score: ${playerScore} - Computer's score: ${computerScore}`
    }
}


playAgain.addEventListener("click", function() { //Playagain
    weaponRock.style.border = "2px solid black";
    weaponPaper.style.border = "2px solid black";
    weaponScissor.style.border = "2px solid black";
    document.getElementById(computerChoiceInput).style.border = "2px solid black";
    playAgain.style.visibility = "hidden";
    result.innerText = '';
    computerChoice.style.visibility = "hidden";
    weaponRock.disabled = false;
    weaponPaper.disabled = false;
    weaponScissor.disabled = false;
}, false);
