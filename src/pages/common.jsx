import {useEffect} from 'react'

export function SetLogInLogOutPage(page) {
    useEffect(() => {
        console.group('enter', page.name)

        return () => {
            console.log('exit', page.name)
            console.groupEnd()
        }
    })
}
