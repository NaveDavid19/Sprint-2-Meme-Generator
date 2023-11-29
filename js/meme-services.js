'use strict'


var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }]
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red'
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme(imgUrl) {
    let currImgIdx = gImgs.findIndex(img => img.url === imgUrl)
    let currImg = gImgs[currImgIdx]
    return currImg
}



function setLineTxt(word) {
    drawText(word, gElCanvas.width / 2, 30);

}



// function DownloadImg
function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}