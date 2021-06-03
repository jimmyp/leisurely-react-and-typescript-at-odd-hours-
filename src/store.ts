import { AnyAction, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

export type Image = { url: string; rotation: number };
export type AppState = { images: Image[], index: number };
const images: Image[] = [
  'https://pixabay.com/get/g0cedebeb050fa1a81f0ae4c8e4af9ed105c554ba2d5fd8f2b99ff048a3f62930e9843b6bbe0f1ec2a901a6144ffa2b18_640.jpg',
  'https://pixabay.com/get/g8b437fa8d4303cd68ac0eb4543bccb0d7f101afef2bae54f6fc83f030430283f32e44800f9ebd92cfd70f757a77c19a1c0a221bcb08f3f4c5bd007520856663c_640.jpg',
  'https://pixabay.com/get/g11a58b624a262c3df0a0d0081dc98b08988056bb4282e3977de70aff4ed6bfaad2ec137838c9ff90d1f1253d1276bde2b23c0ada8091a1caec7ae81244a53862_640.jpg'
].map(img => ({ url: img, rotation: 0 }));

export const initialAppState = {
  images,
  index: 0
};

export const store = createStore(reducer, initialAppState, composeWithDevTools());

// (State, Action) -> State
function reducer(state: AppState = initialAppState, action: AnyAction): AppState {
    return state;
}