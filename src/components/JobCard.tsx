import { FC, useEffect, useState } from 'react'
import { Card, Flex, Text, Box } from '@mantine/core'
import { IconStar, IconStarFilled, IconMapPin } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import useLocalStorageData from '../hooks/use-local-storage'
import { useMediaQuery } from '@mantine/hooks'
import { JobCardData } from '../interfaces/JobCard'

interface IAdditionalProps {
    setFavoriteValue: (id: number) => void
    unsetFavoriteValue: (id: number) => void
    isVacancyPage?: boolean
}

const JobCard: FC<JobCardData & IAdditionalProps> = ({
    id,
    profession,
    town,
    type_of_work,
    payment_to,
    payment_from,
    currency,
    isVacancyPage = false,
    setFavoriteValue,
    unsetFavoriteValue,
}: JobCardData & IAdditionalProps) => {
    const { values } = useLocalStorageData()
    const navigate = useNavigate()
    const [starred, setStarred] = useState<boolean>(false)
    const mobileBig = useMediaQuery('(max-width: 30em)')
    const isMinSalary = payment_from !== 0
    const isMaxSalary = payment_to !== 0

    useEffect(() => {
        if (values.includes(id)) setStarred(true)
    }, [values])

    const controlFavorite = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        e.stopPropagation()
        if (!starred) setFavoriteValue(id)
        else unsetFavoriteValue(id)
        setStarred((prev) => !prev)
    }

    const handleChoice = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
        e.stopPropagation()
        if (!isVacancyPage) navigate(`/vacancy/${id}`)
    }

    return (
        <Card
            data-elem={isVacancyPage ? '' : `vacancy-${id}`}
            mb={isVacancyPage ? 'lg' : 'md'}
            padding={mobileBig ? 'md' : 'xl'}
            radius={'lg'}
            w={'100%'}
            withBorder
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                cursor: isVacancyPage ? 'default' : 'pointer',
            }}
            onClick={handleChoice}
        >
            <Flex
                w={'100%'}
                direction={'row'}
                align={'flex-start'}
                justify={'space-between'}
            >
                <Text
                    fw={isVacancyPage ? 700 : 600}
                    fz={isVacancyPage ? (mobileBig ? '16px' : '28px') : '20px'}
                    lh={isVacancyPage ? '34px' : '24px'}
                    color={isVacancyPage ? '#232134' : 'blue'}
                    mb={isVacancyPage ? '16px' : '12px'}
                >
                    {profession}
                </Text>
                <Box
                    component={'button'}
                    data-elem={`vacancy-${id}-shortlist-button`}
                    style={{
                        width: '24px',
                        height: '24px',
                        backgroundColor: 'transparent',
                        border: '0',
                        cursor: 'pointer',
                        marginLeft: '16px',
                    }}
                    onClick={controlFavorite}
                >
                    {starred ? (
                        <IconStarFilled
                            style={{
                                color: '#5E96FC',
                                minWidth: '24px',
                                minHeight: '24px',
                            }}
                            cursor='pointer'
                        />
                    ) : (
                        <IconStar
                            style={{
                                color: '#ACADB9',
                                minWidth: '24px',
                                minHeight: '24px',
                            }}
                            cursor='pointer'
                        />
                    )}
                </Box>
            </Flex>
            <Text
                fz={isVacancyPage ? (mobileBig ? '14px' : '20px') : '16px'}
                color={'#7B7C88'}
                mb={isVacancyPage ? '16px' : '12px'}
            >
                {(isMinSalary || isMaxSalary) && (
                    <>
                        <Text
                            component={'span'}
                            color="black"
                            fw={isVacancyPage ? 700 : 600}
                            lh={mobileBig ? '16px' : '20px'}
                        >
                            з/п&nbsp;
                            {isMinSalary ? (
                                isMaxSalary ? (
                                    ''
                                ) : (
                                    <span>от </span>
                                )
                            ) : (
                                ''
                            )}
                            {isMinSalary && <span>{payment_from}</span>}
                            {isMaxSalary ? (
                                isMinSalary ? (
                                    '-'
                                ) : (
                                    <span>до </span>
                                )
                            ) : (
                                ''
                            )}
                            {isMaxSalary && <span>{payment_to}</span>}
                            &nbsp;{currency}
                        </Text>
                        &nbsp;&bull;&nbsp;
                    </>
                )}
                <Text
                    component={'span'}
                    color="black"
                    lh={mobileBig ? '16px' : '20px'}
                >
                    {type_of_work.title}
                </Text>
            </Text>
            <Flex direction={'row'} align={'center'}>
                <IconMapPin
                    style={{
                        width: '20px',
                        height: '20px',
                        marginRight: '8px',
                        color: '#ACADB9',
                    }}
                />
                <Text
                    fz={mobileBig ? '14px' : '16px'}
                    lh={mobileBig ? '16px' : '19px'}
                    color='black'
                >
                    {town.title}
                </Text>
            </Flex>
        </Card>
    )
}

export default JobCard