/******************* VARIABLES ******************/
// Main picks
const bulbasaur = document.getElementById('bulbasaur'); 
const charmander = document.getElementById('charmander');
const squirtle = document.getElementById('squirtle');
// Pokémon sprites
const playerPick = [...document.querySelectorAll('.main__battle-playermove')];
const compPick = [...document.querySelectorAll('.main__battle-compmove')];
// Log
const gameLog = document.querySelector('.main__battle-p');
// Scores
const playerScore = [...document.querySelectorAll('.player__score')];
const compScore = [...document.querySelectorAll('.comp__score')];
let score = 0;
// Replay
const replayButton = document.getElementById('replay-button');

/******************* FUNCTIONS ******************/

// Resets all sprites opacity to 0
const removePick = () => {
    playerPick[0].classList.add('opacity');
    playerPick[1].classList.add('opacity'); 
    playerPick[2].classList.add('opacity');
    compPick[0].classList.add('opacity');
    compPick[1].classList.add('opacity');
    compPick[2].classList.add('opacity');
}
// Shows Computer's pick in the right side
const showCompPick = (index) => {
    compPick[index].classList.remove('opacity');
}
// Generates a random compMove each time its invoked
let compMove;
let myMove;
const compMoveGenerator = () => { 
    let arrayPokemons = ['Squirtle', 'Charmander', 'Bulbasaur'];
    let randomMove = Math.floor(Math.random()*3);
    showCompPick(randomMove);
    compMove = arrayPokemons[randomMove];    
}
//Checks who wins this round
const checkWhoWins = () => {
    switch (myMove + compMove) {
        case 'SquirtleCharmander':
        case 'CharmanderBulbasaur':
        case 'BulbasaurSquirtle':
            gameLog.textContent = `${myMove} destroys ${compMove}. You WIN!`;
            playerScore[score].classList.add('win');
            compScore[score].classList.add('lose');
            break;
        case 'SquirtleBulbasaur':
        case 'CharmanderSquirtle':
        case 'BulbasaurCharmander':
            gameLog.textContent = `${myMove} is obliterated by ${compMove}. You LOSE!`;
            playerScore[score].classList.add('lose');
            compScore[score].classList.add('win');
            break;
        case 'SquirtleSquirtle':
        case 'CharmanderCharmander':
        case 'BulbasaurBulbasaur':
            gameLog.textContent = `${myMove} is playing with ${compMove}. It's a DRAW!`;
            playerScore[score].classList.add('draw');
            compScore[score].classList.add('draw');
            break;    
    }
}
const checkScore = () => {
    score++
    if(score===5) {
    replayButton.classList.add('visible');
    }
}

squirtle.onclick = () => {
    removePick();
    setTimeout(() => {
        playerPick[0].classList.remove('opacity');
        compMoveGenerator();
        myMove = 'Squirtle';
        checkWhoWins();  
        checkScore();      
    }, 300);
}
charmander.onclick = () => {
    removePick();
    setTimeout(() => {
        playerPick[1].classList.remove('opacity');
        compMoveGenerator();
        myMove = 'Charmander';
        checkWhoWins();  
        checkScore();
    }, 300);
}
bulbasaur.onclick = () => {
    removePick();
    setTimeout(() => {
        playerPick[2].classList.remove('opacity');
        compMoveGenerator();
        myMove = 'Bulbasaur';
        checkWhoWins();  
        checkScore();
    }, 300);
}