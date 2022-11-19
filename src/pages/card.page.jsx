import {Navigate, useParams} from 'react-router'
import Card from '../components/Card/Card'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
    cards: state.cardsReducer.cards,
})

function CardPage({cards}) {
    let { id } = useParams()
    id = Number(id)
    if (cards.find(card => card.articleId === id) === undefined) {
        return <Navigate to={'/NotFound'}/>
    }
    return (<Card cardId={id} onSelfPage={true}/>)
}

export default connect(mapStateToProps)(CardPage)
