if(document.getElementById('typeIn-btn')){
    document.getElementById('typeIn-btn').addEventListener('click', ()=>{
        var txtElement = document.getElementById('typeIn-text');
        var value = txtElement ? txtElement.value : ''
        sendTextToDOM(value);
    })
}

setInputValueFromClipboard();
