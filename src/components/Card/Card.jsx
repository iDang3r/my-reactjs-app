import React from "react"
import style from './Card.module.scss'
import classNames from "classnames/bind"

const cx = classNames.bind(style)

export class Card extends React.Component  {
    constructor(props) {
        super(props)
        this.state = {
            likes: props.currentLikes,
            liked: false,
            full: false,
            commentsCount: props.commentsCount,
        }
    }

    render() {
        let div_comments = <div></div>

        if (this.state.full) {
            if (this.state.commentsCount) {
                div_comments = this.props.comments.map((comment, index) =>
                    <div className={style.comment}>
                        <div className={style.commentText}>{comment.text}</div>
                        <div className={style.author}>by {comment.author}</div>
                        <button
                            onClick={() => {
                                this.props.comments.splice(index, 1)
                                this.setState({
                                    commentsCount: this.state.commentsCount - 1
                                })
                            }}
                            className={style.discardComment}
                        >
                            <div>X</div>
                        </button>
                    </div>
                )
            } else {
                div_comments =
                    <div className={style.comment}>
                        No comments
                    </div>
            }
        }

        return (
            <div className={cx({card: true}, this.state.full ? style.cardFull : style.cardNotFull)}>
                <h1>{this.props.title}</h1>
                <div className={style.text}>{this.props.text}</div>

                {div_comments}

                <button
                    onClick={() => this.setState({
                        likes: this.state.likes + (this.state.liked ? -1 : 1),
                        liked: !this.state.liked
                    })}
                    className={cx({likeButton: true}, this.state.liked ? style.likeButtonLiked : style.likeButtonNotLiked)}
                >
                    <div>Likes: {this.state.likes}</div>
                </button>

                <button
                    onClick={() => {
                        this.setState({
                            full: !this.state.full
                        })
                    }}
                    className={style.commentsButton}
                >
                    <div>{this.state.full ? "Hide comments" : "Open " + this.state.commentsCount + " comments"}</div>
                </button>
            </div>
        )
    }
}