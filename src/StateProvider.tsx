import { Children, createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export type Image = { url: string; rotation: number };
type AppState = { images: Image[], index: number };

type StateContext = {
    state: AppState,
    setState: Dispatch<SetStateAction<AppState>>
}

export const storeContext = createContext<StateContext>({
    state: { 'images': [], index: 0 },
    setState: _ => {}
});

const images: Image[] = [
  'https://pixabay.com/get/g270eabca866bee45a47ffd9cb7720759b947316107f75cb259071bbdb018d21dd833c2c75f9b93458986b0d32c2501e8ab99455190c8862da8a5a610e5bb612d_640.jpg',
  'https://pixabay.com/get/gbd79d11939b1a5f53e4a32d0e52a101c555ee0f904b5bb867b69b35970f5e59c34030383eeef180d58ad3a13b9828954509333e4ff54e254cfe45882a14c2890_640.jpg',
  'https://pixabay.com/get/g834cbd7a99d37031de50711ad1768504b85c6eaeb06b399df7dd0b5057fff4803d88cd63a7ca2214979c01732ad11521e9dc0e96302ccb4e6d64f1827a532614_640.jpg'
].map(img => ({ url: img, rotation: 0 }));

const initialAppState = {
  images,
  index: 0
};

export function StateProvider(props: { children: ReactNode }) {
    const {Provider} = storeContext;  
    
    const [appState, setAppState] = useState<AppState>(initialAppState);

    return <Provider value={
        {
            state: appState,
            setState: setAppState
        }
    }>{props.children}</Provider>
}