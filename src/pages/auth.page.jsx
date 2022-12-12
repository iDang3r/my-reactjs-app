import {SetLogInLogOutPage} from './common'
import {Auth} from '../components/Auth/Auth'

export function AuthPage() {
    SetLogInLogOutPage(AuthPage)

    return (
        <Auth/>
    )
}
