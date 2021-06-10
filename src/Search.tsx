import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { ImageSize, LoadImagesAction } from "./store";

type Props = {
    search: (term: string, size: ImageSize) => LoadImagesAction
};

type SearchForm = {
    term: string,
    size: ImageSize
}

const validateTerm = {
    gross: (str: string) => ['slime', 'slug'].includes(str?.trim() ?? '') ? 'No gross stuff please' : undefined,
};

function Search(props: Props) {
    const { handleSubmit, register, formState } = useForm<SearchForm>();
    const onSubmit = (data: SearchForm) => props.search(data.term, data.size);
    const errors = formState.errors;

    return <form onSubmit={handleSubmit(onSubmit)} className="search-form">
        <label>
            Search for:
            <input {...register('term', { 
                required: true, 
                minLength: 3,
                validate: validateTerm
                })} />
        </label>
        {errors.term?.message ? <p>{errors.term?.message}</p> : undefined}
        {errors.term?.type === 'minLength' && <p>Term must be at least 3 characters</p>}
        {errors.term?.type === 'required' && <p>Term is required</p>}
        <label>
            Image size:
            <select {...register('size', { required: true })} defaultValue="preview">
                <option value="preview">preview</option>
                <option value="web">web</option>
                <option value="large">large</option>
            </select>
        </label>
        <button type="submit">Search</button>
    </form>
}

export default connect(undefined, {
    search: (term: string, size: ImageSize) => ({ 
        type: 'loadImages', 
        payload: {
            term,
            size
        } 
    } as LoadImagesAction)
})(Search);