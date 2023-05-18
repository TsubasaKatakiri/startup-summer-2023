import { FC, useState } from 'react'
import { Container, Flex, MediaQuery, Paper } from '@mantine/core'
import SearchBar from '../components/SearchBar'
import { useGetAllVacanciesQuery } from '../store/vacancyApi'
import SearchResults from '../components/SearchResults'
import { useAppSelector } from '../hooks/redux-hooks'
import FilterForm from '../components/FilterForm'

const MainPage: FC = () => {
    const { appliedParams, published } = useAppSelector((store) => store.search)
    const [keyword, setKeyword] = useState<string>('')
    const [page, setPage] = useState<number>(0)
    const { data, isLoading, isError, isFetching } = useGetAllVacanciesQuery({
        keyword,
        page,
        payment_from: appliedParams.payment_from,
        payment_to: appliedParams.payment_to,
        catalogues: appliedParams.catalogues,
        published,
    })

    return (
        <Flex direction={'row'} align={'flex-start'}>
            <MediaQuery smallerThan={'md'} styles={{ display: 'none' }}>
                <Container p={0} mr={'28px'}>
                    <Paper p={'lg'} radius={'lg'} w={'315px'} withBorder>
                        <FilterForm />
                    </Paper>
                </Container>
            </MediaQuery>
            <Flex direction={'column'} w={'100%'}>
                <SearchBar keyword={keyword} setKeyword={setKeyword} />
                <SearchResults
                    data={data}
                    isFetching={isFetching}
                    isLoading={isLoading}
                    isError={isError}
                    page={page}
                    setPage={setPage}
                />
            </Flex>
        </Flex>
    )
}

export default MainPage
