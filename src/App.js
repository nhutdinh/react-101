import React from 'react'
import Picker from './filter/picker.container'
import PhotoGrid from './photo-grid/photoGrid.container'

const App = () => (
  <div>
    <Picker options={[{label: "trending", value: 't'},{label: "discover", value: 'd'}]}/>
    <PhotoGrid />
  </div>
)

export default App
