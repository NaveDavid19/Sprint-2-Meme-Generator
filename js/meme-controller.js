'use strict'

let gElCanvas;
let gCtx;



function renderMeme() {
    let meme = getMeme()
    let imgUrl = getImg(meme.selectedImgId)
    renderImage(meme)
    renderLines(meme, imgUrl)
    renderRectangles(meme)
    renderFunctions()
}

function renderImage(meme) {
    let imgUrl = getImg(meme.selectedImgId)
    if (imgUrl) {
        gCtx.drawImage(imgUrl, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function renderRectangles(meme) {
    if (!gIsSwitch) return
    let selectedLine = meme.lines[meme.selectedLineIdx]
    console.log(selectedLine);
    if (!selectedLine.txt) return

    let text = selectedLine.txt;
    let textWidth = gCtx.measureText(text).width;
    let textHeight = selectedLine.size;
    let padding = 10;
    let rectWidth = textWidth + 2 * padding;
    let rectHeight = textHeight + 2 * padding;
    let x = (gElCanvas.width - rectWidth) / 2;
    let y = selectedLine.posY - textHeight / 2 - padding;

    gCtx.rect(x, y, rectWidth, rectHeight);
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
}

function renderLines(meme, imgUrl) {
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

function clearRect() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function onSwitchLine() {
    switchLine();
    renderMeme()
}

function onAddLine() {
    addLine()
    renderFunctions()
}

function renderFunctions() {
    let meme = getMeme()
    let elFunctions = document.querySelector('.main-functions')

    let strHtml = meme.lines.map(line => `<section data-id="${line.id}">
    <input type="text" name="add-text" placeholder="Add Text Here" onchange="onTextChange(this,${line.id})">
    <input type="color" name="select-color" onchange="onChangeColor(this,${line.id})">
    <button onclick="onDecreaseFont(${line.id})"><img src="ICONS/decrease font - icon.png"></button>
    <button onclick="onincreaseFont(${line.id})"><img src="ICONS/increase font - icon.png"></button>
    <button onclick="onAddLine()"><img src="ICONS/add.png"></button>
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