import React, { Component } from 'react';
import './photo.scss';
import {selectPhoto} from './photo.action'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {fetchMorePhotos} from '../photo-grid/photoGrid.action'

class Photo extends Component {
    static propTypes = {
        file: PropTypes.object,
        onPhotoClicked : PropTypes.func
    }
    render() {
        const divStyle = {
            color: 'blue',
            backgroundImage: 'url(' + this.props.file.url + ')',
            width: this.props.file.w + "px",
            height: this.props.file.h + "px",
            margin: this.props.file.margin + "px"
          };
        return (
            <div style={divStyle} onClick={(e) => this.props.onPhotoClicked(this.props.file, e)} className='photo' >
                {this.props.file.id}
            </div>
        );
    }
}
const mapDispatchToProps =  (dispatch,state) => {
    return {
        onPhotoClicked: (photo) => {
            dispatch(fetchMorePhotos(state.selectedFilter))
        }
    }
}

export default connect(null, mapDispatchToProps)(Photo)
