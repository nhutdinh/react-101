export const PHOTO_CLICKED = 'PHOTO_CLICKED'

export const selectPhoto = selectedPhoto => {
    return {
        type: PHOTO_CLICKED,
        selectedPhoto
    }
}