import {ActionTypes} from './types'

export const actionSetCards = (cards) => ({
    type: ActionTypes.setCards,
    payload: cards,
})

export const actionSetCard = (newCard) => ({
    type: ActionTypes.setCard,
    payload: newCard,
})

export const actionDecCardCommentCounter = (idx) => ({
    type: ActionTypes.decCardCommentCounter,
    payload: idx,
})
