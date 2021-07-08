import { call, put, takeLatest } from 'redux-saga/effects';
import { LoadImagesAction, SetImagesAction, Image } from './store';
import { searchImages } from 'pixabay-api';
import { appHistory } from './history';
import { ApiConfig } from './apiConfig';

export function createRootSaga(apiConfig: ApiConfig){
     
    function* rootSaga() {
        yield takeLatest<LoadImagesAction>('loadImages', loadImages);
    }

    function* loadImages(
        action: LoadImagesAction
    ): Generator<{}> {
        const images = (yield call(loadFromPixa, action.payload)) as Image[];

        yield put<SetImagesAction>({ type: 'setImages', payload: images });
    }

    async function loadFromPixa({ term, size }: LoadImagesAction['payload']): Promise<Image[]> {
        const response = await apiConfig.loadImages(term);
        const images: Image[] = response.hits.map(h => ({ 
            url: size === 'web' ? h.webformatURL :
                    size === 'large' ? h.largeImageURL : h.previewURL, 
            rotation: 0 
        }));

        return images;
    }

    return rootSaga;
}