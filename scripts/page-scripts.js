function setInputValueFromClipboard() {
    var sandbox = document.getElementById('typeIn-text');
    sandbox.value = '';
    sandbox.select();
    if (document.execCommand('paste')) {
    }
}

/**
 * Send the value that should be pasted to the content script.
 */
 function sendTextToDOM(toBePasted) {
    // We first need to find the active tab and window and then send the data
    // along. This is based on:
    // https://developer.chrome.com/extensions/messaging
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {data: toBePasted});
    });
}

