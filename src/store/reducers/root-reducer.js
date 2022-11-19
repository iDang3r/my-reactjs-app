import {combineReducers} from 'redux'
import {cardsReducer} from './cards-reducer.js'
import {commentsReducer} from './comments-reducer'

export const rootReducer = combineReducers({
    cardsReducer,
    commentsReducer,
})
