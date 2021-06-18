type Foo = 'foo';
type Weekend = 'Saturday' | 'Sunday';

type Weekday = 'Friday' | 'Saturday' | 'Sunday';

type X<T, V> = [(T extends V ? [T] : never)];

type Y = X<Weekend, Weekend>;

// type LengthFunc<T> = (str: T) => `${typeof str}`;



export const obj = { 
    foo: '123',
    bar: new Date(),
};

type TypeOfObj = typeof obj;
type KeyOfObj = keyof TypeOfObj;

type Mapped = {
    [K in KeyOfObj]: TypeOfObj[K]
};

const obj1 = { baz: 1 };

type Cond<T> = T extends { bar: infer U } 
                ? U 
                : T extends { baz: infer V } ? V : never;

const valOfBar: Cond<typeof obj1> = 1;

// const key: TypeOfObj = 