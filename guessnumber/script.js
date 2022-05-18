// NICE TO HAVE -> GIVE PLAYER THREE LIVES, each time they are wrong they lose a life


let randomNumber = Math.floor(Math.random() * 17);
console.log(randomNumber)



window.guessNumber = guessNumber;



function guessNumber() {
    const guessedNumber = document.querySelector("#guessedNumber").value;
    console.log(guessedNumber);

    if(randomNumber == guessedNumber) {
        document.querySelector("#guessResult").innerText = `You have succesfully guessed number ${randomNumber}`;
    } else {
        document.querySelector("#guessResult").innerText = `Wrong number ! Try again`;
    }

}