// NICE TO HAVE -> GIVE PLAYER THREE LIVES, each time they are wrong they lose a life

let randomNumber = Math.floor(Math.random() * 17) + 1;
console.log(randomNumber)
let randomNumberMinus = randomNumber - 1;
let randomNumberPlus = randomNumber + 1;

window.guessNumber = guessNumber;



function guessNumber() {
    const guessedNumber = document.querySelector("#guessedNumber").value;
    console.log(randomNumberPlus);

    document.querySelector("#guessResult").style.display = 'block';

    if(randomNumber == guessedNumber) {
        document.querySelector("#guessResult").innerText = `Awesome! Number ${randomNumber} is correct!`;
        document.querySelector("#guessResult").style.backgroundColor = '#CCFFFF';
    } else if(guessedNumber == randomNumberMinus || guessedNumber == randomNumberPlus) {
        document.querySelector("#guessResult").innerText = `${guessedNumber} is so close, but you just missed it!`;
        document.querySelector("#guessResult").style.backgroundColor = 'orange';
        
    } else {
        document.querySelector("#guessResult").innerText = `Number ${guessedNumber} is wrong ! Try again`;
        document.querySelector("#guessResult").style.backgroundColor = '#FFF0F0';
    }

}