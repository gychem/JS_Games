
let weaponButton = document.querySelectorAll("#weapon");

console.log(weaponButton[1])

/*
inputElement.type = "button"
inputElement.addEventListener('click', function(){
    gotoNode(result.name);
});


document.getElementById("weapon").addEventListener("click", function() {
    console.log("weapon chosen")
}, false);
*/
window.chooseWeapon = chooseWeapon;
function chooseWeapon(weapon) {
    if(weapon.value == "rock") {
        console.log('rock')
    } else if(weapon == "paper") {
        console.log('paper')
    } else if(weapon == "scissor") {
        console.log('scissor')
    }
}