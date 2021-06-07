type StateTup<T> = [val: T, setter: (v: T) => void ];
let memoised: Record<number, any> = {};

function useState<T>(id: number, initial: T): StateTup<T> {
    if (!memoised[id]) {
        memoised[id] = initial;
    }

    // in reality the setter method must be a singleton
    return [memoised[id], (v: T) => memoised[id] = v];
}

function component() {
    const [count, setCount] = useState(0, 0);
    console.log(`Current count is ${count}`);
    setCount(count + 1);

    const [name, setName] = useState(1, "George");
    console.log(`Current name is ${name}`);
    setName(name + count);
}

describe('closure', () => {
    it('keeps count of states', () => {
        component();
        component();
        component();

        expect(memoised[0]).toEqual(3);
        expect(memoised[1]).toEqual('George012');
    })
})

export {};
