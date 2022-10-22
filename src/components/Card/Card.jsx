import React from 'react'
import style from './Card.module.scss'
import classNames from 'classnames/bind'
import {Comment} from '../Comment/Comment'
import {SortType} from '../Common'
import {PopUp} from "../PopUpWindow/PopUpWindow";

const cx = classNames.bind(style)

export class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.title,
            text: props.text,
            likes: props.currentLikes,
            liked: false,
            full: false,
            commentsCount: props.commentsCount,
            sortType: SortType.default,
            edit: false,
        }
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    popUpEditWindow = () => {
        this.setState({
            edit: !this.state.edit
        });
    }

    handleTitleChange(event) {
        this.setState({
            title: event.target.value
        })
    }

    handleTextChange(event) {
        this.setState({
            text: event.target.value
        })
    }

    handleSubmit() {
        this.popUpEditWindow()
    }

    render() {
        let div_comments = <div></div>

        if (this.state.full) {
            if (this.state.commentsCount) {
                div_comments = this.props.comments.map((comment, index) =>
                    <Comment
                        index={index}
                        deleteComment={() => {
                            this.props.comments.splice(index, 1)
                            this.setState({
                                commentsCount: this.state.commentsCount - 1
                            })
                        }}
                        text={comment.text}
                        author={comment.author}
                        currentLikes={comment.currentLikes}
                        createDate={comment.createDate}
                    />
                )
                // Very elegant solution !!!
                switch (this.state.sortType) {
                    case SortType.likesAsc:
                        div_comments = React.Children.toArray(div_comments).sort((a, b) => a.props['currentLikes'] < b.props['currentLikes'])
                        break
                    case SortType.likesDesc:
                        div_comments = React.Children.toArray(div_comments).sort((a, b) => a.props['currentLikes'] > b.props['currentLikes'])
                        break
                    case SortType.dateAsc:
                        div_comments = React.Children.toArray(div_comments).sort((a, b) => a.props['createDate'] < b.props['createDate'])
                        break
                    case SortType.dateDesc:
                        div_comments = React.Children.toArray(div_comments).sort((a, b) => a.props['createDate'] > b.props['createDate'])
                        break
                    default:
                }
            } else {
                div_comments = <Comment
                    index={-1}
                    text={"No comments"}
                />
            }
        }

        let inner =
            <div className={style.editWindow}>

                <form onSubmit={this.handleSubmit}>
                    <div className={style.titleChange}>
                        Card title:
                        <input className={style.titleForm} type="text" value={this.state.title} onChange={this.handleTitleChange} />
                    </div>
                    <div className={style.textChange}>
                        Card text:
                        <textarea className={style.textForm} value={this.state.text} onChange={this.handleTextChange} />
                    </div>
                    <input className={style.submitButton} type="submit" value="Submit"/>
                </form>
            </div>

        return (
            <div className={cx({card: true}, this.state.full ? style.cardFull : style.cardNotFull)}>
                <div>
                    <button
                        className={style.editButton}
                        onClick={this.popUpEditWindow}
                    >Edit card</button>
                    {this.state.edit ? <PopUp inner={inner}/> : null}
                </div>

                <div className={style.createDate}>{this.props.createDate}</div>
                <h1  className={style.title}>{this.state.title}</h1>
                <div className={style.text}>{this.state.text}</div>

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

                <button
                    onClick={() => {
                        let newSortType
                        switch (this.state.sortType) {
                            case SortType.dateAsc:
                            case SortType.dateDesc:
                            case SortType.likesAsc:
                                newSortType = SortType.likesDesc
                                break
                            case SortType.likesDesc:
                            default:
                                newSortType = SortType.likesAsc
                                break
                        }
                        this.setState({
                            sortType: newSortType,
                        })
                    }}
                    className={cx(style.commentsButton, {hide: !this.state.full})}
                >{"Sort by likes " + (this.state.sortType === SortType.likesAsc ? "⤴" :
                                      this.state.sortType === SortType.likesDesc ? "⤵" : "")}
                </button>
                <button
                    onClick={() => {
                        let newSortType
                        switch (this.state.sortType) {
                            case SortType.likesAsc:
                            case SortType.likesDesc:
                            case SortType.dateAsc:
                                newSortType = SortType.dateDesc
                                break
                            case SortType.dateDesc:
                            default:
                                newSortType = SortType.dateAsc
                                break
                        }
                        this.setState({
                            sortType: newSortType,
                        })
                    }}
                    className={cx(style.commentsButton, {hide: !this.state.full})}
                >{"Sort by date " + (this.state.sortType === SortType.dateAsc ? "⤴" :
                                     this.state.sortType === SortType.dateDesc ? "⤵" : "")}
                </button>
            </div>
        )
    }
}