import {Link} from 'react-router-dom'
import style from '../components/Home/Home.module.scss'
import {SetLogInLogOutPage} from './common'

export function NotFoundPage() {
    SetLogInLogOutPage(NotFoundPage)

    return (<>
        <h1>404 - Not found</h1>
        <div className={style.button}>
            <Link to='/'><p className={style.link}>Go to Home page</p></Link>
        </div>
    </>)
}
