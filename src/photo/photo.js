import React, { Component } from 'react';
import './photo.scss';

class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = { file: props.file, css: "photo" };
    }
    onPhotoClicked(){
        console.log(arguments);
        var css = "photo photo--bg-red";
        this.setState({css: css});
    }
    render() {
        return (
            <div onClick={this.onPhotoClicked.bind(this, this.state.file)} className={this.state.css} >
                {this.state.file.id}
            </div>
        );
    }
}

export default Photo;
