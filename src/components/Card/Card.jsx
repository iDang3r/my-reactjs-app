import React, { useState } from "react";
import style from './Card.module.css'

export default function Card({title, text, currentLikes}) {
    const [likes, changeLikes] = useState(currentLikes)
    const [liked, setLiked] = useState(false)
    const [full, setFull] = useState(false)
    const [re, my_rerender] = useState(true)
    const [comments, updateComments] = useState(["Comment1", "Comment2", "Comment3"]);

    const likeStyle = liked ? style.liked : style.notliked
    let style_card = style.card
    let div_comments = <div></div>

    if (full) {
        style_card += " " + style.make_full

        if (comments.length) {
            div_comments = comments.map((comment, index) =>
                <div className={style.comment} key={comment}>
                    {comment}
                    <button
                        onClick={() => {
                            comments.splice(index, 1)
                            // updateComments(comments)
                            my_rerender(!re)
                        }}
                        className={style.discard_comment}
                    >
                        <div>X</div>
                    </button>
                </div>
            )
        } else {
            div_comments = <div className={style.comment}>
                No comments
            </div>
        }
    }

    return (
        <div className={style_card}>
            <h1>{title}</h1>
            <div className={style.text}>{text}</div>

            {div_comments}

            <button
                onClick={() => setLiked(() => {
                    changeLikes(likes + (liked ? -1 : 1))
                    return !liked
                })}
                className={likeStyle + " " + style.likeButton}
            >
                <div>Likes: {likes}</div>
            </button>

            <button
                onClick={() => {
                    setFull(!full)
                }}
                className={style.commentsButton}
            >
                <div>{full ? "Hide comments" : "Open " + comments.length + " comments"}</div>
            </button>
        </div>
    )
}