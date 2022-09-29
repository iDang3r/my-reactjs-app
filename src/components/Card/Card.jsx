import React, { useState } from "react";
import style from './Card.module.css'

export default function Card({title, text, currentLikes}) {
    const [likes, changeLikes] = useState(currentLikes)
    const [liked, setLiked] = useState(false);
    const [likeStyle, setLikeStyle] = useState(style.notliked);

    return (
        <div className={style.card}>
            <h1>{title}</h1>
            <div>{text}</div>
            <button
                onClick={() => setLiked(() => {
                    setLikeStyle(liked ? style.notliked : style.liked);
                    changeLikes(likes + (liked ? -1 : 1));
                    return !liked
                })}
                className={likeStyle + " " + style.likeButton}
            >
            <div>
                <div>Likes: {likes}</div>
            </div>
            </button>
        </div>
    )
}