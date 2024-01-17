/**
 * Get the value of the card
 * @param {String} card 
 * @returns {Number} returns the value of the card
 */

export const cardValue = ( card ) => {
    if (!card)
        throw new Error('Missing card!');
    
    const value = card.substring( 0 ,card.length - 1 );
    return ( isNaN( value ) ) ?
            ( value === 'A' ) ? 11 : 10
            : value * 1;
}