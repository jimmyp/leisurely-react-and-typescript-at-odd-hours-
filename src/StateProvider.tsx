// import { Children, createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";


// type StateContext = {
//     state: AppState,
//     setState: Dispatch<SetStateAction<AppState>>
// }

// export const storeContext = createContext<StateContext>({
//     state: { 'images': [], index: 0 },
//     setState: _ => {}
// });

// export function StateProvider(props: { children: ReactNode }) {
//     const {Provider} = storeContext;  
    
//     const [appState, setAppState] = useState<AppState>(initialAppState);

//     return <Provider value={
//         {
//             state: appState,
//             setState: setAppState
//         }
//     }>{props.children}</Provider>
// }

export {}