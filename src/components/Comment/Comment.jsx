import {useState} from 'react'
import style from './Comment.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(style)

export function Comment(props) {
    const [liked, setLiked] = useState(false)

    if (props.index === -1) {
        return <div className={style.comment}>
            <div className={style.commentText}>{props.text}</div>
        </div>
    }

    return <div className={style.comment}>
        <div className={style.createDate}>{props.createDate}</div>
        <div className={style.commentText}>{props.text}</div>
        <div className={style.author}>by {props.author}
        <button
            onClick={() => setLiked(!liked)}
            className={cx({likeButton: true}, liked ? style.likeButtonLiked : style.likeButtonNotLiked)}
        >
            <div>Likes: {props.currentLikes + (liked ? 1 : 0)}</div>
        </button></div>

        <button
            onClick={props.deleteComment}
            className={style.discardComment}
        >
            <div>ⓧ</div>
        </button>
    </div>
}
