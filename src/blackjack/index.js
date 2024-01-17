import { createDeck, getCard, cardValue, setWinner } from "./usecases";

let deck = [];
const types = ['C', 'D', 'H', 'S'],
      specials = ['A', 'J', 'Q', 'K'];

let playersPoints = [];

//HTML references
const btnGetCard = document.querySelector('#btnGetCard'),
      btnStand = document.querySelector('#btnStand'),
      btnNewGame = document.querySelector('#btnNewGame');

const divPlayersCards = document.querySelectorAll('.divCards'),
      htmlPoints = document.querySelectorAll('small');

const gameIni = ( playersNum = 2 ) => {
    deck = createDeck(types, specials);

    playersPoints = [];
    for ( let i = 0; i < playersNum; i++ ) {
        playersPoints.push(0); 
    }

    htmlPoints.forEach( elem => elem.innerText = 0 );
    divPlayersCards.forEach( elem => elem.innerHTML = '' );

    btnGetCard.disabled = false;
    btnStand.disabled = false;
}

const addPoints = ( card, turn ) => {
    playersPoints[turn] += cardValue(card);
    htmlPoints[turn].innerText = playersPoints[turn];

    return playersPoints[turn];
}

const setCardImg = ( card, turn ) => {
    const imgCard = document.createElement('img');
    imgCard.src = `assets/cards/${ card }.png`;
    imgCard.classList.add('card');
    divPlayersCards[turn].append( imgCard );
}

const computerTurn = ( minPoints ) => {
    let computerPoints = 0;
    do {
        const card = getCard( deck );
        computerPoints = addPoints( card, playersPoints.length - 1 );
        setCardImg( card, playersPoints.length - 1 );

        if ( minPoints > 21 ) break;

    } while( computerPoints < minPoints );
    setWinner( playersPoints );
}

btnGetCard.addEventListener('click', () => {
    const card = getCard( deck );

    const playerPoints = addPoints(card, 0);
    setCardImg( card, 0 );

    if ( playerPoints > 21 ) {
        btnGetCard.disabled = true;
        btnStand.disabled = true;
        computerTurn( playerPoints );
    } else if ( playerPoints === 21 ) {
        btnStand.disabled = true;
        btnGetCard.disabled = true;
        computerTurn( playerPoints );
    } 
});

btnStand.addEventListener('click', () => {
    btnGetCard.disabled = true;
    btnStand.disabled = true;
    computerTurn( playersPoints[0] );
});

btnNewGame.addEventListener('click', () => {
    gameIni();
});






