const clipboard = require('electron').clipboard

window.Preload = {
    copyText (text) {
        clipboard.writeText(text)
    }
}
