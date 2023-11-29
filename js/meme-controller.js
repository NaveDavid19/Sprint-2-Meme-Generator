'use strict'

let gElCanvas;
let gCtx;

function onInit() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    renderGallery()
}

function renderMeme() {
    let meme = getMeme()
    let imgUrl = getImg(meme.selectedImgId)
    gCtx.drawImage(imgUrl, 0, 0, gElCanvas.width, gElCanvas.height)
    if (meme.lines[0].txt) {
        drawText(meme.lines[0].txt, gElCanvas.width / 2, 30, meme.lines[0].size)
    }
}

function getImg(imgId) {
    return document.querySelector(`[data-id="${imgId}"]`);
}

function onSelectImg(elImg) {
    let currImgId = elImg.dataset.id
    setImg(+currImgId)
    renderMeme()
}



function onTextChange(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onDecreaseFont() {
    decreaseFont()
    renderMeme()
}

function onincreaseFont() {
    increaseFont()
    renderMeme()
}
function drawText(text, x, y, size) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'blue'
    gCtx.fillStyle = 'black'
    gCtx.font = `${size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}