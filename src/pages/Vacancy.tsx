import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSingleVacancyQuery } from '../store/vacancyApi'
import JobCard from '../components/JobCard'
import {
    Flex,
    Loader,
    Paper,
    TypographyStylesProvider,
    Container,
} from '@mantine/core'
import { usePreloaderHeight } from '../hooks/use-preloader-height'
import useLocalStorageData from '../hooks/use-local-storage'
import SplashScreen from '../components/SplashScreen'
import { VacancySingle } from '../types/VacancyOutput'

const Vacancy: FC = () => {
    const vacancyId = useParams().id || ''
    const { data, isLoading, isError } = useGetSingleVacancyQuery(vacancyId)
    const { setValue, unsetValue } = useLocalStorageData()
    const preloaderHeight = usePreloaderHeight()

    function isValidVacancy(vacancy: VacancySingle): vacancy is VacancySingle {
        return !!vacancy.id && !!vacancy.profession
    }

    return (
        <Container>
            {preloaderHeight && isLoading && (
                <Flex
                    h={preloaderHeight}
                    w={'100%'}
                    align={'center'}
                    justify={'center'}
                >
                    <Loader size="xl" />
                </Flex>
            )}
            {isError && (
                <SplashScreen
                    text={'Упс, запрошенная Вами вакансия не найдена.'}
                />
            )}
            {data && !isValidVacancy(data) && (
                <SplashScreen text={'Упс, что-то пошло не так.'} />
            )}
            {data && isValidVacancy(data) && (
                <>
                    <JobCard
                        key={data.id}
                        id={data.id}
                        profession={data.profession}
                        firm_name={data.firm_name}
                        town={data.town}
                        type_of_work={data.type_of_work}
                        payment_to={data.payment_to}
                        payment_from={data.payment_from}
                        currency={data.currency}
                        isVacancyPage={true}
                        setFavoriteValue={setValue}
                        unsetFavoriteValue={unsetValue}
                    />
                    <Paper radius={'lg'} p={'lg'}>
                        <TypographyStylesProvider>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: data.vacancyRichText,
                                }}
                            />
                        </TypographyStylesProvider>
                    </Paper>
                </>
            )}
        </Container>
    )
}

export default Vacancy
