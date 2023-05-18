import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IAppState{
    isNavmenuOpened: boolean,
    isSearchOptionsOpened: boolean,
    favoriteVacancies: number[],
}

const initialState : IAppState = {
    isNavmenuOpened: false,
    isSearchOptionsOpened: false,
    favoriteVacancies: []
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        switchNavmenu: (state: IAppState, action: PayloadAction<boolean>) => {
            state.isNavmenuOpened = action.payload;
            state.isSearchOptionsOpened = false;
        },
        switchSearchOptions: (state: IAppState, action: PayloadAction<boolean>) => {
            state.isSearchOptionsOpened = action.payload;
            state.isNavmenuOpened = false;
        },
        setFavoriteVacancies: (state: IAppState, action: PayloadAction<number[]>) => {
            state.favoriteVacancies = action.payload;
        },
    }
})

export const AppReducer = appSlice.reducer;

export const { switchNavmenu, switchSearchOptions, setFavoriteVacancies } = appSlice.actions;