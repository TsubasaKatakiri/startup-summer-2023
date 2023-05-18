import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppShell, Container, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import MainPage from './pages/MainPage'
import Favorites from './pages/Favorites'
import HeaderBar from './components/HeaderBar'
import Vacancy from './pages/Vacancy'
import NavAside from './components/NavAside'
import SearchAside from './components/SearchAside'

function App() {
    const theme = useMantineTheme()
    const midDesktop = useMediaQuery('(min-width: 90em)')
    const tablet = useMediaQuery('(max-width: 48em)')

    return (
        <BrowserRouter
            basename={'/startup-summer-2023/'}
        >
            <AppShell
                styles={{
                    main: {
                        background: theme.colors.gray[0],
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '0 0 0 0',
                        paddingTop: tablet ? '50px' : '84px'
                    },
                }}
                header={<HeaderBar />}
                navbar={<NavAside />}
                aside={<SearchAside />}
            >
                <Container
                    w={'100%'}
                    pt={tablet ? '20px' : '40px'}
                    maw={midDesktop ? '90em' : '73em'}
                    h="100%"
                    px={midDesktop ? '162px' : tablet ? '16px' : '26px'}
                >
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/vacancy/:id' element={<Vacancy />} />
                        <Route path='/favorite' element={<Favorites />} />
                    </Routes>
                </Container>
            </AppShell>
        </BrowserRouter>
    )
}

export default App
