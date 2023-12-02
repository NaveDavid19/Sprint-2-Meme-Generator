'use strict'
let gLineId = 0
let gPosY = 10
let gIsMax = false

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
        selectedLineIdx: 0,
        lines: [
            {
                id: gLineId,
                txt: ' ',
                size: 20,
                color: 'black',
                posY: gPosY
            },
        ]
    }
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setTextColor(color, lineId) {
    let currLine = gMeme.lines.find(line => line.id === lineId)
    currLine.color = color
}

function setLineTxt(text, lineId) {
    let currLine = gMeme.lines.find(line => line.id === lineId)
    currLine.txt = text
}


function increaseFont(lineId) {
    let currLine = gMeme.lines.find(line => line.id === lineId)
    let currFont = currLine.size
    currFont++
    currLine.size = currFont
}

function decreaseFont(lineId) {
    let currLine = gMeme.lines.find(line => line.id === lineId)
    let currFont = currLine.size
    currFont--
    currLine.size = currFont
}

function addLine() {
    gMeme.selectedLineIdx++
    gLineId++
    gPosY += 40
    gMeme.lines.push({
        id: gLineId,
        txt: ' ',
        size: 20,
        color: 'black',
        posY: gPosY
    })
}

function switchLine() {
    if (gMeme.lines.length === 1) return

    let step

    if (gMeme.selectedLineIdx < gMeme.lines.length - 1 && !gIsMax) {
        step = 1
    } else {
        gIsMax = true
        step = -1
    }
    if (gMeme.selectedLineIdx === 0) {
        step = 1
        gIsMax = false
    }
    gMeme.selectedLineIdx += step
    return gMeme.selectedLineIdx
}

function deleteLine(lineId) {
    let lineIdx = gMeme.lines.findIndex(line => line.id === lineId)
    gMeme.lines.splice(lineIdx, 1)
    gLineId--
    gMeme.selectedLineIdx--
    if (gMeme.lines.length === 0) {
        addLine()
    }
}

function positionUp(lineId) {
    let currLine = gMeme.lines.find(line => line.id === lineId)
    currLine.posY -= 1
}

function positionDown(lineId) {
    let currLine = gMeme.lines.find(line => line.id === lineId)
    currLine.posY += 1
}


// function DownloadImg
function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}