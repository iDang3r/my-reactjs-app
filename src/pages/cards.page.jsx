import {useState} from 'react'
import Card from '../components/Card/Card'
import style from '../app/App.module.scss'
import {Sort, SortType, getLikesSortHandler, getDateSortHandler,
    getDateSortSymbol, getLikeSortSymbol}
    from '../components/Common'

import {connect} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const mapStateToProps = (state) => ({
    cards: state.cardsReducer.cards,
    comments: state.commentsReducer.comments,
})

function CardsPage({cards}) {
    const navigate = useNavigate()
    const [sortType, setSortType] = useState(SortType.default);

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
                onClick={getLikesSortHandler(sortType, setSortType)}
                className={style.button + ' ' + style.buttonUp}
            >{'Sort by likes ' + getLikeSortSymbol(sortType)}
            </button>
            <button
                onClick={getDateSortHandler(sortType, setSortType)}
                className={style.button + ' ' + style.buttonDown}
            >{'Sort by date ' + getDateSortSymbol(sortType)}
            </button>

            {divArticles}
        </>
    )
}

export default connect(mapStateToProps)(CardsPage)
