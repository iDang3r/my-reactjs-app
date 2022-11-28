import {initialState} from '../model/initialState.js'
import {ActionTypes} from '../actions/types.js'

export const commentsReducer = (state = initialState(), action) => {
    switch (action.type) {
        case ActionTypes.removeComment: {
            let state_ = structuredClone(state)
            state_.comments.splice(state_.comments.findIndex(comment => comment.commentId === action.payload), 1)
            return state_
        }
        case ActionTypes.changeCommentLiked: {
            let state_ = structuredClone(state)
            const idx = state_.comments.findIndex((comment) => comment.commentId === action.payload)
            state_.comments[idx].currentLikes += (state_.comments[idx].liked) ? -1 : 1
            state_.comments[idx].liked = !state_.comments[idx].liked
            return state_
        }
        default:
            return state
    }
}
