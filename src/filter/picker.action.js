export const SELECT_PHOTOS_FILTER = 'SELECT_PHOTOS_FILTER'

export const selectPhotosFilter = selectedFilter => {
    return {
        type: SELECT_PHOTOS_FILTER,
        selectedFilter
    }
}