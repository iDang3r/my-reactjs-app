import {Link} from 'react-router-dom'
import style from './Home.module.scss'

export function Home() {
    return (<>
        <h1>Home page</h1>
        <div className={style.button}>
            <Link to='cards'><p className={style.link}>Go to cards page</p></Link>
        </div>
    </>)
}