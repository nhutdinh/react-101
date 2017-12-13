import fetch from 'cross-fetch'

export const REQUEST_PHOTOS = 'REQUEST_PHOTOS'
export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS'


export const fetchPhotos = selectedFilter => (dispatch, getState) => {
    if (shouldFetchPhotos(getState(), selectedFilter)) {
        dispatch(requestPhotos(selectedFilter));
        return fetch("https://qa.pixerf.com/api/media/search", {method: 'POST', body: JSON.stringify(selectedFilter)})
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
    console.log(json);
    return {
        type: RECEIVE_PHOTOS,
        selectedFilter,
        photos: json
    }
}
const shouldFetchPhotos = (state, selectedFilter) => (
    !state.isFetching
)