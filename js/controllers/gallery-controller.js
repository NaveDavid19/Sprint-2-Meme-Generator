'use strict'





function renderGallery() {
    let elGallery = document.querySelector('.gallery-container')
    let imgs = getImgs()
    let strHtml = imgs.map(img => `<img data-id="${img.id}" onclick="onSelectImg(this)" src="meme-imgs/meme-imgs (square)/${img.id}.jpg" />`).join('')
    elGallery.innerHTML = strHtml
}

function getImgs() {
    return gImgs
}

function onSelectImg(elImg) {
    let elGallery = document.querySelector('.gallery')
    var elTitle = document.querySelector('.title-gallery')
    elTitle.classList.add('hide')
    elGallery.classList.add('hide')
    let elMeme = document.querySelector('.memes')
    elMeme.classList.remove('hide')
    let currImgId = elImg.dataset.id
    resetMeme()
    setImg(+currImgId)

    renderMeme()
}

// function DownloadImg
function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

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