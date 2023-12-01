'use strict'

function onInit() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    renderGallery()
}

function onSelectPage(header) {
    var pages = document.querySelectorAll('.page')
    var elTitle = document.querySelector('.title-gallery')
    if (header.id === 'gallery')
        elTitle.classList.remove('hide')
    else {
        elTitle.classList.add('hide')
    }
    pages.forEach(page => {
        if (page.id === header.id) {
            page.classList.remove('hide')
        } else {
            page.classList.add('hide')
        }
    })
}
