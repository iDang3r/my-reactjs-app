import {Navigate, useParams} from 'react-router'
import Card from '../components/Card/Card'
import {connect} from 'react-redux'
import {SetLogInLogOutPage} from './common'

const mapStateToProps = (state) => ({
    cards: state.cardsReducer.cards,
})

function CardPage({cards}) {
    SetLogInLogOutPage(CardPage)

    let { id } = useParams()
    id = Number(id)
    if (cards.find(card => card.articleId === id) === undefined) {
        return <Navigate to={'/NotFound'}/>
    }
    return (<Card cardId={id} onSelfPage={true}/>)
}

export default connect(mapStateToProps)(CardPage)
