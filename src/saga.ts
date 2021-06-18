import { call, put, takeLatest } from 'redux-saga/effects';
import { LoadImagesAction, SetImagesAction, Image } from './store';
import { searchImages } from 'pixabay-api';
import { appHistory } from './history';

const apiKey = '18049587-99bf6238de19f175bd7defcf8';
const makeUrl = (term: string) => `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(term)}&image_type=photo&pretty=true`;

export function* rootSaga() {
    yield takeLatest<LoadImagesAction>('loadImages', loadImages);
}

export function* loadImages(
    action: LoadImagesAction
): Generator<{}> {
    const images = (yield call(loadFromPixa, action.payload)) as Image[];

    yield put<SetImagesAction>({ type: 'setImages', payload: images });
}

type PixaResponse = { 
    hits: {
        webformatURL: string,
        previewURL: string,
        largeImageURL: string,
    }[] 
};

async function loadFromPixa({ term, size }: LoadImagesAction['payload']): Promise<Image[]> {
    const response = await fetch(makeUrl(term));
    const json: PixaResponse = await response.json();
    const images: Image[] = json.hits.map(h => ({ 
        url: size === 'web' ? h.webformatURL :
                size === 'large' ? h.largeImageURL : h.previewURL, 
        rotation: 0 
    }));

    return images;
}

async function loadFromPixaSmart({ term, size }: LoadImagesAction['payload']): Promise<Image[]> {
    const response = await searchImages(apiKey, term);

    return response.hits.map(h => ({ url: h.webformatURL, rotation: 0 }));
}