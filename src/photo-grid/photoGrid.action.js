import fetch from 'cross-fetch'
import { selectedFilter } from '../filter/picker.reducer';
import GridMaker from "./grid-marker"

export const REQUEST_PHOTOS = 'REQUEST_PHOTOS'
export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS'
export const PHOTOS_LOADED = 'PHOTOS_LOADED'
export const RECEIVE_MORE_PHOTOS = 'RECEIVE_MORE_PHOTOS'
export const FETCH_MORE_PHOTOS = 'FETCH_MORE_PHOTOS'


export const fetchPhotos = selectedFilter => (dispatch, getState) => {
    if (shouldFetchPhotos(getState(), selectedFilter)) {
        dispatch(requestPhotos(selectedFilter));
        return fetch("https://qa.pixerf.com/api/media/search", {method: 'POST', body: JSON.stringify(selectedFilter)})
            .then(response => response.json())
            .then(json => loadPhotos(json))
            .then(json => dispatch(receivePhotos(selectedFilter, json)))
            
    }
}
export const fetchMorePhotos = selectedFilter => (dispatch, getState) => {
    if (shouldFetchPhotos(getState(), selectedFilter)) {
        dispatch(requestPhotos(selectedFilter));
        return fetch("https://qa.pixerf.com/api/media/search", {method: 'POST', body: JSON.stringify(selectedFilter)})
            .then(response => response.json())
            .then(json => loadPhotos(json))
            .then(json => dispatch(receiveMorePhotos(selectedFilter, json)))
            
    }
}


const requestPhotos = selectedFilter => {
    return {
        type: REQUEST_PHOTOS,
        selectedFilter
    }
}
const loadPhotos = (photos) => {
    var promise = new Promise((resolve, reject) => {
        var imageElements = [];
        var loadedImage = 0;
        var failedToLoadImages = [];
        for(var i=0; i< photos.length; i++){
            imageElements[i] = new Image();
            imageElements[i].setAttribute("class", "image"+i);
            imageElements[i].onload = (function(idx){
                return function(){
                    loadedImage ++;
                    photos[idx].w = this.width;
                    photos[idx].h = this.height;
                    photos[idx].ar = this.width / this.height;
                    if(loadedImage === photos.length){
                        console.log('PHOTOS_LOADED');
                        resolve(photos)
                    }
                }
            })(i)
            imageElements[i].onerror = (function(idx){
                return function(){
                    loadedImage ++;
                    failedToLoadImages.push(photos[idx].id);
                    if(loadedImage === photos.length){
                        console.log('PHOTOS_LOADED');
                        resolve(photos)
                    }
                }
            })(i)
            var photo = photos[i];
            photo.url = "https://qa.pixerf.com/thumbnail/" + photo.id + "/x600";
            imageElements[i].src = photo.url;
        }
    })
    return promise
}
const receivePhotos = (selectedFilter, photos) => {
    console.log('RECEIVE_PHOTOS');
    let gridMarker = new GridMaker();
    gridMarker.generate(photos);
    return {
        type: RECEIVE_PHOTOS,
        selectedFilter,
        photos: photos
    }
}
const receiveMorePhotos = (selectedFilter, photos) => {
    console.log('RECEIVE_MORE_PHOTOS');
    let gridMarker = new GridMaker();
    gridMarker.generate(photos);
    return {
        type: RECEIVE_MORE_PHOTOS,
        selectedFilter,
        photos: photos
    }
}
const shouldFetchPhotos = (state, selectedFilter) => (
    !state.isFetching
)