import { createApi } from '@reduxjs/toolkit/query/react'
import { SearchData } from '../types/SearchData'
import { FavoritesData } from '../types/FavoritesData'
import { baseQueryWithReauth } from './baseApiQuery'
import { VacancyOutput, VacancySingle } from '../types/VacancyOutput'
import { Industry } from '../types/Industry'
import { RESULTS_PER_PAGE } from '../constants/constants'

export const vacancyAPI = createApi({
    reducerPath: 'vacancy',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getAllVacancies: builder.query<VacancyOutput, SearchData>({
            query: (data: SearchData) => ({url: `2.0/vacancies/`, params: {...data, count: RESULTS_PER_PAGE}})
        }),
        getAllSpheres: builder.query<Industry[], null>({
            query: () => `2.0/catalogues/`,
        }),
        getSingleVacancy: builder.query<VacancySingle, string>({
            query: (id: string) => `2.0/vacancies/${id}`,
        }),
        getFavoriteVacancies: builder.query<VacancyOutput, FavoritesData>({
            query: (data: FavoritesData) => ({url: `2.0/vacancies/?${(data.ids.map(id => 'ids[]=' + id)).join('&')}`, params: {page: data.page, count: RESULTS_PER_PAGE}}),
        }),
    })
})

export const { useGetAllVacanciesQuery, useGetAllSpheresQuery, useGetSingleVacancyQuery, useGetFavoriteVacanciesQuery } = vacancyAPI