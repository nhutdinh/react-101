import React, { Component } from 'react';
import Photo from '../photo/photo';

class PhotoGrid extends Component {
    constructor(props) {
        super(props);
        this.state = { photos: [] };
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
        var photos = [];
        for (var i = 0; i < 10000 - 1; i++) {
            photos.push({ id: i + 1 });
        }
        this.setState({ photos: photos });
    }
    render() {
        const photos = this.state.photos.map((item) =>
            <Photo key={item.id} file={item} />
        );
        return (
            <div>
                <div className="photo-grid">
                    {photos}
                </div>
            </div>
        );
    }
}

export default PhotoGrid;
