import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    Header,
    Text,
    Flex,
    Burger,
    MediaQuery,
    Container,
} from '@mantine/core'
import { ReactComponent as Logo } from '../assets/logo.svg'
import { useMediaQuery } from '@mantine/hooks'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { switchNavmenu } from '../store/AppSlice'

const HeaderBar: FC = () => {
    const midDesktop = useMediaQuery('(min-width: 90em)')
    const tablet = useMediaQuery('(max-width: 48em)')
    const currentPath = useLocation().pathname.split('/')[1]
    const { isNavmenuOpened } = useAppSelector((state) => state.app)
    const dispatch = useAppDispatch()

    const switchNavigation = (): void => {
        dispatch(switchNavmenu(!isNavmenuOpened))
    }

    return (
        <Header
            height={{ base: 50, sm: 84 }}
            p={'md'}
            withBorder={false}
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                padding: '0',
            }}
        >
            <Flex
                align='center'
                justify='space-between'
                w={'100%'}
                maw={midDesktop ? '90em' : '73em'}
                h={'100%'}
                px={midDesktop ? '162px' : tablet ? '16px' : '26px'}
            >
                <MediaQuery largerThan='md' styles={{ display: 'none' }}>
                    <Burger
                        opened={isNavmenuOpened}
                        onClick={switchNavigation}
                        size={'sm'}
                        mr={'xl'}
                        ml={'0'}
                    />
                </MediaQuery>
                <Link to='/' style={{ display: 'flex', alignItems: 'center' }}>
                    <Logo />
                </Link>
                <MediaQuery largerThan={'md'} styles={{ display: 'none' }}>
                    <Container w={'28px'} h={'28px'} ml={'xl'} mr={'0'} />
                </MediaQuery>
                <MediaQuery smallerThan={'md'} styles={{ display: 'none' }}>
                    <Flex justify='flex-start' ml={280} w={'100%'} h={'auto'}>
                        <Flex>
                            <Text
                                component={Link}
                                to='/'
                                mr={'60px'}
                                fw={500}
                                fz={'16px'}
                                lh={'20px'}
                                color={
                                    currentPath !== 'favorite'
                                        ? '#5E96FC'
                                        : 'black'
                                }
                            >
                                Поиск вакансий
                            </Text>
                            <Text
                                component={Link}
                                to='/favorite'
                                fw={500}
                                fz={'16px'}
                                lh={'20px'}
                                color={
                                    currentPath === 'favorite'
                                        ? '#5E96FC'
                                        : 'black'
                                }
                            >
                                Избранное
                            </Text>
                        </Flex>
                    </Flex>
                </MediaQuery>
            </Flex>
        </Header>
    )
}

export default HeaderBar
