import {useState} from 'react'
import style from './Card.module.scss'
import classNames from 'classnames/bind'
import Comment from '../Comment/Comment'
import {Sort, SortType, getLikesSortHandler, getDateSortHandler,
        getLikeSortSymbol, getDateSortSymbol}
    from '../Common'
import {PopUp} from '../PopUpWindow/PopUpWindow'

import {connect} from 'react-redux'
import {actionSetCard} from '../../store/actions/setCard'
import {useNavigate} from 'react-router-dom'

const mapStateToProps = (state) => ({
    allComments: state.commentsReducer.comments,
    cards: state.cardsReducer.cards,
})

const mapDispatchToProps = (dispatch) => ({
    setCard: (newCard) => dispatch(actionSetCard(newCard)),
})

const cx = classNames.bind(style)

function Card({cards, allComments, cardId, onSelfPage, setCard}) {
    const navigate = useNavigate()

    let card = cards.find(card => card.articleId.toString() === cardId.toString())
    if (card === undefined) {
        navigate('/NotFound')
    }

    const comments = allComments.filter((comment) => comment.articleId.toString() === cardId.toString())

    const [sortType, setSortType] = useState(SortType.default)

    const popUpEditWindow = () => {
        card.edit = !card.edit
        setCard(card)
    }

    const handleTitleChange = (event) => {
        card.title = event.target.value
        setCard(card)
    }

    const handleTextChange = (event) => {
        card.text = event.target.value
        setCard(card)
    }

    const handleSubmit = () => {
        popUpEditWindow()
    }

    let divComments = <div></div>

    const makeEmptyComment = () => {
        return <Comment
            key={-1}
            commentId={-1}
            text={'No comments'}
        />
    }

    const makeComment = (comment) => {
        return <Comment
            key={comment.commentId}
            commentId={comment.commentId}
        />
    }

    const getComments = () => {
        if (!card.commentsCount) {
            return makeEmptyComment()
        }
        Sort(comments, sortType)

        return comments.map((comment, index) =>
            makeComment(comment, index)
        )
    }

    if (onSelfPage) {
        divComments = getComments()
    }

    let editWindow =
        <div className={style.editWindow}>
            <form onSubmit={handleSubmit}>
                <div className={style.titleChange}>
                    Card title:
                    <input className={style.titleForm} value={card.title} onChange={handleTitleChange} />
                </div>
                <div className={style.textChange}>
                    Card text:
                    <textarea className={style.textForm} value={card.text} onChange={handleTextChange} />
                </div>
                <input className={style.submitButton} type='submit' value='Submit'/>
            </form>
        </div>

    return (
        <div className={cx({card: true}, onSelfPage ? style.cardFull : style.cardNotFull)}>
            <div>
                <button
                    onClick={popUpEditWindow}
                    className={cx(style.editButton, {hide: !onSelfPage})}
                >Edit card</button>
                {card.edit ? <PopUp inner={editWindow}/> : null}
            </div>

            <div className={style.createDate}>{card.createDate}</div>
            <h1  className={style.title}>{card.title}</h1>
            <div className={style.text}>{card.text}</div>

            {divComments}

            <button
                onClick={() => {
                    card.currentLikes += (card.liked) ? -1 : 1
                    card.liked = !card.liked
                    setCard(card)
                }}
                className={cx({likeButton: true}, card.liked ? style.likeButtonLiked : style.likeButtonNotLiked)}
            >
                <div>Likes: {card.currentLikes}</div>
            </button>

            <button
                onClick={() => navigate('/card/' + cardId)}
                className={cx(style.commentsButton, {hide: onSelfPage})}
            >{'Open card (' + card.commentsCount + ' comments)'}
            </button>
            <button
                onClick={() => navigate('/cards')}
                className={cx(style.commentsButton, {hide: !onSelfPage})}
            >{'Go back to cards'}
            </button>

            <button
                onClick={getLikesSortHandler(sortType, setSortType)}
                className={cx(style.commentsButton, {hide: !onSelfPage})}
            >{'Sort by likes ' + getLikeSortSymbol(sortType)}
            </button>
            <button
                onClick={getDateSortHandler(sortType, setSortType)}
                className={cx(style.commentsButton, {hide: !onSelfPage})}
            >{'Sort by date ' + getDateSortSymbol(sortType)}
            </button>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)
