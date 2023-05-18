import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppliedSearchParams } from '../types/AppliedSearchParams';

interface ISearchState{
    payment_from: number | '',
    payment_to: number | '',
    catalogues?: string,
    published?: number,
    appliedParams: {
        payment_from?: number,
        payment_to?: number,
        catalogues?: string,
    }
}

const initialState : ISearchState = {
    payment_from: '',
    payment_to: '',
    catalogues: '33',
    published: 1,
    appliedParams: {
        payment_from: undefined,
        payment_to: undefined,
        catalogues: undefined,
    }
}

const searchSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setCatalogues: (state: ISearchState, action: PayloadAction<string>) => {
            state.catalogues = action.payload
        },
        setPaymentFrom: (state: ISearchState, action: PayloadAction<number | ''>) => {
            state.payment_from = action.payload
        },
        setPaymentTo: (state: ISearchState, action: PayloadAction<number | ''>) => {
            state.payment_to = action.payload
        },
        applyParams: (state: ISearchState, action: PayloadAction<AppliedSearchParams>) => {
            state.appliedParams.payment_from = action.payload.payment_from === '' ? undefined : action.payload.payment_from
            state.appliedParams.payment_to = action.payload.payment_to === '' ? undefined : action.payload.payment_to
            state.appliedParams.catalogues = action.payload.catalogues === '' ? undefined : action.payload.catalogues
        },
        resetSearchParams: (state: ISearchState) => {
            state.payment_from = ''
            state.payment_to = ''
            state.catalogues = '33'
            state.appliedParams = {
                payment_from: undefined,
                payment_to: undefined,
                catalogues: undefined,
            }
        },
    }
})

export const SearchReducer = searchSlice.reducer

export const { setCatalogues, setPaymentFrom, setPaymentTo, applyParams, resetSearchParams } = searchSlice.actions