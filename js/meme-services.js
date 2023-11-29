'use strict'
let gMemeId = 1

let gImgs = [{ id: 1, url: 'meme-imgs/meme-imgs (square)/1.jpg', keywords: ['trump'] }, { id: 2, url: `meme-imgs/meme-imgs (square)/2.jpg`, keywords: ['trump'] }]

let gMeme = {
    selectedImgId: undefined,
    selectedLineIdx: undefined,
    lines: [
        {
            id: gMemeId,
            txt: undefined,
            size: 20,
            color: 'blue'
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

function setTextColor(color) {
    gMeme.lines[0].color = color
}

function setLineTxt(txt) {
    gMeme.lines[0].txt = txt
}


function increaseFont() {
    let currFont = gCtx.font.substring(0, gCtx.font.indexOf('px'))
    currFont++
    gMeme.lines[0].size = currFont
}

function decreaseFont() {
    let currFont = gCtx.font.substring(0, gCtx.font.indexOf('px'))
    currFont--
    gMeme.lines[0].size = currFont
}

// function selectedLineIdx(lineId) {
//     gMeme.selectedLineIdx = lineId
// }

function addLine() {
    gMemeId++
    gMeme.lines.push({
        id: gMemeId,
        txt: undefined,
        size: 20,
        color: 'blue'
    },)
}


// function DownloadImg
function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}