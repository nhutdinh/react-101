import {
    PHOTO_CLICKED
} from './photo.action'

export const selectedPhoto = (state = {}, action) => {
    switch (action.type) {
        case PHOTO_CLICKED:
            return {...state, 
                ...action.selectedPhoto
            }
        default:
            return state
    }
}