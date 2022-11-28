import articles from '../../data/articles.json'

export const getCardsPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve(articles.map(obj => ({...obj, edit: false, liked: false})))
            } else {
                reject('Database request failed')
            }
        }, 2000)
    })
}
