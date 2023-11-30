'use strict'

let gElCanvas;
let gCtx;

function onInit() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    renderGallery()
    reenderFunctions()
}

function renderMeme() {
    let meme = getMeme()
    let imgUrl = getImg(meme.selectedImgId)
    if (imgUrl) {
        gCtx.drawImage(imgUrl, 0, 0, gElCanvas.width, gElCanvas.height)
    }
    if (meme.lines[gLineId].txt && imgUrl) {
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

function onTextChange(txt, lineId) {
    setLineTxt(txt.value, lineId)
    renderMeme()
}

function onChangeColor(color, lineId) {
    setTextColor(color.value, lineId)
    renderMeme()
}

function onDecreaseFont(lineId) {
    decreaseFont(lineId)
    renderMeme()
}

function onincreaseFont(lineId) {
    increaseFont(lineId)
    renderMeme()
}

function switchRectText(lineId) {
    if (!gMeme.lines[lineId].txt) return
    var text = gMeme.lines[lineId].txt;
    var textWidth = gCtx.measureText(text).width;
    var textHeight = gMeme.lines[lineId].size;
    var padding = 10;
    var rectWidth = textWidth + 2 * padding;
    var rectHeight = textHeight + 2 * padding;
    var x = (gElCanvas.width - rectWidth) / 2;
    var y = gMeme.lines[lineId].posY - textHeight / 2 - padding;
    // gCtx.beginPath();
    gCtx.rect(x, y, rectWidth, rectHeight);
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.stroke();

}

function clearRect() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function onSwitchLine() {
    clearRect()
    var currLine = switchLine();
    switchRectText(currLine)
    renderMeme()
}

function onAddLine() {
    addLine()
    reenderFunctions()
}

function reenderFunctions() {
    let meme = getMeme()
    let elFunctions = document.querySelector('.main-functions')
    let strHtml = meme.lines.map(line => `<section data-id="${line.id}">
    <input type="text" name="add-text" placeholder="Add Text Here" onchange="onTextChange(this,${line.id})">
    <input type="color" name="select-color" onchange="onChangeColor(this,${line.id})">
    <button onclick="onDecreaseFont(${line.id})"><img src="ICONS/decrease font - icon.png"></button>
    <button onclick="onincreaseFont(${line.id})"><img src="ICONS/increase font - icon.png"></button>
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