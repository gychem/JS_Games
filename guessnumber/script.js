// NICE TO HAVE -> GIVE PLAYER THREE LIVES, each time they are wrong they lose a life

let randomNumber = Math.floor(Math.random() * 17) + 1;
console.log(randomNumber)
let randomNumberMinus = randomNumber - 1;
let randomNumberPlus = randomNumber + 1;

window.guessNumber = guessNumber;



function guessNumber() {
    const guessedNumber = document.querySelector("#guessedNumber").value;
    console.log(randomNumberPlus);

    if(randomNumber == guessedNumber) {
        document.querySelector("#guessResult").innerText = `Awesome! Your number ${randomNumber} is correct!`;
    } else if(guessedNumber == randomNumberMinus || guessedNumber == randomNumberPlus) {
        document.querySelector("#guessResult").innerText = `${guessedNumber} is so close, but you just missed it! Are you in a class that started on the thirteenth or what?`;

        
    } else {
        document.querySelector("#guessResult").innerText = `${guessedNumber} is the wrong number ! Try again`;
    }

}