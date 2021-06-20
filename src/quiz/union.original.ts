type MessageKind = 'Create' | 'Read' | 'Update' | 'Delete';
type Message<T> = {
    kind: MessageKind,
    payload: T
};

type EventType = 'CREATE' | 'GET' | 'UPDATE' | 'REMOVE';
type Event<T> = {
    type: EventType,
    body: T
};

type UniformEventType = 'create' | 'read' | 'update' | 'delete';

// 0) refine this type to avoid the problem in the implementation 
// as a contrived example. you'll wonder what to do in types or values
type MapToUniformType = {
    [K in MessageKind | EventType]: UniformEventType
};

const allTypes: MapToUniformType = {
    'CREATE': 'create',
    'Create': 'create',
    'UPDATE': 'update',
    'Update': 'update',
    'Read': 'read',
    'GET': 'delete',    // this is incorrect
    'REMOVE': 'delete',
    'Delete': 'delete'
};

type ToUniformType<T extends MessageKind | EventType> = MapToUniformType[T];

function toUniformType(ty: MessageKind | EventType): ToUniformType<typeof ty> {
    return allTypes[ty];
}

type EventOrMessage<T> = {
    type: UniformEventType,
    body: T
};

// 1) use type narrowing
function map<T>(eom: Event<T> | Message<T>): EventOrMessage<T> {
    if ('kind' in eom) {
        return {
            type: toUniformType(eom.kind),
            body: eom.payload
        };
    }

    return {
        type: toUniformType(eom.type),
        body: eom.body
    };
}

// 2) use a type guard
function map2<T>(eom: Event<T> | Message<T>): EventOrMessage<T> {
    return isMessage(eom)
        ? { type: toUniformType(eom.kind), body: eom.payload }
        : { type: toUniformType(eom.type), body: eom.body };
}

function isMessage<T>(eom: Event<T> | Message<T>): eom is Message<T> {
    return 'kind' in eom;
}

function isEvent<T>(eom: Event<T> | Message<T>): eom is Event<T> {
    return 'type' in eom;
}

export {};