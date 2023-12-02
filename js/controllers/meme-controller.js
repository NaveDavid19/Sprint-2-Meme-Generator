'use strict'

let gElCanvas;
let gCtx;



function renderMeme() {
    let meme = getMeme()
    let imgUrl = getImg(meme.selectedImgId)
    gCtx.reset()
    renderImage(meme)
    renderLines(meme, imgUrl)
    renderRectangles(meme.lines[meme.selectedLineIdx])
    renderFunctions()
}

function renderImage(meme) {
    let imgUrl = getImg(meme.selectedImgId)
    if (imgUrl) {
        gCtx.drawImage(imgUrl, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function calcRectPos(line) {
    let text = line.txt;
    let textWidth = gCtx.measureText(text).width;
    let textHeight = line.size;
    let padding = 10;
    let rectWidth = textWidth + 2 * padding;
    let rectHeight = textHeight + 2 * padding;
    let x = (gElCanvas.width - rectWidth) / 2;
    let y = line.posY - textHeight / 2 - padding;
    return {
        rectHeight,
        rectWidth,
        x,
        y,
    }
}

function renderRectangles(line) {
    let { rectHeight, rectWidth, x, y } = calcRectPos(line)

    gCtx.rect(x, y, rectWidth, rectHeight);
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
}

function renderLines(meme, imgUrl) {
    if (meme.lines.length === 0) return
    if (meme.lines[gLineId].txt && imgUrl) {
        meme.lines.forEach(function (lineProp) {
            drawText(lineProp.txt, lineProp.posX, lineProp.posY, lineProp.size, lineProp.color)
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

function onSwitchLine() {
    switchLine();
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onDeleteLine(lineId) {
    deleteLine(lineId)
    renderMeme()
}

function onPositionUp(lineId) {
    positionUp(lineId)
    renderMeme()
}

function onPositionDown(lineId) {
    positionDown(lineId)
    renderMeme()
}

function onEmojiClick(lineId) {
    emojiClick(lineId)
    renderMeme()
}

function renderFunctions() {
    let meme = getMeme()
    let elFunctions = document.querySelector('.main-functions')
    let currLine = meme.lines.find(line => line.id === meme.selectedLineIdx)

    let strHtml = `<section data-id="${currLine.id}">
    <input type="text" name="add-text" placeholder="Add Text Here" value="${currLine.txt === ' ' ? '' : `${currLine.txt}`}"onchange="onTextChange(this,${currLine.id})">
    <input type="color" value="${currLine.color}" name="select-color" onchange="onChangeColor(this,${currLine.id})">
    <button onclick="onEmojiClick(${currLine.id})"><img src="ICONS/emoji-logo.png"></button>
    <button onclick="onDecreaseFont(${currLine.id})"><img src="ICONS/decrease font - icon.png"></button>
    <button onclick="onincreaseFont(${currLine.id})"><img src="ICONS/increase font - icon.png"></button>
    <button onclick="onPositionUp(${currLine.id})"><img src="ICONS/up-arrow-black.png"></button>
    <button onclick="onPositionDown(${currLine.id})"><img src="ICONS/down-arrow.png"></button>
    <button onclick="onDeleteLine(${currLine.id})"><img src="ICONS/trash.png"></button>
</section>`

    elFunctions.innerHTML = strHtml
}

function onMouseMove(ev) {
    const { offsetX, offsetY } = ev;
    const clickedText = gMeme.lines.find(line => {
        const positionRange = calcRectPos(line);
        return offsetX >= positionRange.x && offsetX <= positionRange.x + positionRange.rectWidth &&
            offsetY >= positionRange.y && offsetY <= positionRange.y + positionRange.rectHeight;
    });

    if (clickedText) {
        updateSelectedLine(clickedText);
        renderMeme()
    }
}

function drawText(text, x, y, size, color) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = `${color}`
    gCtx.fillStyle = 'white'
    gCtx.font = `${size}px Impact`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}