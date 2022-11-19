import {Link} from 'react-router-dom'
import style from '../components/Home/Home.module.scss'

export function NotFoundPage() {
    return (<>
        <h1>404 - Not found</h1>
        <div className={style.button}>
            <Link to='/'><p className={style.link}>Go to Home page</p></Link>
        </div>
    </>)
}
