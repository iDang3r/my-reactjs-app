import React, { useState } from "react";
import style from './Card.module.css'

export default function Card({title, text, currentLikes}) {
    const [likes, changeLikes] = useState(currentLikes)
    const [liked, setLiked] = useState(false);

    const getLikeStyle = () => {
        return liked ? style.liked : style.notliked;
    }

    return (
        <div className={style.card}>
            <h1>{title}</h1>
            <div>{text}</div>
            <button
                onClick={() => {
                    setLiked(!liked);
                    changeLikes(likes + (liked ? -1 : 1));
                }}
                className={getLikeStyle() + " " + style.likeButton}
            >
            <div>
                <div>Likes: {likes}</div>
            </div>
            </button>
        </div>
    )
}