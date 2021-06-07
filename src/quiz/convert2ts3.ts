type Eat = { food: string, type: "EAT" };
type Work = { profession: string, slack: number, type: "WORK" };
type Sleep = { dream: string, duration: number, type: "SLEEP" };

type SomeEvent = Eat | Work | Sleep;

function handleEvent(event: SomeEvent) : string {
    switch (event.type) {
        case 'EAT': return `Enjoy your ${event.food}`;
        case 'SLEEP': return `You will dream about ${event.dream} for ${event.duration} hours`;
        case 'WORK': return `A job in ${event.profession} is tough but you can always ${event.slack}!`;        
    }
}

export default {};