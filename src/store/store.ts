import { configureStore } from '@reduxjs/toolkit'
import { AppReducer } from './AppSlice'
import { SearchReducer } from './SearchSlice'
import { vacancyAPI } from './vacancyApi'

const store = configureStore({
    reducer: {
        app: AppReducer,
        search: SearchReducer,
        [vacancyAPI.reducerPath]: vacancyAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(vacancyAPI.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store };