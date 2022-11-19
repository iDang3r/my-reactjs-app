import style from './Comment.module.scss'
import classNames from 'classnames/bind'

import {connect} from 'react-redux'
import {actionDecCardCommentCounter} from '../../store/actions/setCard'
import {actionChangeCommentLiked, actionRemoveComment} from '../../store/actions/removeComment'

const mapStateToProps = (state) => ({
    comments: state.commentsReducer.comments,
})

const mapDispatchToProps = (dispatch) => ({
    decCardCommentCounter: (idx) => dispatch(actionDecCardCommentCounter(idx)),
    changeCommentLiked: (idx) => dispatch(actionChangeCommentLiked(idx)),
    removeComment: (idx) => dispatch(actionRemoveComment(idx)),
})

const cx = classNames.bind(style)

function Comment({commentId, text, comments, removeComment, decCardCommentCounter, changeCommentLiked}) {
    if (commentId === -1) {
        return <div className={style.comment}>
            <div className={style.commentText}>{text}</div>
        </div>
    }

    const comment = comments.find(comment => comment.commentId === commentId)

    return <div className={style.comment}>
        <div className={style.createDate}>{comment.createDate}</div>
        <div className={style.commentText}>{comment.text}</div>
        <div className={style.author}>by {comment.author}
        <button
            onClick={() => changeCommentLiked(comment.commentId)}
            className={cx({likeButton: true}, comment.liked ? style.likeButtonLiked : style.likeButtonNotLiked)}
        >
            <div>Likes: {comment.currentLikes}</div>
        </button></div>

        <button
            onClick={() => {
                removeComment(comment.commentId)
                decCardCommentCounter(comment.articleId)
            }}
            className={style.discardComment}
        >
            <div>ⓧ</div>
        </button>
    </div>
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
