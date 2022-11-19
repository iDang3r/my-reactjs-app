import { ActionTypes } from './types'

export const actionSetCard = (newCard) => ({
    type: ActionTypes.setCard,
    payload: newCard,
})

export const actionDecCardCommentCounter = (idx) => ({
    type: ActionTypes.decCardCommentCounter,
    payload: idx,
})
