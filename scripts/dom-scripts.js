'use strict';

/**
 * Insert the text at the cursor into the active element. Note that we're
 * intentionally not appending or simply replacing the value of the editable
 * field, as we want to allow normal pasting conventions. If you paste at the
 * beginning, you shouldn't see all your text be replaced.
 * Taken from:
 * http://stackoverflow.com/questions/7404366/how-do-i-insert-some-text-where-the-cursor-is
 */
function setInputElementValue(text) {
    var activeDomElement = document.activeElement;
    var value = activeDomElement.value;
    var endIndex;
    var range;
    var oDocument = activeDomElement.ownerDocument;
    if (typeof activeDomElement.selectionStart === 'number' &&
        typeof activeDomElement.selectionEnd === 'number') {
        endIndex = activeDomElement.selectionEnd;
        activeDomElement.value = value.slice(0, endIndex) + text + value.slice(endIndex);
        activeDomElement.selectionStart = activeDomElement.selectionEnd = endIndex + text.length;
    } else if (oDocument.selection !== 'undefined' && oDocument.selection && oDocument.selection.createRange) {
        activeDomElement.focus();
        range = oDocument.selection.createRange();
        range.collapse(false);
        range.text = text;
        range.select();
    }

    //For Force fill use:
    //activeDomElement.value = text;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.data) {
        setInputElementValue(request.data);
    }
});