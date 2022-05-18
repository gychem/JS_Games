

const weaponRock = document.getElementById("weaponRock");
const weaponPaper = document.getElementById("weaponPaper");
const weaponScissor = document.getElementById("weaponScissor");
const result = document.getElementById("result");

weaponRock.addEventListener("click", function() { //Rock
    chooseWeapon("rock");
}, false);

weaponPaper.addEventListener("click", function() { //Paper
    chooseWeapon("paper");
}, false);

weaponScissor.addEventListener("click", function() { //Scissor
    chooseWeapon("scissor");
}, false);


function chooseWeapon(weapon) {
    let randomWeapon = ['rock', 'paper', 'scissor'][Math.floor(Math.random() * 3)];
    console.log(randomWeapon)

    if(weapon == randomWeapon) {
        result.innerText = `${weapon} vs ${randomWeapon}: Same weapon, play again`;
    } else if((weapon == "rock" && randomWeapon == "scissor") || (weapon == "scissor" && randomWeapon == "paper") || (weapon == "paper" && randomWeapon == "rock")) {
        result.innerText = `${weapon} vs ${randomWeapon}: You have won !`;
    } else {
        result.innerText = `${weapon} vs ${randomWeapon}: You have lost !`;
    }

}