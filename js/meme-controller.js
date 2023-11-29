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
    if (imgUrl) {
        gCtx.drawImage(imgUrl, 0, 0, gElCanvas.width, gElCanvas.height)
    }
    if (meme.lines[gMemeId].txt && imgUrl) {
        meme.lines.forEach(function (lineProp) {
            drawText(lineProp.txt, gElCanvas.width / 2, lineProp.posY, lineProp.size, lineProp.color)
        })
        // drawText(meme.lines[gMemeId].txt, gElCanvas.width / 2, 30, meme.lines[gMemeId].size, meme.lines[gMemeId].color)
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
    setLineTxt(txt.value)
    renderMeme()
}

function onChangeColor(color) {
    setTextColor(color.value)
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

// function onSelectLine(lineId) {
//     selectedLineIdx(lineId)
//     renderMeme()
// }

function onAddLine() {
    addLine()
    // renderMeme()
}
function drawText(text, x, y, size, color) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = `${color}`
    gCtx.fillStyle = 'black'
    gCtx.font = `${size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}