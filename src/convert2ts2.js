const eventTypeEat = 'EAT';
const eventTypeWork = 'WORK';
const eventTypeSleep = 'SLEEP';

function handleEvent(event) {
    switch (event.type) {
        case eventTypeEat: return `Enjoy your ${event.food}`;
        case eventTypeSleep: return `You will dream about ${event.dream} for ${event.duration} hours`;
        case eventTypeWork: return `A job in ${event.profession} is tough but you can always ${event.slack}!`;
        default: throw new Error(`I cannot handle this event`);
    }
}

console.log(handleEvent({ type: eventTypeEat, food: 'Pizza' }));
console.log(handleEvent({ type: eventTypeSleep, dream: 'Surfing', duration: 10 }));
console.log(handleEvent({ type: eventTypeWork, profession: 'software', slack: `play games` }));
console.log(handleEvent({ type: 2, style: 'wishful' }));

