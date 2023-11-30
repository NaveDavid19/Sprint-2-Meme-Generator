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



function onSwitchLine() {
    var currLine = switchLine();
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    renderMeme();
    if (gMeme.lines[currLine].txt) {
        var text = gMeme.lines[currLine].txt;
        var textWidth = gCtx.measureText(text).width;
        var textHeight = gMeme.lines[currLine].size;
        var padding = 10;
        var rectWidth = textWidth + 2 * padding;
        var rectHeight = textHeight + 2 * padding;
        var x = (gElCanvas.width - rectWidth) / 2;
        var y = gMeme.lines[currLine].posY - textHeight / 2 - padding;

        gCtx.beginPath();
        gCtx.rect(x, y, rectWidth, rectHeight);
        gCtx.lineWidth = 2;
        gCtx.strokeStyle = 'black';
        gCtx.stroke();
    }
}

function onAddLine() {
    addLine()
    let meme = getMeme()
    let elFunctions = document.querySelector('.main-functions')
    let strHtml = meme.lines.map(line => `<section data-id="${line.id}">
    <input type="text" name="add-text" placeholder="Add Text Here" onchange="onTextChange(this)">

    <input type="color" name="select-color" onchange="onChangeColor(this)">
    <button onclick="onDecreaseFont()"><img src="ICONS/decrease font - icon.png"></button>
    <button onclick="onincreaseFont()"><img src="ICONS/increase font - icon.png"></button>
    <button onclick="onAddLine()"><img src="ICONS/add.png"></button>
    <button onclick="onSwitchLine()"><img
            src="ICONS/up-and-down-opposite-double-arrows-side-by-side.png"></button>
</section>`).join('')

    elFunctions.innerHTML = strHtml
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