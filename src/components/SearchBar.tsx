import { FC } from 'react'
import {
    Button,
    Flex,
    MantineProvider,
    MediaQuery,
    TextInput,
} from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { useAppDispatch } from '../hooks/redux-hooks'
import { switchSearchOptions } from '../store/AppSlice'
import { useInputState, useMediaQuery } from '@mantine/hooks'

interface IProps {
    keyword: string
    setKeyword: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar: FC<IProps> = ({ keyword, setKeyword }: IProps) => {
    const tablet = useMediaQuery('(max-width: 48em)')
    const mobileBig = useMediaQuery('(max-width: 30em)')
    const [search, setSearch] = useInputState<string>(keyword)
    const dispatch = useAppDispatch()

    const openSearchOptions = () => {
        dispatch(switchSearchOptions(true))
    }

    return (
        <MantineProvider
            theme={{
                colors: {
                    blue: [
                        '#eef4fe',
                        '#deeafe',
                        '#bed5fd',
                        '#9ec0fd',
                        '#7eabfc',
                        '#6ea0fc',
                        '#5E96FC',
                        '#4b78c9',
                        '#385a97',
                        '#253c64',
                    ],
                    gray: [
                        '#F7F7F8',
                        '#F5F5F6',
                        '#EAEBED',
                        '#EAEBED',
                        '#EAEBED',
                        '#ACADB9',
                        '#EAEBED',
                        '#7B7C88',
                        '#EAEBED',
                        '#000000',
                    ],
                },
            }}
        >
            <Flex>
                <TextInput
                    data-elem='search-input'
                    placeholder='Введите название вакансии'
                    icon={<IconSearch size={'16px'} />}
                    w={'100%'}
                    size={tablet ? (mobileBig ? 'sm' : 'md') : 'lg'}
                    radius={'md'}
                    mb={'md'}
                    value={search}
                    onChange={setSearch}
                    rightSection={
                        <Button
                            data-elem='search-button'
                            size={tablet ? 'xs' : 'sm'}
                            radius={'md'}
                            onClick={() => setKeyword(search)}
                        >
                            Поиск
                        </Button>
                    }
                    rightSectionWidth={
                        tablet ? (mobileBig ? '70px' : '80px') : '96px'
                    }
                ></TextInput>
                <MediaQuery largerThan={'md'} styles={{ display: 'none' }}>
                    <Button
                        size={tablet ? (mobileBig ? 'sm' : 'md') : 'lg'}
                        radius={'md'}
                        ml={tablet ? 'xs' : 'sm'}
                        onClick={openSearchOptions}
                    >
                        Опции
                    </Button>
                </MediaQuery>
            </Flex>
        </MantineProvider>
    )
}

export default SearchBar
