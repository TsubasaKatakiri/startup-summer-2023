import { FC, useState } from 'react'
import { useGetFavoriteVacanciesQuery } from '../store/vacancyApi'
import SearchResults from '../components/SearchResults'
import { useAppSelector } from '../hooks/redux-hooks'

const Favorites: FC = () => {
    const { favoriteVacancies } = useAppSelector((store) => store.app)
    const [page, setPage] = useState<number>(0)

    const { data, isLoading, isError, isFetching } =
        useGetFavoriteVacanciesQuery(
            { page, ids: favoriteVacancies },
            { skip: favoriteVacancies.length === 0 || !favoriteVacancies }
        )

    return (
        <SearchResults
            data={data}
            isFetching={isFetching}
            isLoading={isLoading}
            isError={isError}
            isSkipped={favoriteVacancies.length === 0 || !favoriteVacancies}
            page={page}
            setPage={setPage}
        />
    )
}

export default Favorites
