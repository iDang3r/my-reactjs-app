import {connect} from 'react-redux'
import {actionSetCards} from './actions/cardsActions'
import {actionSetComments} from './actions/commentsActions'
import {getCardsPromise} from './loaders/cardsLoader'
import {getCommentsPromise} from './loaders/commentsLoader'
import {useState} from 'react'

const mapStateToProps = (state) => ({
    comments: state.commentsReducer.comments,
    cards: state.cardsReducer.cards,
})

const mapDispatchToProps = (dispatch) => ({
    setCards: (cards) => dispatch(actionSetCards(cards)),
    setComments: (comments) => dispatch(actionSetComments(comments)),
})

function Loader({setCards, setComments}) {

    const load = (getItemPromise, itemName, setItem) => {
        console.warn('loading ' + itemName + '...')
        getItemPromise().then((item) => {
            console.warn(itemName + ' loaded!')
            setItem(item)
        }).catch((error) => {
            console.error('Loading ' + itemName + ': ' + error + '! Trying again...')
            load(getItemPromise, itemName, setItem)
        })
    }

    const [loadCards, setLoadCards] = useState(false)
    if (!loadCards) {
        setLoadCards(true)
        load(getCardsPromise, 'cards', setCards)
    }

    const [loadComments, setLoadComments] = useState(false)
    if (!loadComments) {
        setLoadComments(true)
        load(getCommentsPromise, 'comments', setComments)
    }

    return <></>
}

export default connect(mapStateToProps, mapDispatchToProps)(Loader)
