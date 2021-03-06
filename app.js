/*
Author: Rohit Singh
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls two dices as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- ALSO, if the player rolls two sixes in a throw, all his ROUND score and his OVERALL score get lost. After that, it's the next player's turn
- Anytime during the ROUND a player can choose to 'Hold', which means that his ROUND score gets added to his OVERALL score. After that, it's the next player's turn
- The first player to reach the WINNING SCORE (Default 100 points) on the OVERALL score wins the game

*/
var scores,roundScore,dice1,dice2,activePlayer,gameStatus;

//Initialise game
initialiseGame();

//functionality for click on Roll button
document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gameStatus){
        dice1=Math.floor(Math.random()*6)+1;    
        dice1DOM=document.getElementById('dice-1');
        dice1DOM.style.display='block';
        dice1DOM.src='dice-'+dice1+'.png';
        
        dice2=Math.floor(Math.random()*6)+1;    
        dice2DOM=document.getElementById('dice-2');
        dice2DOM.style.display='block';
        dice2DOM.src='dice-'+dice2+'.png';

        if(dice1===1 || dice2===1){
            nextPlayer();
        }else if(dice1===6 && dice2===6){
            scores[activePlayer]=0;
            document.getElementById('score-'+activePlayer).textContent = '0';
            document.getElementById('current-'+activePlayer).textContent = '0';            
            nextPlayer();
        }else{
            roundScore=roundScore+dice1+dice2;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }
    }
});


//functionality for click on Hold button
document.querySelector('.btn-hold').addEventListener('click',function(){
    if (gameStatus){
        var input = document.querySelector('.final-score').value;
        if (!input){
            input=100;
        }
        scores[activePlayer]+=roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];       
        if(scores[activePlayer]>=input){     
            document.getElementById('name-'+activePlayer).textContent='Winner';
            document.getElementById('dice-1').style.display='none';
            document.getElementById('dice-2').style.display='none';        
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gameStatus=false;
        }else{
            nextPlayer(); 
        }
    }
});


//functionality for click on New button
document.querySelector('.btn-new').addEventListener('click',initialiseGame);
                                                     
function initialiseGame(){
    gameStatus=true;
    activePlayer=0;
    roundScore=0;
    scores=[0,0];
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('dice-1').style.display='none';
    document.getElementById('dice-2').style.display='none';    
    document.getElementById('name-0').textContent='Player 1';
    document.getElementById('name-1').textContent='Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active'); 
    document.querySelector('.player-0-panel').classList.add('active');
}
    

function nextPlayer(){
        activePlayer === 0 ? activePlayer =1 : activePlayer =0;
        roundScore=0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
}

