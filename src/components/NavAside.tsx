import { FC } from 'react'
import { MediaQuery, Navbar, Text } from '@mantine/core'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { Link, useLocation } from 'react-router-dom'
import { switchNavmenu } from '../store/AppSlice'

const NavAside: FC = () => {
    const { isNavmenuOpened } = useAppSelector((state) => state.app)
    const currentPath = useLocation().pathname.split('/')[1]
    const dispatch = useAppDispatch()

    const closeNavigation = () => {
        dispatch(switchNavmenu(false))
    }

    return (
        <MediaQuery largerThan={'md'} styles={{ display: 'none' }}>
            <Navbar p={'md'} hidden={!isNavmenuOpened} w={320}>
                <Text fz={'xl'} fw={700} color='blue' mb={'lg'}>
                    Меню
                </Text>
                <Text
                    component={Link}
                    onClick={closeNavigation}
                    to='/'
                    mb={'md'}
                    color={currentPath === '' ? 'blue' : 'black'}
                >
                    Поиск вакансий
                </Text>
                <Text
                    component={Link}
                    onClick={closeNavigation}
                    to='/favorite'
                    color={currentPath === 'favorite' ? 'blue' : 'black'}
                >
                    Избранное
                </Text>
            </Navbar>
        </MediaQuery>
    )
}

export default NavAside
