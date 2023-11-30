'use strict'
let gLineId = 0
let gPosY = 10
let gIsMax = false
let gIsSwitch = false


let gImgs = [{ id: 1, url: 'meme-imgs/meme-imgs (square)/1.jpg', keywords: ['trump'] }, { id: 2, url: `meme-imgs/meme-imgs (square)/2.jpg`, keywords: ['trump'] }]

let gMeme = createMeme()

// let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getMeme() {
    return gMeme
}

function resetMeme() {
    gLineId = 0
    gMeme = createMeme()
}

function createMeme() {
    return {
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
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setTextColor(color, lineId) {
    gMeme.lines[lineId].color = color
}

function setLineTxt(text, lineId) {
    gMeme.lines[lineId].txt = text
}


function increaseFont(lineId) {
    let currFont = gMeme.lines[lineId].size
    currFont++
    gMeme.lines[lineId].size = currFont
}

function decreaseFont(lineId) {
    let currFont = gMeme.lines[lineId].size
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
    gIsSwitch = true
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1 && !gIsMax) {
        gMeme.selectedLineIdx += 1
    } else {
        gIsMax = true
        gMeme.selectedLineIdx -= 1
        if (gMeme.selectedLineIdx === 0) {
            gIsMax = false
        }
    }
    return gMeme.selectedLineIdx
}


// function DownloadImg
function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}