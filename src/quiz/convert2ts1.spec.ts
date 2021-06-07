const saturdayString = 'Saturday';
const sundayString = 'Sunday';
const saturdayNumber = 6;
const sundayNumber = 7;

export function goToWork(dayOfWeek) {
    if (dayOfWeek === saturdayNumber 
        || dayOfWeek === sundayString
        || dayOfWeek === saturdayNumber
        || dayOfWeek === sundayNumber) {
            throw new Error(`'tis the weekend!`);
        }

    return `Working hard or hardly working?`;
}

describe('go to work', () => {
    it('run', () => {

        console.log(goToWork('Saturday'));
        console.log(goToWork('Sunday'));
        console.log(goToWork(6));
        console.log(goToWork(7));
        console.log(goToWork(5));

    });
});