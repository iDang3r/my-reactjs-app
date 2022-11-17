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

export const getLikesSortHandler = (sortType, setSortType) => {
    return () => {
        let newSortType
        switch (sortType) {
            case SortType.dateAsc:
            case SortType.dateDesc:
            case SortType.likesAsc:
                newSortType = SortType.likesDesc
                break
            case SortType.likesDesc:
            default:
                newSortType = SortType.likesAsc
                break
        }
        setSortType(newSortType)
    }
}

export const getDateSortHandler = (sortType, setSortType) => {
    return () => {
        let newSortType
        switch (sortType) {
            case SortType.likesAsc:
            case SortType.likesDesc:
            case SortType.dateAsc:
                newSortType = SortType.dateDesc
                break
            case SortType.dateDesc:
            default:
                newSortType = SortType.dateAsc
                break
        }
        setSortType(newSortType)
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
