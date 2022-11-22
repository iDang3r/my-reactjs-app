import {initialState} from '../model/initialState.js'
import {ActionTypes} from '../actions/types.js'

export const cardsReducer = (state = initialState(), action) => {
    switch (action.type) {
        case ActionTypes.setCards: {
            return {
                ...state,
                cards: action.payload,
            }
        }
        case ActionTypes.setCard: {
            let state_ = structuredClone(state)
            const idx = state_.cards.findIndex((card) => card.articleId === action.payload.articleId)
            state_.cards[idx] = action.payload
            return state_
        }
        case ActionTypes.decCardCommentCounter: {
            let state_ = structuredClone(state)
            const idx = state_.cards.findIndex((card) => card.articleId === action.payload)
            state_.cards[idx].commentsCount -= 1
            return state_
        }
        default:
            return state
    }
}
