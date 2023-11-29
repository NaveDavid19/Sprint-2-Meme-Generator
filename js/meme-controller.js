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
        drawText(meme.lines[0].txt, gElCanvas.width / 2, 30)
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


function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'black'
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onTextChange(txt) {
    setLineTxt(txt)
    renderMeme()
}

