'use strict'

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = function (event) {
        let img = new Image()
        img.src = event.target.result
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    let elGallery = document.querySelector('.gallery')
    var elTitle = document.querySelector('.title-gallery')
    elTitle.classList.add('hide')
    elGallery.classList.add('hide')
    let elMeme = document.querySelector('.memes')
    elMeme.classList.remove('hide')
    resetMeme()
    renderMeme()
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}