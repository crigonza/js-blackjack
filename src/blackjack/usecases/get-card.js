/**
 * Get a card from the deck
 * @param {Array<String>} deck 
 * @returns {String} Return a card
 */

export const getCard = ( deck ) => {
    if ( !deck || deck.length === 0 ) {
        throw new Error('Deck is empty!');
    } 

    return deck.pop();
}