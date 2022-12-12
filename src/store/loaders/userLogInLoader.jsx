import users from '../../data/users.json'

export const getUserLogInPromise = (login, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(user => user.name === login)
            if (user) {
                resolve({
                    userId: user.userId,
                    name: user.name,
                    token: (Math.random() + 1).toString(36).substring(2),
                    isAdmin: user.isAdmin,
                })
            } else {
                reject('incorrect username or password')
            }
        }, 100)
    })
}