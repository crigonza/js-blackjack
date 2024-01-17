import _ from 'underscore';

/**
 * Create a new deck
 * @param {Array<String>} types Example: ['C', 'D', 'H', 'S']
 * @param {Array<String>} specials Example : ['A', 'J', 'Q', 'K']
 * @returns {Array<String>}returns a shuffled new deck
 */

export const createDeck = (types, specials) => {

    if ( !types || types.length === 0 )
        throw new Error('types is not a valid Array of Strings!')

    if ( !specials || specials.length === 0 )
        throw new Error('specials is not a valid Array of Strings!')

    let deck = [];

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