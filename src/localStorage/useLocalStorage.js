import { useState, useEffect } from 'react'

export const getStorageValue = (key, defaultValue) => {
    const saved = localStorage.getItem(key)
    const initial = JSON.parse(saved)
    return initial || defaultValue
}

export const setStorageValue = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
        return () => {
            localStorage.setItem(key, JSON.stringify(value))
        }
    }, [key, value])

    return [value, setValue]
}