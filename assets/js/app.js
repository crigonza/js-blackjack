const mainModule = (() => {
    'use strict'

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
        deck = createDeck();

        playersPoints = [];
        for ( let i = 0; i < playersNum; i++ ) {
            playersPoints.push(0); 
        }

        htmlPoints.forEach( elem => elem.innerText = 0 );
        divPlayersCards.forEach( elem => elem.innerHTML = '' );

        btnGetCard.disabled = false;
        btnStand.disabled = false;
    }

    const createDeck = () => {

        deck = [];
        for( let i = 2; i <= 10; i++ ) {
            for( let type of types ) {
                deck.push( i + type );
            }
        }

        for( let type of types ) {
            for( let esp of specials ) {
                deck.push( esp + type );
            }
        }

        return _.shuffle(deck);
    }

    const getCard = () => {
        if ( deck.length === 0 ) {
            throw 'Deck is empty!';
        } 

        return deck.pop();
    }

    const cardValue = ( card ) => {
        const value = card.substring( 0 ,card.length - 1 );
        return ( isNaN( value ) ) ?
                ( value === 'A' ) ? 11 : 10
                : value * 1;
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
            const card = getCard();
            computerPoints = addPoints( card, playersPoints.length - 1 );
            setCardImg( card, playersPoints.length - 1 );

            if ( minPoints > 21 ) break;

        } while( computerPoints < minPoints );
        setWinner();
    }

    const setWinner = () => {

        const [ playerPoints, computerPoints ] = playersPoints;

        setTimeout(() => {
            if ( playerPoints === computerPoints) {
                alert('Nobody wins!');
            } else if ( playerPoints > 21 ) {
                alert('Computer wins!');
            } else if ( computerPoints > 21 ) {
                alert('Player wins!');
            } else {
                alert('Computer wins!');
            }
        }, 100);
    }

    btnGetCard.addEventListener('click', () => {
        const card = getCard();

        const playerPoints = addPoints(card, 0);
        setCardImg( card, 0 );

        if ( playerPoints > 21 ) {
            console.warn('Player Lose!');
            btnGetCard.disabled = true;
            btnStand.disabled = true;
            computerTurn( playerPoints );
        } else if ( playerPoints === 21 ) {
            console.warn('21, great!!!');
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

    return {
        newGame : gameIni
    };
    
})();




