import React, { useState } from "react";
import style from './Card.module.css'

export class Card extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            likes: props.currentLikes,
            liked: false,
            full: false,
            commentsCount: props.commentsCount,
        };
    }

    render() {
        const likeStyle = this.state.liked ? style.liked : style.notLiked
        let styleCard = style.card
        let divComments = <div></div>

        if (this.state.full) {
            styleCard += " " + style.makeFull

            if (this.state.commentsCount) {
                divComments = this.props.comments.map((comment, index) =>
                    <div className={style.comment}>
                        <div className={style.comment_text}>{comment.text}</div>
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
                divComments = <div className={style.comment}>
                    No comments
                </div>
            }
        }

        return (
            <div className={styleCard}>
                <h1>{this.props.title}</h1>
                <div className={style.text}>{this.props.text}</div>

                {divComments}

                <button
                    onClick={() => this.setState({
                        likes: this.state.likes + (this.state.liked ? -1 : 1),
                        liked: !this.state.liked
                    })}
                    className={likeStyle + " " + style.likeButton}
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