/**
 * Set the winner of the round
 * @param {Array<Number>} playersPoints 
 */

export const setWinner = ( playersPoints ) => {

    const [ playerPoints, computerPoints ] = playersPoints;

    setTimeout(() => {
        if ( playerPoints === computerPoints) {
            alert('Nobody wins!');
        } else if ( playerPoints > 21 ) {
            alert('CPU wins!');
        } else if ( computerPoints > 21 ) {
            alert('You wins!');
        } else {
            alert('Computer wins!');
        }
    }, 100);
}