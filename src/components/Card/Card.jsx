import React, { useState } from "react";
import style from './Card.module.css'

export function Card(props) {
    const [likes, setLikes] = useState(props.currentLikes)
    const [liked, setLiked] = useState(false)
    const [full, setFull] = useState(false)
    const [commentsCount, setCommentsCount] = useState(props.commentsCount)

    const likeStyle = liked ? style.liked : style.notLiked
    let styleCard = style.card + (full ? " " + style.makeFull : "")
    let divComments = <div></div>

    const makeEmptyComment = () => {
        return <div className={style.comment}>
            No comments
        </div>
    }

    const makeComment = (comment, index) => {
        return <div className={style.comment}>
            <div className={style.comment_text}>{comment.text}</div>
            <div className={style.author}>by {comment.author}</div>
            <button
                onClick={() => {
                    props.comments.splice(index, 1)
                    setCommentsCount(commentsCount - 1)
                }}
                className={style.discardComment}
            >
                <div>X</div>
            </button>
        </div>
    }

    const getComments = () => {
        if (!commentsCount) {
            return makeEmptyComment()
        }
        return props.comments.map((comment, index) =>
            makeComment(comment, index)
        )
    }

    if (full) {
        divComments = getComments()
    }

    return (
        <div className={styleCard}>
            <h1>{props.title}</h1>
            <div className={style.text}>{props.text}</div>

            {divComments}

            <button
                onClick={() => setLiked(() => {
                    setLikes(likes + (liked ? -1 : 1))
                    return !liked
                })}
                className={likeStyle + " " + style.likeButton}
            >
                <div>Likes: {likes}</div>
            </button>

            <button
                onClick={() => setFull(!full)}
                className={style.commentsButton}
            >
                <div>{full ? "Hide comments" : "Open " + commentsCount + " comments"}</div>
            </button>
        </div>
    )
}