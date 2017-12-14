import { combineReducers } from 'redux'
import {photosByFilter, isFetching} from "./photo-grid/photoGrid.reducer"
import {selectedFilter} from "./filter/picker.reducer"
import {selectedPhoto} from "./photo/photo.reducer"

const rootReducer = combineReducers({
    photosByFilter,
    isFetching,
    selectedFilter,
    selectedPhoto
})
export default rootReducer