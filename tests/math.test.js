const {calculateTip} = require('../src/math');

test('should calculate total with tip', () => {
    const total = calculateTip(10, .3);
    if (total !== 13) {
        throw new Error(`Total should be 13. Got ${total}`);
    }
})

//
//Why test?
//
//-Saves time
// - creates reliable software
//- gives flexibility to developers
// -refactoring
// -collaborating
// -profiling
// - Peace of mind