import style from './App.module.scss'
import {Routes, Route} from 'react-router-dom'
import {HomePage} from '../pages/home.page'
import {NotFoundPage} from '../pages/notFound.page'
import {AuthPage} from '../pages/auth.page'
import CardPage from '../pages/card.page'
import Cards from '../pages/cards.page'
import Loader from '../store/Loader'

export function App() {
    return (
        <div className={style.App}>
            <header className={style.AppHeader}>
                <Loader/>

                <Routes>
                    <Route path='/' element={<HomePage/>} />
                    <Route path='/cards' element={<Cards/>} />
                    <Route path='/card/:id' element={<CardPage/>}/>
                    <Route path='/auth' element={<AuthPage/>}/>
                    <Route path='*' element={<NotFoundPage/>}/>
                </Routes>

            </header>
        </div>
    )
}
