import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpClient from '../api/httpClient';
import { allCocktails } from '../api/urls';

const initialState = {
    cocktails:[],
    cocktail:[],
    loading:false,
    error:null
}

export const fetchCocktails = createAsyncThunk(
    'fetchCocktails',
    async () => {
        const response = await httpClient.getAll(allCocktails);
        return response.data.drinks;
    }
);

export const cocktailSlice = createSlice({
    name : "cocktailSlice",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(fetchCocktails.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(fetchCocktails.rejected, (state, action) => {     
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchCocktails.fulfilled, (state, action) => {
            state.cocktails = action.payload;
            state.loading = false;    
        })
    }
});

export const cocktailSelector = (state) => state.cocktails;
export default cocktailSlice.reducer;
