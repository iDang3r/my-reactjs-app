import {ActionTypes} from './types'

export const actionSetComments = (comments) => ({
    type: ActionTypes.setComments,
    payload: comments,
})

export const actionRemoveComment = (idx) => ({
    type: ActionTypes.removeComment,
    payload: idx,
})

export const actionChangeCommentLiked = (idx) => ({
    type: ActionTypes.changeCommentLiked,
    payload: idx,
})
