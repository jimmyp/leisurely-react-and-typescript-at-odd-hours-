export type ApiConfig = {
    loadImages: (term: string) => Promise<PixaResponse>
}

type PixaResponse = { 
    hits: {
        webformatURL: string,
        previewURL: string,
        largeImageURL: string,
    }[] 
};


const apiKey = '18049587-99bf6238de19f175bd7defcf8';
const makeUrl = (term: string) => `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(term)}&image_type=photo&pretty=true`;


export const apiConfig : ApiConfig = {
    loadImages: async (term: string) =>
        {
            const response = await fetch(makeUrl(term));
            const json: PixaResponse = await response.json();
            return json;
        }
}