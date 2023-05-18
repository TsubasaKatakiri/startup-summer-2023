import { useEffect, useState } from 'react'

const HEADER_HEIGHT_SMALL = 50
const HEADER_HEIGHT_BIG = 82
const UPPER_PAGE_BORDER_GAP = 116
const LOWER_PAGE_BORDER_GAP = 40

const TABLET_PAGE_WIDTH = 768

export const usePreloaderHeight = () : number | null => {
    const [pageHeight, setPageHeight] = useState<number>(window.innerHeight)
    const [pageWidth, setPageWidth] = useState<number>(window.innerWidth)
    const [headerHeight, setHeaderHeight] = useState<number>(innerHeight)
    const [preloaderHeight, setPreloaderHeight] = useState<number | null>(null)

    useEffect(() => {
        setPreloaderHeight(pageHeight - headerHeight - LOWER_PAGE_BORDER_GAP - UPPER_PAGE_BORDER_GAP)
    }, [headerHeight, pageHeight])

    useEffect(() => {
        if(pageWidth < TABLET_PAGE_WIDTH) setHeaderHeight(HEADER_HEIGHT_SMALL)
        else setHeaderHeight(HEADER_HEIGHT_BIG)
    }, [pageWidth])

    useEffect(() => {
        const handleWindowResize = () => {
            setPageHeight(window.innerHeight)
            setPageWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleWindowResize)

        return () => window.removeEventListener('resize', handleWindowResize)
    })

    return preloaderHeight
}