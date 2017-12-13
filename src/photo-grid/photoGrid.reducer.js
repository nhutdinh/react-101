import {
    RECEIVE_PHOTOS,
    REQUEST_PHOTOS
} from './photoGrid.action'



export const isFetching = (state = false, action) => {
    switch (action.type) {
        case REQUEST_PHOTOS:
            return true
        case RECEIVE_PHOTOS:
            return false
        default:
            return state
    }
}
export const photosByFilter = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_PHOTOS:
        case REQUEST_PHOTOS:
            return action.photos || []
        default:
            return state
    }
}