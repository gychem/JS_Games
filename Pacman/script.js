//////////////////////////////////////////////////////////////////////////////////////   VARIABLES
const main = document.querySelector('main'); 
const section = document.querySelector('section'); 
const player = document.createElement('div');
const message = document.querySelector('#message');
let arrayLenght;
let monster0, monster1, monster2, monster3
let playerActiveId;
let score = 0;
let lives = 3;
let lastMove;
let cooldown = false;
let gameover = false;
let gamewon = false;
//////////////////////////////////////////////////////////////////////////////////////   SELECT MAP
import { LEVEL_1 } from './assets/mazes.js';
loadMap(LEVEL_1);
///////////////////////////////////////////////////////////////////////////////////////  LOAD MAP
function loadMap(array) {
    array.forEach(n => arrayLenght = n.length); 
    let blockWidth = 50; //Width of one cell in px
    let totalWidth = blockWidth * arrayLenght;
    main.style.width = `${totalWidth}px`;
    document.getElementById('score').style.width = `${totalWidth}px`;
    document.getElementById('score').style.margin = `0 auto`;
    section.style.width = `${totalWidth}px`;
    let merged = [].concat.apply([], array); 

    for(let i = 0; i < merged.length; i++){
        if(merged[i] == '*'){
            merged[i] = `<div id="${i}" class="wall"></div>`;
        }
        if(merged[i] == '.'){
            merged[i] = `<div id="${i}" class="path"><div id="food${i}" class="food">🪙</div></div>`;
        }
        if(merged[i] == 'S'){
            merged[i] = `<div id="${i}" class="start"></div>`;
        }
        if(merged[i] == 'T'){
            merged[i] = `<div id="${i}" class="treasure"></div>`;
        }
    }
    let finalarray = merged.join('');
    main.innerHTML = finalarray;
    loadPlayer();
}
////////////////////////////////////////////////////////////////////////////////////   LOAD PLAYER
function loadPlayer() {
    let start = document.querySelector('.start');
    player.setAttribute("class", "player");
    start.appendChild(player);
    player.setAttribute("id", `${start.id}`);
    loadMonsters();
}
////////////////////////////////////////////////////////////////////////////////////   MONSTER CONTROLS
function loadMonsters() {
    monster0 = document.createElement('div');
    monster0.setAttribute("id", `109`);
    monster0.setAttribute("class", "monster0");
    document.getElementById('109').appendChild(monster0);

    monster1 = document.createElement('div');
    monster1.setAttribute("id", `109`);
    monster1.setAttribute("class", "monster1");
    document.getElementById('109').appendChild(monster1);

    monster2 = document.createElement('div');
    monster2.setAttribute("id", `109`);
    monster2.setAttribute("class", "monster2");
    document.getElementById('109').appendChild(monster2);

    monster3 = document.createElement('div');
    monster3.setAttribute("id", `109`);
    monster3.setAttribute("class", "monster3");
    document.getElementById('109').appendChild(monster3);

    setTimeout(loadMonster0, 2000);
    setTimeout(loadMonster1, 4000);
    setTimeout(loadMonster2, 6000);
    setTimeout(loadMonster3, 8000);
}

function loadMonster0() { timerMonster0(); }
function timerMonster0() { setTimeout(startMonster0, 200); }
function startMonster0() { chooseMovement('monster0'); }

function loadMonster1() { timerMonster1(); }
function timerMonster1() { setTimeout(startMonster1, 200); }
function startMonster1() { chooseMovement('monster1') }

function loadMonster2() { timerMonster2(); }
function timerMonster2() { setTimeout(startMonster2, 200); }
function startMonster2() { chooseMovement('monster2') }

function loadMonster3() { timerMonster3(); }
function timerMonster3() { setTimeout(startMonster3, 200); }
function startMonster3() { chooseMovement('monster3') }

function chooseMovement(monsterId) {
    let movements = ["up","down","left","right"];

    switch (lastMove) {
        case "up":
           movements = ["up","left","right"];
          break;
        case "down":
            movements = ["down","left","right"];
          break;
        case "right":
            movements = ["up","down","right"];
            break;
        case "left":
            movements = ["up","down","left"];
          break;
      }

    if(gameover == false && gamewon == false) {
        let direction = movements[Math.floor(Math.random() * movements.length)];
        moveMonsters(monsterId, direction);
    }
}

function moveMonsters(monsterId, direction) {
    let directionId;
    let currentId = document.querySelector(`.${monsterId}`);

    switch (direction) {
        case "up":
            directionId = currentId.id -arrayLenght;
            lastMove = "up";
          break;
        case "down":
            directionId = parseInt(currentId.id) + arrayLenght;
            lastMove = "down";
          break;
        case "right":
            directionId = parseInt(currentId.id) + 1;
            lastMove = "right";
            break;
        case "left":
            directionId = parseInt(currentId.id) -1;
            lastMove = "left";
          break;
      }

    if(document.getElementById(`${directionId}`).classList.contains('path')) 
    {
        if(document.getElementById(`${directionId}`).classList.contains('path')) {
            let directionElement = document.getElementById(directionId);
            let element = document.querySelector(`.${monsterId}`);

            directionElement.appendChild(element);
            element.setAttribute("id", `${directionId}`);
        } else if(document.getElementById(`${++currentId.id}`).classList.contains('path')) {
            let directionElement = document.getElementById(++currentId.id);
            let element = document.querySelector(`.${monsterId}`);

            directionElement.appendChild(element);
            element.setAttribute("id", `${++currentId.id}`);
        }
    } 

    if(monster0.id == player.id || monster1.id == player.id || monster2.id == player.id || monster3.id == player.id) {
        if(cooldown == false) {
            lives = lives - 1;
            cooldown = true;
            setTimeout(cooldownFinish, 5000);
            monster0.style.filter = 'grayscale(1)'
            monster1.style.filter = 'grayscale(1)'
            monster2.style.filter = 'grayscale(1)'
            monster3.style.filter = 'grayscale(1)'
            document.getElementById('score').innerHTML = `Coins: ${score} - Lives: ${lives}`

            if(lives <= 0) {
                gameOver();
            }
        }
    }

    if(score >= 119) {
        gameWon();
    } 

    monster0.classList.add("bounce")
    monster1.classList.add("bounce")
    monster2.classList.add("bounce")
    monster3.classList.add("bounce")

    if(monsterId == "monster0") {
        timerMonster0(); 
    } else if(monsterId == "monster1") {
        timerMonster1();
    } else if(monsterId == "monster2") {
        timerMonster2();
    } else if(monsterId == "monster3") {
        timerMonster3();
    }
}

function gameOver() {
    gameover = true;
}

document.querySelector(`#restart`).addEventListener("click", () => {
    playAgain();
});

function playAgain() {
    location.reload();
}

function gameWon() {
    gamewon = true;
    
    message.innerHTML = "<font color='darkgreen'><b>SUCCES</b></font> -You have found all the coins !";
    document.querySelector('#succes').style.visibility = "visible";
    section.style.backgroundColor = `#CCFFFF`;
}

function cooldownFinish() {
    cooldown = false;
    monster0.style.filter = 'grayscale(0)'
    monster1.style.filter = 'grayscale(0)'
    monster2.style.filter = 'grayscale(0)'
    monster3.style.filter = 'grayscale(0)'
}
//////////////////////////////////////////////////////////////////////////////// MOVEMENT KEYS
document.addEventListener('keydown', event => {
    if(gameover == false && gamewon == false) {
        switch (event.code) {
            case "ArrowRight":
              playerActiveId = player.id;
              let newPosIdRight = ++playerActiveId; 
              movePlayer(newPosIdRight);
              break;
            case "ArrowLeft":
              playerActiveId = player.id;  
              let newPosIdLeft = --playerActiveId;
              movePlayer(newPosIdLeft);
              break;
            case "ArrowUp":
              let newPosIdUp = parseInt(player.id) - arrayLenght;
              movePlayer(newPosIdUp);
                break;
            case "ArrowDown":
              let newPosIdDown = parseInt(player.id) + arrayLenght;
              movePlayer(newPosIdDown);
              break;
        }
    }
}) 
/////////////////////////////////////////////////////////////////////////////////   PLAYER MOVEMENT
function movePlayer(direction) {
    if(document.getElementById(direction).classList.contains("wall")) {
        message.innerHTML = "Invalid direction</b> - Try to find another way!";
        section.style.backgroundColor = `#FFF0F0`;
    } else if(document.getElementById(direction).classList.contains("start")) {
        document.getElementById(direction).appendChild(player);
        player.setAttribute("id", `${direction}`);
    } else {
        document.getElementById(direction).appendChild(player);

        message.innerText = "Navigating through the jungle...";

        let foodid = `food${direction}`;
        let foodElement = document.getElementById(foodid)

        if(foodElement != null) {
            document.getElementById(foodid).remove();
            message.innerText = "Great! You have picked up a coin and stashed it in your bag.";
            ++score;
            let audio = new Audio('./assets/audio/coin.mp3');
            audio.play();
            document.getElementById('score').innerHTML = `Coins: ${score} - Lives: ${lives}`
        }
            
        player.setAttribute("id", `${direction}`);
        section.style.backgroundColor = `white`;

        player.classList.add("bounce")
    }
}