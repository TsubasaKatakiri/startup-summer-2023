import { FC } from 'react'
import { Button, Flex, Title } from '@mantine/core'
import { ReactComponent as Splash } from '../assets/favorite-empty.svg'
import { Link, useLocation } from 'react-router-dom'

interface ISplashScreenProps {
    text: string
}

const SplashScreen: FC<ISplashScreenProps> = ({ text }: ISplashScreenProps) => {
    const currentPath = useLocation().pathname.split('/')[1]

    return (
        <Flex
            direction={'row'}
            align={'center'}
            justify={'center'}
            h={'100%'}
            w={'100%'}
        >
            <Flex direction={'column'} align={'center'}>
                <Splash />
                <Title my={'32px'} fz={'24px'} lh={'29px'}>
                    {text}
                </Title>
                {(currentPath === 'favorite' || currentPath === 'vacancy') && (
                    <Button
                        component={Link}
                        to='/'
                        variant='light'
                        size={'md'}
                        radius={'md'}
                    >
                        Поиск Вакансий
                    </Button>
                )}
            </Flex>
        </Flex>
    )
}

export default SplashScreen
