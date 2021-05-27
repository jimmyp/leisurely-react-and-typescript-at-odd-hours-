// keep the types, change the value

// replace 'undefined' with any values in no particular order
// 1) a valid value and make them compile
// 2) try also make it fail

// ==========the commonplace=========
export const num: number = 1;
export const str: string = '';

export const strs: string[] = ['a', 'b'];
export const strs1: Array<string> = ['a', 'b'];

export const maybeNumber: number | undefined | null = 1;
export const empty: {} = { foo: 'bar' };

export const tuple: [string, number, boolean] = ['a', 1, true];









// =====strangeness==========

// uncomment this line and try make it compile
// export const nah: never = undefined;

export const numerish: number | string = 1;

export const digits: 1 | 2 = 2;

export const wild: 3 | 'three' = 'three';

// maps
export const strDict: Record<string, string> = {
    'foo': 'bar',
    'bar': 'blue'
};

export const numDict: Record<number, string> = {
    1: 'bar',
    2: 'tree'
};











// =======mind bend===========

type Food = 'mango' | 'apple' | 'cashew';
type Activity = 'walk' | 'sleep' | 'belly rub';
type Sound = 'oink' | 'meuw';

// interface & type almost inter-exchangeable
interface EatAndSing { voice: Sound, food: Food[] };
interface Active { activity: Activity };

type Props1 = { field1: string };
type Props2 = { fields2: number };

export const pet: EatAndSing & Active = { 'voice': 'meuw', 'food': [ 'apple' ], 'activity': 'belly rub' };

export const pureSinger: Pick<EatAndSing, 'voice'> = { 'voice': 'meuw' };

type Eater = { food: Exclude<Food, 'mango'>, name: string };

 // try different kinds of Food
export const eater: Eater = {
    'food': 'apple',
    'name': 'foodie'
};

// change the type below so the Piglet does not have activity 'walk'
type Piglet = { activity: Exclude<Activity, 'walk'>, food: Food[] };

// export const piglet: Piglet = { activity: 'walk', food: [ 'mango' ] };








//====== madness==========
type Swap<T extends number | string> = T extends string ? number : string;
// const result: Swap<number> = '1';

// define this function
// type guards // unknown types
// first, replace return type 
export function swap<T extends string | number>(son: T): Swap<T> {
    switch (typeof son) {
        case 'string': return Number(son) as any;
        default: return String(son) as any;
    }
}

// inspect the types of inni and issi?
export const inni = swap('1');
export const issi = swap(inni);