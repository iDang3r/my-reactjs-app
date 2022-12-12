import {Link} from 'react-router-dom'
import style from './Home.module.scss'
import {useLocalStorage} from '../../localStorage/useLocalStorage'

export function Home() {
    const [user, setUser] = useLocalStorage('user', null)

    const logOut = () => {
        setUser(null)
    }

    return (<>
        <h1>Home page</h1>
        <div className={style.button}>
            {
                user
                ? <p className={style.link} onClick={logOut}>Log out ({user.name})</p>
                : <Link to='auth'><p className={style.link}>Log in</p></Link>
            }
            <Link to='cards'><p className={style.link}>Go to cards page</p></Link>
        </div>
    </>)
}