import React, { Component } from 'react';
import './App.scss';
import PhotoGrid from './photo-grid/photoGrid.component';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PhotoGrid/>
      </div>
    );
  }
}

export default App;
