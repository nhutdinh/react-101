import {
    SELECT_PHOTOS_FILTER
} from './picker.action'

export const selectedFilter = (state = {"state": "t"}, action) => {
    switch (action.type) {
        case SELECT_PHOTOS_FILTER:
            return {...state, 
                'state': action.selectedFilter.value 
            }
        default:
            return state
    }
}