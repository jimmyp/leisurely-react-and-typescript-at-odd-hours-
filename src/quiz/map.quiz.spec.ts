function setValue<T, K extends keyof T>(object: T, k: K, v: T[K]): T {
    return {...object, [k]: v  } as T;
}

type UpdateField<T, K extends keyof T, V> = {
    [K1 in keyof T]: K1 extends K ? V : T[K1]
};

function changeValue<T, K extends keyof T, V>(object: T, k: K, v: V): UpdateField<T, K, V> {
    return {...object, [k]: v  } as any;
}

type UpsertField<T, K extends number | string, V > = T & { [K1 in K]: V}

function upsertValue<T, K extends number | string, V>(
    object: T,
    k: K,
    v: V
): UpsertField<T, K, V> {
    return {...object, [k]: v  } as any;
}

describe('Map type', () => {
    it('Set value by same type', () => {
        const actual = setValue({ foo: 'bar', num: 1 }, 'foo', 'baz');

        expect(actual).toEqual({ foo: 'baz', num: 1 });
    });
    it('Set value by different type', () => {
        let actual: { foo: Date, num: number };
        const date = new Date();
        actual = changeValue({ foo: 'bar', num: 1 }, 'foo', date);

        expect(actual).toEqual({ foo: date, num: 1 });
    });

    it('Upsert key: must be same value type if key exists', () => {
        let actual: { foo: string, num: number, bar: Date };

        const date = new Date();
        actual = upsertValue({ foo: 'bar', num: 1 }, 'bar', date);

        expect(actual).toEqual({ foo: 'bar', num: 1, bar: date });
    });
});

export {};