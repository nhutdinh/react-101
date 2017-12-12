import React, { Component } from 'react';
import Photo from '../photo/photo';
import PropTypes from 'prop-types';
import {fetchData} from './photoGrid.action'

class PhotoGrid extends Component {
    static propTypes = {
        photos: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired
        }).isRequired).isRequired,
        selectedFilter : PropTypes.string
    }
    componentDidMount() {
        const { dispatch, selectedFilter } = this.props
        dispatch(fetchPhotos(selectedFilter))
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
          const { dispatch, selectedSubreddit } = nextProps
          dispatch(fetchPostsIfNeeded(selectedSubreddit))
        }
      }
    render() {
        const photos = this.props.photos.map((item) =>
            <Photo key={item.id}/>
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

const mapStateToProps = state => {
    const { selectedFilter, photosByFilter } = state;
    console.log(1212);
    const {
      isFetching,
      lastUpdated,
      items: posts
    } = {
      isFetching: true,
      items: []
    };
  
    return {
      selectedSubreddit,
      posts,
      isFetching,
      lastUpdated,
    }
  }
export default PhotoGrid;
