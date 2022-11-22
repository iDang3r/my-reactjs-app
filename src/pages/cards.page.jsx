import {useReducer} from 'react'
import Card from '../components/Card/Card'
import style from '../app/App.module.scss'
import {
    Sort, initSortType, reduceSortType,
    getLikeSortSymbol, getDateSortSymbol,
}
    from '../components/CommonSort'

import {connect} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {SetLogInLogOutPage} from './common'

const mapStateToProps = (state) => ({
    cards: state.cardsReducer.cards,
    comments: state.commentsReducer.comments,
})

function CardsPage({cards}) {
    SetLogInLogOutPage(CardsPage)

    const navigate = useNavigate()
    const [sortType, dispatchSortType] = useReducer(reduceSortType, '', initSortType)

    Sort(cards, sortType)

    let divArticles = cards.map(card =>
        <Card
            key={card.articleId}
            cardId={card.articleId}
            onSelfPage={false}
        />)
    return (
        <>
            <button
                onClick={() => navigate('/')}
                className={style.button + ' ' + style.buttonHome}
            >{'Home'}
            </button>
            <button
                onClick={() => dispatchSortType('byLikes')}
                className={style.button + ' ' + style.buttonUp}
            >{'Sort by likes ' + getLikeSortSymbol(sortType)}
            </button>
            <button
                onClick={() => dispatchSortType('byDate')}
                className={style.button + ' ' + style.buttonDown}
            >{'Sort by date ' + getDateSortSymbol(sortType)}
            </button>

            {divArticles}
        </>
    )
}

export default connect(mapStateToProps)(CardsPage)
