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
    elGallery.classList.add('hide')
    let elMeme = document.querySelector('.memes')
    elMeme.classList.remove('hide')
    let currImgId = elImg.dataset.id
    resetMeme()
    setImg(+currImgId)
    renderMeme()
}