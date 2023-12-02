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

function createDefaultLine() {
    return {
        id: gLineId,
        txt: ' ',
        size: 20,
        color: '#000000',
        posY: gPosY,
        posX: 150
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

function updateSelectedLine(clickedText) {
    const currLine = gMeme.lines.findIndex(line => line.id === clickedText.id);
    gMeme.selectedLineIdx = currLine;
}

function emojiClick(lineId) {
    let currLine = gMeme.lines.find(line => line.id === lineId)
    currLine.txt += '😁'
}

// function DownloadImg
function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}


function onUploadImg() {
    // Gets the image from the canvas
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        // Handle some special characters
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }

    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

// Upload the image to a server, get back a URL 
// call the function onSuccess when done
function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        // If the request is not done, we have no business here yet, so return
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        // if the response is not ok, show an error
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        // Same as
        // const url = XHR.responseText

        // If the response is ok, call the onSuccess callback function, 
        // that will create the link to facebook using the url we got
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}



function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = function (event) {
        let img = new Image()
        img.src = event.target.result
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    let elGallery = document.querySelector('.gallery')
    var elTitle = document.querySelector('.title-gallery')
    elTitle.classList.add('hide')
    elGallery.classList.add('hide')
    let elMeme = document.querySelector('.memes')
    elMeme.classList.remove('hide')
    resetMeme()
    renderMeme()
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}