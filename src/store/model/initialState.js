import articles from '../../data/articles.json'
import comments from '../../data/comments.json'

export const initialState = () => ({
    cards: articles.map(obj => ({...obj, edit: false, liked: false, full: false})),
    comments: comments.map(obj => ({...obj, liked: false})),
})
