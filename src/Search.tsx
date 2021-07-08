import { Button, createStyles, FormControl, FormHelperText, Grid, InputLabel, makeStyles, Select, TextField, Typography } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { ImageSize, LoadImagesAction } from "./store";

type Props = {
};

type SearchForm = {
    term: string,
    size: ImageSize
}

const validateTerm = {
    gross: (str: string) => ['slime', 'slug'].includes(str?.trim() ?? '') ? 'No gross stuff please' : undefined,
};

const formStyles = makeStyles({
    root: {
        padding: '15px 50px 15px 50px',
        backgroundColor: 'silver',
        borderRadius: '5px',
    }
});

function Search(props: Props) {
    const appHistory = useHistory();
    const { handleSubmit, register, formState, control } = useForm<SearchForm>();
    const onSubmit = (data: SearchForm) => appHistory.push(`/photos/${data.term}/${data.size}`);
    const errors = formState.errors;
    const styles = formStyles();

    return <div className={styles.root}>                
        <form onSubmit={handleSubmit(onSubmit)} className="search-form">
            <FormControl fullWidth margin="normal">
                <Typography variant="h5">Search for:</Typography>
                <Controller
                    name="term" 
                    control={control}
                    defaultValue=""
                    rules={ 
                        {
                            required: true, 
                            minLength: 3,
                            validate: validateTerm
                        }
                    }
                    render={({ field }) => <TextField
                        {...field} 
                        /> 
                    }
                />
                <FormHelperText>
                    {errors.term?.message ? errors.term?.message : undefined}
                    {errors.term?.type === 'minLength' && 'Term must be at least 3 characters'}
                    {errors.term?.type === 'required' && 'Term is required'}
                </FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <Typography variant="h5">Image size:</Typography>
                <Controller
                    name="size"
                    rules={{required: true}}
                    defaultValue="web"
                    control={control}
                    render={({ field }) => <Select
                        native 
                        {...field}>
                        <option value="preview">preview</option>
                        <option value="web">web</option>
                        <option value="large">large</option>
                    </Select>
                    }
                />
            </FormControl>
            <Button type="submit" variant="contained" color="primary">Search</Button>
        </form>
    </div>;
}

export default Search;
