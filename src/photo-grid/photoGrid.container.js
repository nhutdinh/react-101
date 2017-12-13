import React, { Component } from 'react';
import Photo from '../photo/photo';
import PropTypes from 'prop-types';
import {fetchPhotos} from './photoGrid.action'
import { connect } from 'react-redux'
import GridMaker from "./grid-marker"

class PhotoGrid extends Component {
    static propTypes = {
        photosByFilter: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired
        }).isRequired),
        selectedFilter : PropTypes.object
    }
    componentDidMount() {
        const { dispatch, selectedFilter } = this.props
        dispatch(fetchPhotos(selectedFilter))
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedFilter !== this.props.selectedFilter) {
          const { dispatch, selectedFilter } = nextProps
          dispatch(fetchPhotos(selectedFilter))
        }
      }
    render() {
        if(!this.props.photosByFilter) return <div>No data</div>;
        const photosA = new GridMaker().generate(this.props.photosByFilter);
        const photos = this.props.photosByFilter.map((item) =>
            <Photo key={item.id} file={item}/>
        );
        return (
            <div className="">
                <div className="photo-grid">
                    {photos}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { selectedFilter, photosByFilter, isFetching } = state;
    return {
      selectedFilter,
      photosByFilter,
      isFetching
    }
  }
  export default connect(mapStateToProps)(PhotoGrid)
