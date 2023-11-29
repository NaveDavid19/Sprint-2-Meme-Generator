'use strict'


let gImgs = [{ id: 1, url: 'meme-imgs/meme-imgs (square)/1.jpg', keywords: ['trump'] }, { id: 2, url: 'meme-imgs/meme-imgs (square)/2.jpg', keywords: ['trump'] }]

let gMeme = {
    selectedImgId: undefined,
    selectedLineIdx: undefined,
    lines: [
        {
            txt: undefined,
            size: undefined,
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



// function DownloadImg
function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}