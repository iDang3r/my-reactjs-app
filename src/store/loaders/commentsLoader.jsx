import comments from '../../data/comments.json'

export const getCommentsPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(comments.map(obj => ({...obj, liked: false})))
        }, 3000)
    })
}
