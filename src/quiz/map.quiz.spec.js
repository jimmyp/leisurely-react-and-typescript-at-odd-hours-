function setValue(object, k, v) {
    return {...object, [k]: v  };
}

describe('Set value to same type', () => {
    it('Does not allow change type', () => {
        const actual = setValue({ foo: 'bar' }, 'foo', 'baz');

        expect(actual).toEqual({ foo: 'baz' });
    });
});