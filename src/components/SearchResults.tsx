import React, { FC, useEffect } from 'react'
import { Flex, Loader, Pagination } from '@mantine/core'
import SplashScreen from './SplashScreen'
import JobCard from './JobCard'
import { usePreloaderHeight } from '../hooks/use-preloader-height'
import useLocalStorageData from '../hooks/use-local-storage'
import { VacancyOutput } from '../types/VacancyOutput'
import { RESULTS_PER_PAGE } from '../constants/constants'

interface IProps {
    data?: VacancyOutput 
    isFetching: boolean
    isLoading: boolean
    isError: boolean
    isSkipped?: boolean
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
}

const SearchResults: FC<IProps> = ({
    data,
    isFetching,
    isLoading,
    isError,
    isSkipped = false,
    page,
    setPage,
}: IProps) => {
    const preloaderHeight = usePreloaderHeight()
    const { setValue, unsetValue } = useLocalStorageData()

    useEffect(() => {
        if(data && data.objects.length === 0 && page > 0) setPage(prev => prev - 1);
    }, [data, page])

    return (
        <Flex w={'100%'} direction={'column'} align={'center'}>
            {preloaderHeight && isLoading && (
                <Flex
                    h={preloaderHeight}
                    w={'100%'}
                    align={'center'}
                    justify={'center'}
                >
                    <Loader size={'xl'} />
                </Flex>
            )}
            {isError && <SplashScreen text={'Упс, что-то пошло не так.'} />}
            {((data && data.objects.length === 0) || isSkipped) && (
                <SplashScreen text={'Упс, здесь еще ничего нет!'} />
            )}
            {data && data.objects.length > 0 && !isSkipped && (
                <>
                    {preloaderHeight && isFetching && (
                        <Flex
                            h={preloaderHeight}
                            w={'100%'}
                            align={'center'}
                            justify={'center'}
                        >
                            <Loader size={'xl'} />
                        </Flex>
                    )}
                    {!isFetching &&
                        data.objects.map((vacancy: any) => {
                            return (
                                <JobCard
                                    key={vacancy.id}
                                    id={vacancy.id}
                                    profession={vacancy.profession}
                                    firm_name={vacancy.firm_name}
                                    town={vacancy.town}
                                    type_of_work={vacancy.type_of_work}
                                    payment_to={vacancy.payment_to}
                                    payment_from={vacancy.payment_from}
                                    currency={vacancy.currency}
                                    setFavoriteValue={setValue}
                                    unsetFavoriteValue={unsetValue}
                                />
                            )
                        })}
                    <Pagination
                        total={Math.ceil(
                            (data.total > 500 ? 500 : data.total) /
                                RESULTS_PER_PAGE
                        )}
                        siblings={1}
                        boundaries={1}
                        onChange={(e: number) => setPage(e - 1)}
                        mt={'16px'}
                        mb={'44px'}
                    />
                </>
            )}
        </Flex>
    )
}

export default SearchResults