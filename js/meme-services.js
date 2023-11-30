'use strict'
let gLineId = 0
let gPosY = 10
let isMax = false


let gImgs = [{ id: 1, url: 'meme-imgs/meme-imgs (square)/1.jpg', keywords: ['trump'] }, { id: 2, url: `meme-imgs/meme-imgs (square)/2.jpg`, keywords: ['trump'] }]

let gMeme = {
    selectedImgId: undefined,
    selectedLineIdx: -1,
    lines: [
        {
            id: gLineId,
            txt: undefined,
            size: 20,
            color: 'blue',
            posY: gPosY
        },
    ]
}

// let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getMeme() {
    return gMeme
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setTextColor(color, lineId) {
    gMeme.lines[lineId].color = color
}

function setLineTxt(txt, lineId) {
    gMeme.lines[lineId].txt = txt
}


function increaseFont(lineId) {
    let currFont = gCtx.font.substring(0, gCtx.font.indexOf('px'))
    currFont++
    gMeme.lines[lineId].size = currFont
}

function decreaseFont(lineId) {
    let currFont = gCtx.font.substring(0, gCtx.font.indexOf('px'))
    currFont--
    gMeme.lines[lineId].size = currFont
}

function addLine() {
    gLineId++
    gPosY += 20
    gMeme.lines.push({
        id: gLineId,
        txt: undefined,
        size: 20,
        color: 'blue',
        posY: gPosY
    },)
}
function switchLine() {
    if (gMeme.selectedLineIdx < gMeme.lines.length && !isMax) {
        gMeme.selectedLineIdx += 1
    } else {
        isMax = true
        gMeme.selectedLineIdx -= 1
        if (gMeme.selectedLineIdx === 0) {
            isMax = false
        }
    }
    return gMeme.selectedLineIdx
}


// function DownloadImg
function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}