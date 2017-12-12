import { combineReducers } from 'redux'
import {
    SELECT_PHOTOS_FILTER, RECEIVE_PHOTOS,
    REQUEST_PHOTOS
} from './photoGrid.action'


const selectedSubreddit = (state = 't', action) => {
    switch (action.type) {
        case SELECT_PHOTOS_FILTER:
            return action.selectedFilter
        default:
            return state
    }
}

const photos = (state = { isFetching: false, items: [] }, action) => {
    switch (action.type) {
        case REQUEST_PHOTOS:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_PHOTOS:
            return {
                ...state,
                isFetching: false,
                items: actions.photos
            }

    }
}
const postsBySubreddit = (state = { }, action) => {
    switch (action.type) {
      case RECEIVE_PHOTOS:
      case REQUEST_PHOTOS:
        return {
          ...state,
          [action.selectedFilter]: photos(state[action.selectedFilter], action)
        }
      default:
        return state
    }
  }
  
const rootReducer = combineReducers({
    photosByFilter,
    selectedSubreddit
  })
