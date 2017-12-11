import React, { Component } from 'react';
import Photo from '../photo/photo';
import PropTypes from 'prop-types';
import {fetchData} from './photoGrid.action'

class PhotoGrid extends Component {
    static propTypes = {
        photos: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            url: ''
        }).isRequired).isRequired,
        params: PropTypes.object
    }
    componentDidMount() {
        const { dispatch, params } = this.props
        dispatch(fetchData(params))
      }
    render() {
        const photos = photos.map((item) =>
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
