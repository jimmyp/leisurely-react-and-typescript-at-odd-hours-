// task 1. setValue lets us set a new value of the same type to a field
// refine the types to restrict k and v
function setValue<T>(object: T, k: string, v: any): T {
    return {...object, [k]: v  } as T;
}

const actual1 = setValue({ foo: 'bar', num: 1 }, 'foo', 'baz');
const actual2 = setValue({ foo: 'bar', num: 1 }, 'num', 2);
// shouldn't work
const actual3 = setValue({ foo: 'bar', num: 1 }, 'bar', 2);

// task 2. changeValue allow changing the type of value for field k
type UpdateField<T, K extends keyof T, V> = T;

function changeValue<T, K extends keyof T, V>(object: T, k: K, v: V): UpdateField<T, K, V> {
    return {...object, [k]: v  } as any;
}

// these should type check
// const actual4: { foo: Date, num: number } = changeValue(
//     { foo: 'bar', num: 1 }, 
//     'foo', 
//     new Date()
// );
const actual5: { foo: string, num: number } = changeValue(
    { foo: 'bar', num: 1 }, 
    'foo', 
    'this is foo'
);

// task 3. turns an object of values to an object of functions starting with `get`
type Getters<T> = T;
function getters<T extends Record<any, any>>(object: T): Getters<T> {
    let result = {};
    for (const k in object) {
        result = {
            ...result,
            [`get_${k}`]: () => { return object[k]; }
        };
    }

    return result as Getters<T>;
}

type WithGetters = { get_foo: () => string, get_num: () => number };
// below should work
// const withGetters: WithGetters = getters({ foo: 'bar', num: 1 });

export {};