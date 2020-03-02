/*************************************************
playSquirtle, playBulbasaur and playCharmander start a game with Squirtle, Bulbasar and Charmander as your choice, respectively.

Game ends when 5 rounds are played or when any player gets 3 wins.

Added smooth transitions to the sprites and replay function.

Added random log text;
*************************************************/
/******************* VARIABLES ******************/
//Title
const title = document.getElementById('title');
// Main picks
const bulbasaur = document.getElementById('bulbasaur'); 
const charmander = document.getElementById('charmander');
const squirtle = document.getElementById('squirtle');
const allPicks = [...document.querySelectorAll('.main__pick')];
let compMove; // stores computer's move to show it in the log
let myMove; // stores player's move to show it in the log
// Pokémon sprites
const playerPick = [...document.querySelectorAll('.main__battle-playermove')];
const compPick = [...document.querySelectorAll('.main__battle-compmove')];
// Log 
const gameLog = document.querySelector('.main__battle-p');
// Score variables and score boxes
const playerScore = [...document.querySelectorAll('.player__score')];
const compScore = [...document.querySelectorAll('.comp__score')];
let score = 0;
let compWins = 0;
let myWins = 0;
// Replay button
const replayButton = document.getElementById('replay-button');
// Variable that controls turn on-off pick buttons
let activateButtons = true;

/******************* FUNCTIONS ******************/
// Resets all sprites opacity to 0
const resetSprites = () => {
    playerPick.forEach(sprite => sprite.classList.add('opacity'));
    compPick.forEach(sprite => sprite.classList.add('opacity'));
}
// Resets all score boxes, sprites, text log, and title
const resetAll = () => {
    playerScore.forEach(score => {
        score.classList.remove('win');
        score.classList.remove('lose');
        score.classList.remove('draw');
    });
    compScore.forEach(score => {
        score.classList.remove('win');
        score.classList.remove('lose');
        score.classList.remove('draw');
    });
    gameLog.textContent = '';
    title.textContent = 'Choose one Pokémon';
    resetSprites();
}
// Generates a random compMove each time its invoked and shows its sprite in the bottom right circle
const compMoveGenerator = () => { 
    let arrayPokemons = ['Squirtle', 'Charmander', 'Bulbasaur'];
    let randomMove = Math.floor(Math.random()*3);
    compPick[randomMove].classList.remove('opacity');
    compMove = arrayPokemons[randomMove];    
}
// Random log text generator
const randomLog = () => {
    let randomMove
    switch (myMove) {
        case 'Squirtle':
            let squirtleMoves = ['Water gun', 'Hydropump', 'Aqua tail']
            randomMove = squirtleMoves[Math.floor(Math.random()*3)]
            break;
        case 'Charmander':
            let charmanderMoves = ['Ember', 'Inferno', 'Fire fang']
            randomMove = charmanderMoves[Math.floor(Math.random()*3)]
            break;
        case 'Bulbasaur':
            let bulbasaurMoves = ['Razor leaf', 'Solar beam', 'Seed bomb']
            randomMove = bulbasaurMoves[Math.floor(Math.random()*3)]
            break;    
    }
    return randomMove;
}
//Checks who wins the round, adds the result to the score track variables, and shows it in the score boxes and in the log
const checkWhoWins = () => {
    switch (myMove + compMove) {
        case 'SquirtleCharmander':
        case 'CharmanderBulbasaur':
        case 'BulbasaurSquirtle':
            gameLog.textContent = `${myMove} uses ${randomLog()} against ${compMove}. It's super effective! Your ${myMove} wins!`;
            playerScore[score].classList.add('win');
            compScore[score].classList.add('lose');
            myWins++
            break;
        case 'SquirtleBulbasaur':
        case 'CharmanderSquirtle':
        case 'BulbasaurCharmander':
            gameLog.textContent = `${myMove} uses ${randomLog()} against ${compMove}. It's not very effective... Your ${myMove} loses.`;
            playerScore[score].classList.add('lose');
            compScore[score].classList.add('win');
            compWins++
            break;
        case 'SquirtleSquirtle':
        case 'CharmanderCharmander':
        case 'BulbasaurBulbasaur':
            gameLog.textContent = `${myMove} is playing with ${compMove}. They're friends!`;
            playerScore[score].classList.add('draw');
            compScore[score].classList.add('draw');
            break;   
    }
}
//Checks if any condition to finish the game its accomplished
const checkScore = () => {
    score++
    if(myWins === 3) {
        title.textContent = `You win! ${myWins}-${compWins}. Play again`;
        gameOver();
    } else if (compWins===3) {
        title.textContent = `You lose! ${myWins}-${compWins}. Play again`;
        gameOver(); 
    } else if (score===5 && myWins > compWins) {
        title.textContent = `You win! ${myWins}-${compWins}. Play again`;
        gameOver();
    } else if (score===5 && myWins < compWins) {
        title.textContent = `You lose! ${myWins}-${compWins}. Play again`;
        gameOver();
    } else if (score===5 && myWins===compWins) {
        title.textContent = `It's a draw! ${myWins}-${compWins}. Play again`;
        gameOver();
    }
}
// Enables and disables pick buttons when is invoked
const enablePickButtons = () => {
    allPicks.forEach(pick => {
        pick.classList.toggle('main__pick');
        pick.classList.toggle('main__pick-disabled');
    });
}
// Shows-Hides the replay button when invoked
const activeReplayButton = () => {
    replayButton.classList.toggle('visible');
}
// Deactivates pick buttons, changes them to gray-scale and shows replay button
const gameOver = () => {
    activateButtons = false;
    enablePickButtons();
    activeReplayButton();
}
//Plays one round with Squirtle, Charmander and Bulbasaur as your move
const playSquirtle = () => {
    if (activateButtons === true) {
        resetSprites();
        setTimeout(() => {
            playerPick[0].classList.remove('opacity');
            compMoveGenerator();
            myMove = 'Squirtle';
            checkWhoWins();  
            checkScore();      
        }, 300);
    }
}
const playCharmander = () => {
    if (activateButtons === true) {
        resetSprites();
        setTimeout(() => {
            playerPick[1].classList.remove('opacity');
            compMoveGenerator();
            myMove = 'Charmander';
            checkWhoWins();  
            checkScore();
        }, 300);
    }
}
const playBulbasaur = () => {
    if (activateButtons === true) {
        resetSprites();
        setTimeout(() => {
            playerPick[2].classList.remove('opacity');
            compMoveGenerator();
            myMove = 'Bulbasaur';
            checkWhoWins();  
            checkScore();
        }, 300);
    }
}
// Starts a game with Squirtle, Charmander and Bulbasaur as your move, respectively
squirtle.addEventListener('click', playSquirtle);
charmander.addEventListener('click', playCharmander);
bulbasaur.addEventListener('click', playBulbasaur);
// Resets everything to start a new game
replayButton.addEventListener('click', () => {
    score = 0;
    compWins = 0;
    myWins = 0;
    activateButtons = true;
    activeReplayButton();
    resetAll();
    enablePickButtons();
});