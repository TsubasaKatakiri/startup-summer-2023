import { FC } from 'react'
import { IconX } from '@tabler/icons-react'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { Aside, Flex, MediaQuery, Text } from '@mantine/core'
import { switchSearchOptions } from '../store/AppSlice'
import FilterForm from './FilterForm'

const SearchAside: FC = () => {
    const { isSearchOptionsOpened } = useAppSelector((state) => state.app)
    const dispatch = useAppDispatch()

    const closeSearchOptions = () => {
        dispatch(switchSearchOptions(false))
    }

    return (
        <MediaQuery largerThan={'md'} styles={{ display: 'none' }}>
            <Aside p={'md'} hidden={!isSearchOptionsOpened} w={320}>
                <Flex
                    direction={'row'}
                    align={'center'}
                    justify={'space-between'}
                    w={'100%'}
                    mb={'lg'}
                >
                    <Text fz={'xl'} fw={700} color='blue'>
                        Опции поиска
                    </Text>
                    <IconX
                        cursor={'pointer'}
                        width={'24px'}
                        height={'24px'}
                        onClick={closeSearchOptions}
                    />
                </Flex>
                <FilterForm />
            </Aside>
        </MediaQuery>
    )
}

export default SearchAside
