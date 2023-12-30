let stopGame = false;
const selectAreaAudio = new Audio('./assets/audio/selectArea.wav');
const errorAudio = new Audio('./assets/audio/error.wav');
const successAudio = new Audio('./assets/audio/success.wav');
const applauseAudio = new Audio('./assets/audio/applause.wav');
let player = 'P1';
let listP1 = [];
let listP2 = [];
let listSelected = [];
const winningMap = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];

function selectArea(n) {

    // ferma il gioco
    if (stopGame) 
        return;

    // skip se l'area è già stata selezionata
    if (listSelected.includes(n)) {
        errorAudio.play();
        return;
    }

    // recupera area dalla DOM
    let area = document.getElementById('area-'+n);

    // save area selezionata
    switch (player) {
        case 'P1': 
            listP1.push(n); 
            area.innerHTML = '<img src="./assets/img/sun.png" alt="sun">';
            break;
        case 'P2': 
            listP2.push(n); 
            area.innerHTML = '<img src="./assets/img/moon.png" alt="moon">';
            break;
    }

    selectAreaAudio.play();

    // salva lista di tutte le aree già selezionate
    listSelected = [...listP1,...listP2];

    // controlla risultato
    for (map of winningMap) {
        let checkWinning = (arr, target) => target.every(v => arr.includes(v));
        if (checkWinning(listP1, map) || checkWinning(listP2, map)) {

            successAudio.play();
            applauseAudio.play();

            let alert = document.getElementById('alert');
            alert.classList.add('alert-success');
            alert.innerText = (player == 'P1' ? 'Player 1' : 'Player 2')+' win!';
            
            // colora area vincente
            for (i in map) {
                document.getElementById('area-'+map[i]).classList.add('win');
            } 

            stopGame = true;          
            return;
        }
    }

    if (listSelected.length == 9) {
        let alert = document.getElementById('alert');
        alert.classList.add('alert-warning');
        alert.innerText = 'Pareggio!';
        stopGame = true;       
        return;         
    }

    // cambia giocatore alla fine del turno
    switch (player) {
        case 'P1': player = 'P2'; break;
        case 'P2': player = 'P1'; break;
    }
}