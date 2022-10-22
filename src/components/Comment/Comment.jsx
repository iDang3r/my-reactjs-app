import React from 'react'
import style from './Comment.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(style)

export class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            liked: false,
        }
    }

    render() {
        if (this.props.index === -1) {
            return <div className={style.comment}>
                <div className={style.commentText}>{this.props.text}</div>
            </div>
        }
        return <div className={style.comment}>
            <div className={style.createDate}>{this.props.createDate}</div>
            <div className={style.commentText}>{this.props.text}</div>
            <div className={style.author}>by {this.props.author}
            <button
                onClick={() => this.setState({
                    liked: !this.state.liked
                })}
                className={cx({likeButton: true}, this.state.liked ? style.likeButtonLiked : style.likeButtonNotLiked)}
            >
                <div>Likes: {this.props.currentLikes + (this.state.liked ? 1 : 0)}</div>
            </button></div>

            <button
                onClick={() => {
                    this.props.deleteComment()
                }}
                className={style.discardComment}
            >
                <div>ⓧ</div>
            </button>
        </div>
    }
}
