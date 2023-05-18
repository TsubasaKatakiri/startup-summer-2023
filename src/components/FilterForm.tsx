import { FC, useRef } from 'react'
import {
    Button,
    Flex,
    NumberInput,
    Select,
    Text,
    Title,
    NumberInputHandlers,
    Input,
} from '@mantine/core'
import { IconChevronUp, IconX } from '@tabler/icons-react'
import { useGetAllSpheresQuery } from '../store/vacancyApi'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import {
    applyParams,
    resetSearchParams,
    setCatalogues,
    setPaymentFrom,
    setPaymentTo,
} from '../store/SearchSlice'
import { Industry } from '../types/Industry'
import { IconChevronDown } from '@tabler/icons-react'

const FilterForm: FC = () => {
    const { data, isLoading, isError } = useGetAllSpheresQuery(null)
    const { payment_from, payment_to, catalogues } = useAppSelector(
        (store) => store.search
    )
    const dispatch = useAppDispatch()
    const handlersFrom = useRef<NumberInputHandlers>()
    const handlersTo = useRef<NumberInputHandlers>()

    const setValues = (): void => {
        dispatch(applyParams({ payment_from, payment_to, catalogues }))
    }

    return (
        <form>
            <Flex
                justify={'space-between'}
                align={'center'}
                direction={'row'}
                mb={'32px'}
            >
                <Title fz={20} lh={'20px'} color='black'>
                    Фильтры
                </Title>
                <Flex
                    align={'center'}
                    c='dimmed'
                    onClick={() => dispatch(resetSearchParams())}
                    style={{ cursor: 'pointer' }}
                >
                    <Text c='dimmed' fz={14} lh={'20px'} pr={'4px'}>
                        Сбросить все
                    </Text>
                    <IconX width={'16px'} height={'16px'} />
                </Flex>
            </Flex>
            <Input.Wrapper>
                <Input.Label fz={16} lh={'19px'} fw={700} mb={8}>
                    Отрасль
                </Input.Label>
                <Select
                    data-elem='industry-select'
                    placeholder={
                        isLoading
                            ? 'Загружаем...'
                            : isError
                            ? 'Ошибка загрузки'
                            : 'Выберите отрасль'
                    }
                    disabled={!data || isLoading || isError}
                    onChange={(e: string) => dispatch(setCatalogues(e))}
                    rightSection={
                        <IconChevronDown
                            width={24}
                            height={24}
                            color='#ACADB9'
                        />
                    }
                    styles={{ rightSection: { pointerEvents: 'none' } }}
                    value={catalogues}
                    data={
                        data
                            ? data.map((industry: Industry) => {
                                  return {
                                      value: industry.key,
                                      label: industry.title_trimmed,
                                  }
                              })
                            : [{ value: '', label: '' }]
                    }
                    size={'md'}
                    radius={'md'}
                    mb={'lg'}
                />
            </Input.Wrapper>
            <Input.Wrapper>
                <Input.Label fz={16} lh={'19px'} fw={700} mb={8}>
                    Оклад
                </Input.Label>
                <NumberInput
                    data-elem='salary-from-input'
                    placeholder='От'
                    value={payment_from}
                    onChange={(e: number | '') => dispatch(setPaymentFrom(e))}
                    rightSection={
                        <Flex direction='column' w={36} align={'center'}>
                            <IconChevronUp
                                width={12}
                                height={12}
                                color='#ACADB9'
                                cursor={'pointer'}
                                onClick={() =>
                                    handlersFrom.current?.increment()
                                }
                            />
                            <IconChevronDown
                                width={12}
                                height={12}
                                color='#ACADB9'
                                cursor={'pointer'}
                                onClick={() =>
                                    handlersFrom.current?.decrement()
                                }
                            />
                        </Flex>
                    }
                    handlersRef={handlersFrom}
                    size={'md'}
                    radius={'md'}
                    mb={'8px'}
                />
            </Input.Wrapper>
            <NumberInput
                data-elem='salary-to-input'
                placeholder='До'
                value={payment_to}
                onChange={(e: number | '') => dispatch(setPaymentTo(e))}
                rightSection={
                    <Flex direction='column' w={36} align={'center'}>
                        <IconChevronUp
                            width={12}
                            height={12}
                            color='#ACADB9'
                            cursor={'pointer'}
                            onClick={() => handlersTo.current?.increment()}
                        />
                        <IconChevronDown
                            width={12}
                            height={12}
                            color='#ACADB9'
                            cursor={'pointer'}
                            onClick={() => handlersTo.current?.decrement()}
                        />
                    </Flex>
                }
                handlersRef={handlersTo}
                size={'md'}
                radius={'md'}
                mb={'lg'}
            />
            <Button data-elem='search-button' radius={'md'} size={'md'} w={'100%'} onClick={setValues}>
                Применить
            </Button>
        </form>
    )
}

export default FilterForm
