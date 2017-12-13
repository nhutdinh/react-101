import { combineReducers } from 'redux'
import {photosByFilter, isFetching} from "./photo-grid/photoGrid.reducer"
import {selectedFilter} from "./filter/picker.reducer"

const rootReducer = combineReducers({
    photosByFilter,
    isFetching,
    selectedFilter
})
export default rootReducer