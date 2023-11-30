'use strict'

function onInit() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    renderGallery()
}

function onSelectPage(header) {
    var pages = document.querySelectorAll('.page')
    pages.forEach(page => {
        if (page.id == header.id) {
            page.classList.remove('hide')
        } else {
            page.classList.add('hide')
        }
    })
}
