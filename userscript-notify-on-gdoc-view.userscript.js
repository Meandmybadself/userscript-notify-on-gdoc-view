// ==UserScript==
// @name         Notify on Document View
// @namespace    https://meandmybadself.com
// @version      1.0
// @description  Sends on web notification when someone views your Google document.
// @author       Jeffery B. <me@meandmybadself.com>
// @match        https://docs.google.com/document/d/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

let previousViewers = new Set([])
let isInitialPoll = true;

function isInCorrectHTMLDoc() {
    return Boolean(document.querySelector('div.docs-presence-plus-widget-inner.goog-inline-block'))
}

function getCurrentDocumentViewersNames() {
    return [...document.querySelectorAll('div.docs-presence-plus-widget-inner.goog-inline-block > div > div')].map(el => {
        const img = el.querySelector('img')
        return img.getAttribute('alt')
    })
}

function poll() {
    if (!isInitialPoll && isInCorrectHTMLDoc()) {
        const currentViewers = getCurrentDocumentViewersNames()
        if (currentViewers.length) {
            const newViewers = currentViewers.filter(viewer => !previousViewers.has(viewer))
            if (newViewers.length) {
                // Notify of new viewers
                const message = newViewers.length > 0 ? `${newViewers.join(', ')} joined the document.` : 'No new viewers.'
                console.log(new Date(), message)
                new Notification('Google Docs', {
                    body: message,
                    icon: 'https://www.google.com/s2/favicons?sz=64&domain=google.com'
                })
            }
        }
        // Update previous viewers
        previousViewers = new Set(currentViewers)
        setTimeout(() => poll(), 5000)
        return;
    }
    isInitialPoll = false
}

(function () {

    // Check to see if the user has granted permission for notifications
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    setTimeout(() => poll(), 5000)
})();