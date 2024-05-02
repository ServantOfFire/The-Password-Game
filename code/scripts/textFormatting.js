const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
};

function highlight(strings, ruleNum) {
    if (falseBubbles[0] != ruleNum)
        return false
    setTimeout(() => {
        doSave()
        var htmlContent = inputfield.innerHTML;
        htmlContent = htmlContent.replace(/<mark(.*?)>|<\/mark>/g, '')
        strings.forEach(string => {
            const regex = new RegExp(`(${string})(?![^<]*>)`, 'g');
            htmlContent = htmlContent.replace(regex, '<mark>$1</mark>');
        });
        inputfield.innerHTML = htmlContent;
        doRestore()
    }, 1);

}

function deleteHighlight(ruleNum) {
    if ((falseBubbles[0] != ruleNum || (!falseBubbles.includes(ruleNum)) && ruleNum === 0))
        return
    let newText = inputfield.innerHTML;
    doSave()
    newText = newText.replace(/<mark(.*?)>/g, '')
    newText = newText.replaceAll('</mark>', '')
    inputfield.innerHTML = newText
    doRestore()
}


function isSelectionXYZ(modifier) {
    let acceptedModifiers;
    acceptedModifiers = ['i', 'b', 'mark', 'font']

    let sel;
    if (window.getSelection()) {
        sel = window.getSelection();
        if (sel.rangeCount > 0) {
            let parent = sel.getRangeAt(0).commonAncestorContainer;
            while (parent.nodeType !== Node.ELEMENT_NODE) {
                parent = parent.parentNode;
            }
            while (acceptedModifiers.some((e) => { return parent.tagName.toLowerCase() == e })) {
                if (parent.tagName.toLowerCase() == modifier) {
                    if (modifier == 'font') {
                        return parent
                    }
                    return true
                }
                parent = parent.parentNode
            }
            return false
        }
    }
}

function isBold() {
    if (!document.getElementById('boldButton'))
        return
    if (isSelectionXYZ('b')) {
        document.getElementById('boldButton').classList.add('activeButton')
    } else {
        document.getElementById('boldButton').classList.remove('activeButton')
    }
}

function isItalic() {
    if (!document.getElementById('italicButton'))
        return
    if (isSelectionXYZ('i')) {
        document.getElementById('italicButton').classList.add('activeButton')
    } else {
        document.getElementById('italicButton').classList.remove('activeButton')
    }
}

function resizeWrapper() {
    setTimeout(() => {
        if(document.getElementById('inputfield').offsetLeft == document.getElementById('formattingWrapper').offsetLeft) return
        let wrapper = document.getElementById('formattingWrapper')
        wrapper.style.left = '0px'
        wrapper.style.left = (document.getElementById('inputfield').offsetLeft - document.getElementById('formattingWrapper').offsetLeft) + 'px'
    }, 1);
}