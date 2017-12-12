export const REQUEST_PHOTOS = 'REQUEST_PHOTOS'
export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS'
export const SELECT_PHOTOS_FILTER = 'SELECT_PHOTOS_FILTER'

export const selectPhotosFilter = selectedFilter => {
    return {
        type: SELECT_PHOTOS_FILTER,
        selectedFilter
    }
}

export const fetchPhotos = selectedFilter => (dispatch, getState) => {
    if (shouldFetchPhotos(getState(), selectedFilter)) {
        dispatch(requestPhotos(selectedFilter));
        return fetch("https://qa.pixerf.com/api/media")
            .then(response => response.json())
            .then(json => dispatch(receivePhotos(selectedFilter, json)))
    }
}
const requestPhotos = selectedFilter => {
    return {
        type: REQUEST_PHOTOS,
        selectedFilter
    }
}
const receivePhotos = (selectedFilter, json) => {
    return {
        type: RECEIVE_PHOTOS,
        selectedFilter,
        photos: json.data
    }
}
const shouldFetchPhotos = (state, selectedFilter) => {
    return state.photosByState[selectedFilter].isFetching;
}