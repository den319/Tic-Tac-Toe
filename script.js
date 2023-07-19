
// ------------------------------------------------------ elements
const starting_page= document.querySelector('.starting-page');
const player1_name= document.getElementById('player1').value;
const player2_name= document.getElementById('player2').value;
const input= document.querySelectorAll('input');
const start_game=  document.querySelector('.start');

const grid= document.getElementById('grid');
const grid_title= document.getElementById('grid-title');
const buttons= document.querySelectorAll('.btn');

const player_turn= document.querySelector('.player-turn');

const game_over_section= document.querySelector('.game-over-section');
const close_btn= document.querySelector('.close-btn');
const game_over_msg= document.querySelector('.game-over-message');

const reset_btn= document.querySelectorAll('.reset');
const restart_btn= document.querySelector('.restart');


// --------------------------------------------------- variables

const player1= 'X';
const player2= 'O';

// console.log(buttons);

let curr_player= player1;
let game_over= false;
let count_clicks= 0;



// ---------------------------------------------- fuction to start game

function start() {
    starting_page.style.display= 'none';
    grid.style.display= 'grid';
    grid_title.style.display= 'block';
    restart_btn.style.display= 'block';
    player_turn.style.display= 'flex';
}

// ---------------------------------------------- function to check winner

function is_winner() {
    // console.log('checked winner function');

    const win_pattern= [
        [1,2,3], [4,5,6], [7,8,9],
        [1,4,7], [2,5,8], [3,6,9],
        [1,5,9], [3,5,7]
    ];

    if(count_clicks > 4) {
        for(let i in win_pattern) {
            const [x, y, z]= win_pattern[i];

            if(buttons[x-1].innerText === curr_player &&
                buttons[y-1].innerText === curr_player &&
                buttons[z-1].innerText === curr_player) {
                    return true;
                }
        }
    }
    
}


// ---------------------------------------------- check for draw

function is_draw() {
    return count_clicks === 9;
}

// ----------------------------------------------- for grid

function grid_buttons(event) {
    count_clicks++;

    if(event.target.innerText !== '' || game_over) {
        return;
    }
    
    event.target.innerText= curr_player;

    // console.log(event.target.innerText);
    player_turn.innerText= `${curr_player == player1 ? player2_name : player1_name}'s turn`;
    event.target.classList.add(`player-selected`);
    event.target.classList.add(event.target.innerText == player1 ? 'red' : 'green');

    if(is_winner()) {
        player_turn.innerText= `${curr_player === player1 ? player1_name : player2_name} win!`;
        game_over= true;
        game_over_section.classList.toggle('active');
        game_over_msg.innerText= `Congratulations! \n  ${curr_player === player1 ? player1_name : player2_name} \n won this game.`;
        return;
    }

    if(is_draw()) {
        game_over= true;
        player_turn.innerText= 'Draw!';
        game_over_msg.innerText= 'Draw!';
        game_over_section.classList.toggle('active');
        return;
    }

    curr_player= curr_player === player1 ? player2 : player1;
}


// ----------------------------------------------------- for reset button

function reset_game() {
    player_turn.innerText= `${player1_name}'s turn`;
    starting_page.classList.remove('hide');

    game_over= false;
    count_clicks= 0;
    curr_player= player1;

    for(let i=0; i<buttons.length; i++) {
        buttons[i].innerHTML= '';
        buttons[i].classList= '';
        buttons[i].classList.add('btn');
    }

    game_over_section.classList.remove('active');
}



// ---------------------------------------------------- eventlistner

input.forEach(player_name => {
    player_name.addEventListener('click', (event) => player1_name.select())
});

start_game.addEventListener('click', start);

buttons.forEach(button => {
    button.addEventListener('click', grid_buttons);
});

reset_btn.forEach(button => {
    button.addEventListener('click', reset_game);
});

close_btn.addEventListener('click', (event) => {
    game_over_section.classList.remove('active');
});



// console.log(input);