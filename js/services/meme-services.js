'use strict'
let gLineId = 0
let gPosY = 30
let gIsMax = false

let gMeme = createMeme()

// let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getMeme() {
    return gMeme
}

function resetMeme() {
    gLineId = 0
    gPosY = 30
    gMeme = createMeme()
}

function createDefaultLine() {
    return {
        id: gLineId,
        txt: 'Enter Text',
        size: 20,
        color: '#000000',
        posY: gPosY,
        posX: 250
    }

}
function createMeme() {
    return {
        selectedImgId: undefined,
        selectedLineIdx: 0,
        lines: [
            createDefaultLine()
        ]
    }
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function findLine(lineId) {
    return gMeme.lines.find(line => line.id === lineId)
}

function setTextColor(color, lineId) {
    let currLine = findLine(lineId)
    currLine.color = color
}

function setLineTxt(text, lineId) {
    let currLine = findLine(lineId)
    currLine.txt = text
}


function increaseFont(lineId) {
    let currLine = findLine(lineId)
    let currFont = currLine.size
    currFont++
    currLine.size = currFont
}

function decreaseFont(lineId) {
    let currLine = findLine(lineId)
    let currFont = currLine.size
    currFont--
    currLine.size = currFont
}

function addLine() {
    gMeme.selectedLineIdx = gMeme.lines.length
    gLineId++
    gPosY += 40
    gMeme.lines.push(createDefaultLine())
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

function fineIdxLine(lineId) {
    return gMeme.lines.findIndex(line => line.id === lineId)
}

function deleteLine(lineId) {
    const lineIdx = fineIdxLine(lineId)
    gPosY = gMeme.lines[lineIdx].posY - 40
    gMeme.lines.splice(lineIdx, 1)
    gMeme.selectedLineIdx--
    if (gMeme.lines.length === 0) {
        addLine()
    }
}

function positionUp(lineId) {
    const currLine = findLine(lineId)
    currLine.posY -= 1
}

function positionDown(lineId) {
    const currLine = findLine(lineId)
    currLine.posY += 1
}

function updateSelectedLine(clickedText) {
    const currLine = fineIdxLine(clickedText.id)
    gMeme.selectedLineIdx = currLine;
}

function emojiClick(lineId) {
    let currLine = findLine(lineId)
    currLine.txt += '😁'
}

function alignRight(lineId) {
    const currLine = findLine(lineId)
    currLine.posX = 400
}

function alignCenter(lineId) {
    const currLine = findLine(lineId)
    currLine.posX = 250
}

function alignLeft(lineId) {
    const currLine = findLine(lineId)
    currLine.posX = 100
}






