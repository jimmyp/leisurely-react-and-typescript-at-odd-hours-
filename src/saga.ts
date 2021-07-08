import { call, put, takeLatest } from 'redux-saga/effects';
import { LoadImagesAction, SetImagesAction, Image, SetAppUserAction, LoadUserAction } from './store';
import { searchImages } from 'pixabay-api';
import { appHistory } from './history';
import { ApiConfig } from './apiConfig';
import { AppUser, getCurrentUser } from './auth';

export function createRootSaga(apiConfig: ApiConfig){
     
    function* rootSaga() {
        yield takeLatest<LoadImagesAction>('loadImages', loadImages);
        yield takeLatest<LoadUserAction>('loadUser', loadUser);
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

    function* loadUser(): Generator<{}> {
        const user = (yield call(getCurrentUser)) as AppUser | undefined;
        if (user != null) {
            yield put<SetAppUserAction>({ type: 'setAppUser', payload: user });
        }
    }

    return rootSaga;
}