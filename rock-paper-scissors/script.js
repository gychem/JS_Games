

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
        result.innerText = `Same weapon, play again`;
        document.getElementById(weaponChoice).style.border = "2px solid orange";
        document.getElementById(computerChoiceInput).style.border = "2px solid orange";
    } else if((weapon == "Rock" && randomWeapon == "Scissor") || (weapon == "Scissor" && randomWeapon == "Paper") || (weapon == "Paper" && randomWeapon == "Rock")) {
        document.getElementById(weaponChoice).style.border = "2px solid green";
        document.getElementById(computerChoiceInput).style.border = "2px solid red";
        result.innerText = `You have won !`;
    } else {
        result.innerText = `You have lost !`;
        document.getElementById(weaponChoice).style.border = "2px solid red";
        document.getElementById(computerChoiceInput).style.border = "2px solid green";
    }

    playAgain.style.visibility = "visible";

    
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
