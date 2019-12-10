function openFight(){
    window.location.href = "../../templates/melee_battle.html";
}
function navalFight(){
    window.location.href = "../../templates/naval/prepairing.html";
}
function openChracterDetail(){
    window.location.href = "../../templates/overworld/chracter_view.html";
}
function openCityView(){
    window.location.href = "../../templates/overworld/city_view.html";
}

document.querySelector('#room-name-input').focus();
document.querySelector('#room-name-input').onkeyup = function(e) {
    if (e.keyCode === 13) {  // enter, return
        document.querySelector('#room-name-submit').click();
    }
};

document.querySelector('#room-name-submit').onclick = function(e) {
    var roomName = document.querySelector('#room-name-input').value;
    window.location.pathname = '/chat/' + roomName + '/';
};