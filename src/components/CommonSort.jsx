export const SortType = {
    likesAsc:  1,
    likesDesc: 2,
    dateAsc:   3,
    dateDesc:  4,
    default:   5,
}

export const Sort = (array, sortType) => {
    switch (sortType) {
        case SortType.likesAsc:
            array.sort((a, b) => a.currentLikes - b.currentLikes)
            break
        case SortType.likesDesc:
            array.sort((a, b) => b.currentLikes - a.currentLikes)
            break
        case SortType.dateAsc:
            array.sort((a, b) => Date.parse(a.createDate) - Date.parse(b.createDate))
            break
        case SortType.dateDesc:
            array.sort((a, b) => Date.parse(b.createDate) - Date.parse(a.createDate))
            break
        default:
    }
}

export const initSortType = () => {
    return SortType.default
}

export const reduceSortType = (state, action) => {
    console.log('reduceSortType: ', action)
    switch (action) {
        case 'byLikes':
            return getLikesSortType(state)
        case 'byDate':
            return getDateSortType(state)
    }
}

export const getLikesSortType = (sortType) => {
    switch (sortType) {
        case SortType.dateAsc:
        case SortType.dateDesc:
        case SortType.likesAsc:
            return SortType.likesDesc
        case SortType.likesDesc:
        default:
            return SortType.likesAsc
    }
}

export const getDateSortType = (sortType) => {
    switch (sortType) {
        case SortType.likesAsc:
        case SortType.likesDesc:
        case SortType.dateAsc:
            return SortType.dateDesc
        case SortType.dateDesc:
        default:
            return SortType.dateAsc
    }
}

const getSortSymbol = (sortType) => {
    switch (sortType) {
        case SortType.likesAsc:
        case SortType.dateAsc:
            return "⤵"
        case SortType.likesDesc:
        case SortType.dateDesc:
            return "⤴"
        default:
    }
    return ""
}

export const getLikeSortSymbol = (sortType) => {
    switch (sortType) {
        case SortType.likesAsc:
        case SortType.likesDesc:
            return getSortSymbol(sortType)
        default:
    }
    return ""
}

export const getDateSortSymbol = (sortType) => {
    switch (sortType) {
        case SortType.dateAsc:
        case SortType.dateDesc:
            return getSortSymbol(sortType)
        default:
    }
    return ""
}
