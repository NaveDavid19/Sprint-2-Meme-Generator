'use strict'


let gImgs = [{ id: 1, url: 'meme-imgs/meme-imgs (square)/1.jpg', keywords: ['trump'] }, { id: 2, url: `meme-imgs/meme-imgs (square)/2.jpg`, keywords: ['trump'] }]

let gMeme = {
    selectedImgId: undefined,
    selectedLineIdx: undefined,
    lines: [
        {
            txt: undefined,
            size: 20,
            color: undefined,
        },
        {
            txt: undefined,
            size: 20,
            color: undefined,
        }
    ]
}

// let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getMeme() {
    return gMeme
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}



function setLineTxt(txt) {
    gMeme.lines[0].txt = txt
}


function increaseFont() {
    var currFont = gCtx.font
    var nextSize = currFont.substring(0, currFont.indexOf('px'))
    nextSize++
    gMeme.lines[0].size = nextSize
}

function decreaseFont() {
    var currFont = gCtx.font
    var nextSize = currFont.substring(0, currFont.indexOf('px'))
    nextSize--
    gMeme.lines[0].size = nextSize
}


// function DownloadImg
function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}