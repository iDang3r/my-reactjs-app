import React, {useState} from 'react'
import style from './Card.module.scss'
import classNames from 'classnames/bind'
import {Comment} from '../Comment/Comment'
import {Sort, SortType, getLikesSortHandler, getDateSortHandler,
        getLikeSortSymbol, getDateSortSymbol}
    from '../Common'
import {PopUp} from "../PopUpWindow/PopUpWindow";

const cx = classNames.bind(style)

export function Card(props) {
    const [title, setTitle] = useState(props.title)
    const [text, setText] = useState(props.text)
    const [liked, setLiked] = useState(false)
    const [full, setFull] = useState(false)
    const [commentsCount, setCommentsCount] = useState(props.commentsCount)
    const [sortType, setSortType] = useState(SortType.default)
    const [edit, setEdit] = useState(false)

    const popUpEditWindow = () => {
        setEdit(!edit)
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleTextChange = (event) => {
        setText(event.target.value)
    }

    const handleSubmit = () => {
        popUpEditWindow()
    }

    let divComments = <div></div>

    const makeEmptyComment = () => {
        return <Comment
            index={-1}
            text={"No comments"}
        />
    }

    const makeComment = (comment, index) => {
        return <Comment
            key={comment.text}
            index={index}
            deleteComment={() => {
                props.comments.splice(index, 1)
                setCommentsCount(commentsCount - 1)
            }}
            text={comment.text}
            author={comment.author}
            currentLikes={comment.currentLikes}
            createDate={comment.createDate}
        />
    }

    const getComments = () => {
        if (!commentsCount) {
            return makeEmptyComment()
        }
        Sort(props.comments, sortType)

        return props.comments.map((comment, index) =>
            makeComment(comment, index)
        )
    }

    if (full) {
        divComments = getComments()
    }

    let editWindow =
        <div className={style.editWindow}>
            <form onSubmit={handleSubmit}>
                <div className={style.titleChange}>
                    Card title:
                    <input className={style.titleForm} type="text" value={title} onChange={handleTitleChange} />
                </div>
                <div className={style.textChange}>
                    Card text:
                    <textarea className={style.textForm} value={text} onChange={handleTextChange} />
                </div>
                <input className={style.submitButton} type="submit" value="Submit"/>
            </form>
        </div>

    return (
        <div className={cx({card: true}, full ? style.cardFull : style.cardNotFull)}>
            <div>
                <button
                    className={style.editButton}
                    onClick={popUpEditWindow}
                >Edit card</button>
                {edit ? <PopUp inner={editWindow}/> : null}
            </div>

            <div className={style.createDate}>{props.createDate}</div>
            <h1  className={style.title}>{title}</h1>
            <div className={style.text}>{text}</div>

            {divComments}

            <button
                onClick={() => setLiked(!liked)}
                className={cx({likeButton: true}, liked ? style.likeButtonLiked : style.likeButtonNotLiked)}
            >
                <div>Likes: {props.currentLikes + (liked ? 1 : 0)}</div>
            </button>

            <button
                onClick={() => {
                    setFull(!full)
                }}
                className={style.commentsButton}
            >
                <div>{full ? "Hide comments" : "Open " + commentsCount + " comments"}</div>
            </button>

            <button
                onClick={getLikesSortHandler(sortType, setSortType)}
                className={cx(style.commentsButton, {hide: !full})}
            >{"Sort by likes " + getLikeSortSymbol(sortType)}
            </button>
            <button
                onClick={getDateSortHandler(sortType, setSortType)}
                className={cx(style.commentsButton, {hide: !full})}
            >{"Sort by date " + getDateSortSymbol(sortType)}
            </button>
        </div>
    )
}
