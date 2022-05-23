//////////////////////////////////////////////////////////////////////////////////////  TO DO
// - You could also create levels of your own
// - Display the time spent to solve the maze
// - Update year in footer automatically
//////////////////////////////////////////////////////////////////////////////////////   VARIABLES
const main = document.querySelector('main'); 
const section = document.querySelector('section'); 
let arrayLenght;
let player = document.createElement('div');
let monster = document.createElement('div');
let playerActiveId;
let message = document.querySelector('#message');

//////////////////////////////////////////////////////////////////////////////////////   SELECT MAP LEVEL
import { LEVEL_1 } from './mazes.js';
import { LEVEL_2 } from './mazes.js';
import { LEVEL_3 } from './mazes.js';

loadMap(LEVEL_1);
let currentLevel = "LEVEL_1";

window.nextLevel = nextLevel;
function nextLevel() {
   switch (currentLevel) {
     case 'LEVEL_1':
        currentLevel = "LEVEL_2";
        loadMap(LEVEL_2)
        message.innerText = "[Level 2] Find the treasure and navigate trough the jungle. (use the arrow keys)";
        document.querySelector('#succes').style.visibility = "hidden";
       break;
     case 'LEVEL_2':
        currentLevel = "LEVEL_3";
        loadMap(LEVEL_3)
        document.querySelector('#succes').style.visibility = "hidden";
        message.innerText = "[Level 3] Find the treasure and navigate trough the jungle. (use the arrow keys)";
        document.querySelector('#gonextlevel').innerText = "You have finished all levels, go back to level 1"
        break;
     case 'LEVEL_3':
        currentLevel = "LEVEL_1";
        loadMap(LEVEL_1)
        document.querySelector('#succes').style.visibility = "hidden";
        message.innerText = "[Level 1] Find the treasure and navigate trough the jungle. (use the arrow keys)";
        document.querySelector('#gonextlevel').innerText = "Go to the next level"
       break;
   }
}
///////////////////////////////////////////////////////////////////////////////////////  LOAD MAP
function loadMap(array) {

    array.forEach(n => arrayLenght = n.length); 
    let blockWidth = 50; //Width of one cell in px
    let totalWidth = blockWidth * arrayLenght;
    main.style.width = `${totalWidth}px`;
    section.style.width = `${totalWidth}px`;
    let merged = [].concat.apply([], array); 

    for(let i = 0; i < merged.length; i++){
        if(merged[i] == '*'){
            merged[i] = `<div id="${i}" class="wall"></div>`;
        }
        if(merged[i] == '.'){
            merged[i] = `<div id="${i}" class="path"></div>`;
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

    loadMonsters();
}

////////////////////////////////////////////////////////////////////////////////////   LOAD PLAYER
function loadPlayer() {
    let start = document.querySelector('.start');
    player.setAttribute("class", "player");
    start.appendChild(player);
    player.setAttribute("id", `${start.id}`);
    
}
////////////////////////////////////////////////////////////////////////////////////   GAME CONTROLS




function loadMonsters() {
    let start = document.querySelector('.start');
    monster.setAttribute("id", `${start.id}`);
    monster.setAttribute("class", "monster");
    start.appendChild(monster);
    const myTimeout = setTimeout(moveMonstrers, 500);
}

function moveMonstrers() {
    let start = document.querySelector('.start');
   // monster.setAttribute("id", `${start.id + 1}`);

    let monsterid = monster.id;
    let monsterMoveLeft = --monsterid;
    let monsterMoveRight = monsterid + 1;
    let monsterMoveUp = monsterid + arrayLenght;
    let monsterMoveDown = monsterid - arrayLenght;

    console.log('monsterid ' + monsterid)
    console.log('move left ' + monsterMoveLeft)
    console.log('move right ' + monsterMoveRight)
    console.log('move up ' + monsterMoveUp)
    console.log('move down ' + monsterMoveDown)

    
    if()
        
        
    ) else if() {

    } else if() {
        
    }*/


   // if(monster.id)

}



/*
function myStopFunction() {
  clearTimeout(myTimeout);
}*/


document.addEventListener('keydown', event => {
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
  }) 
/////////////////////////////////////////////////////////////////////////////////   GAME MOVEMENT
function movePlayer(direction) {
    if(document.getElementById(direction).classList.contains("wall")) {
        message.innerHTML = "Invalid direction</b> - Try to find another way!";
        section.style.backgroundColor = `#FFF0F0`;
    } else if(document.getElementById(direction).classList.contains("start")) {
        document.getElementById(direction).appendChild(player);
        player.setAttribute("id", `${direction}`);
        
    } else if(document.getElementById(direction).classList.contains("treasure")) {
        document.getElementById(direction).appendChild(player);
        player.setAttribute("id", `${direction}`);
        message.innerHTML = "<font color='darkgreen'><b>SUCCES</b></font> - You have reached the treasure !";
        document.querySelector('#succes').style.visibility = "visible";
        section.style.backgroundColor = `#CCFFFF`;
    } else {
        document.getElementById(direction).appendChild(player);
        player.setAttribute("id", `${direction}`);
        message.innerText = "Navigating through the jungle...";
        section.style.backgroundColor = `white`;
    }
}


