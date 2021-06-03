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
  'https://pixabay.com/get/g0cedebeb050fa1a81f0ae4c8e4af9ed105c554ba2d5fd8f2b99ff048a3f62930e9843b6bbe0f1ec2a901a6144ffa2b18_640.jpg',
  'https://pixabay.com/get/g8b437fa8d4303cd68ac0eb4543bccb0d7f101afef2bae54f6fc83f030430283f32e44800f9ebd92cfd70f757a77c19a1c0a221bcb08f3f4c5bd007520856663c_640.jpg',
  'https://pixabay.com/get/g11a58b624a262c3df0a0d0081dc98b08988056bb4282e3977de70aff4ed6bfaad2ec137838c9ff90d1f1253d1276bde2b23c0ada8091a1caec7ae81244a53862_640.jpg'
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