import React, { Component } from 'react';
import Photo from '../photo/photo';
import PropTypes from 'prop-types';
import {fetchPhotos} from './photoGrid.action'
import { connect } from 'react-redux'


class PhotoGrid extends Component {
    static propTypes = {
        photosByFilter: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired
        }).isRequired),
        selectedFilter : PropTypes.object,
        startRender: PropTypes.func
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
        const photos = this.props.photosByFilter;
        const photosElmts = photos.map((item,i) =>{
            return <Photo key={item.uid} file={item}/>
        });
        return (
            
            <div className="">
                <div className="photo-grid">
                    {photosElmts}
                </div>
                {(this.props.isFetching &&  <div>Loading...</div>)}
            </div>
        );
        
        
        
    }
}

const mapStateToProps = state => {
    console.log(state.selectedPhoto);
    const { selectedFilter, photosByFilter, isFetching } = state;
    return {
      selectedFilter,
      photosByFilter,
      isFetching
    }
  }
  export default connect(mapStateToProps)(PhotoGrid)
