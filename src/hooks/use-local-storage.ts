import { useEffect, useState } from 'react'
import { useAppDispatch } from './redux-hooks'
import { setFavoriteVacancies } from '../store/AppSlice'

const useLocalStorageData = () => {
    const dispatch = useAppDispatch()
    const [values, setValues] = useState<number[]>([])

    useEffect(() => {
        dispatch(setFavoriteVacancies(values))
    }, [values])

    useEffect(() => {
        const valuesString : string | null = localStorage.getItem('jobored-favorite-vacancies')
        if(!valuesString) localStorage.setItem('jobored-favorite-vacancies', '[]')
        const valuesData : number[] = valuesString ? JSON.parse(valuesString) : []
        dispatch(setFavoriteVacancies(valuesData))
        setValues(valuesData)
    }, [])

    const setValue = (setNewValue : number) : void => {
        const newValues : number[] = [...values, setNewValue]
        setValues(newValues)
        localStorage.setItem('jobored-favorite-vacancies', JSON.stringify(newValues))
    }

    const unsetValue = (unsetExistingValue : number) : void => {
        const newValues : number[] = values.filter(value => value !== unsetExistingValue)
        localStorage.setItem('jobored-favorite-vacancies', JSON.stringify(newValues))
        setValues(newValues)
    }

    return { values, setValue, unsetValue }
};

export default useLocalStorageData