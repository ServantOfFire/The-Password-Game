const modifyText = (command, defaultUi, value) => {
    switch (true) {
        case command != 'fontSize':
            document.execCommand(command, defaultUi, value);
            break;

        case command == 'fontSize':
            document.execCommand("fontSize", false, "7");
            var fontElements = window.getSelection().anchorNode.parentNode
            while (fontElements.tagName != 'FONT'){fontElements = fontElements.parentElement} 
            fontElements.removeAttribute("size");
            fontElements.style.fontSize = value + 'px';
            break;
    }
};

function highlight(strings, ruleNum, exception = null) {
    if (falseBubbles[0] != ruleNum) return;
    if (!strings) return;
    setTimeout(() => {

        doSave();
        let htmlContent = inputfield.innerHTML.replace(/<mark(.*?)>|<\/mark>/g, ''); //get rid of old mark tags
        let exceptionTag = false
        let regex;

        strings = strings.filter((value, index, self) => self.indexOf(value) === index);
        strings.forEach(string => {
            let firstTime = true
            switch (exception) {
                default:
                    regex = new RegExp(`${string}(?![^<]*>)`, "gm");
                    break;
                case 'bolded':
                    exceptionTag = 'b';
                    exceptionAttribute = ''
                    regex = new RegExp(`${string}(?![^<>]*>)(?!(?<=<${exceptionTag}${exceptionAttribute}>[^<]*)[^<]*<\/${exceptionTag})`, 'gm')
                    break;
                case 'Times New Roman':
                    exceptionTag = 'font';
                    exceptionAttribute = ' face="Times New Roman"'
                    regex = new RegExp(`${string}(?!(?<=<${exceptionTag}${exceptionAttribute}>[^<]*${string})[^<]*<\/${exceptionTag})`, 'gm')
                    console.log(regex)
                    break;
                case 'squared':
                    exceptionTag = 'font';
                    string = parseInt(string)
                    exceptionAttribute = ` style="font-size: ${Math.pow(string, 2)}px;"`
                    regex = new RegExp(`${string}(?<!size\=")(?!([0-9])?px;)(?!(?<=<${exceptionTag}${exceptionAttribute}>[^<]*${string})[^<]*<\/${exceptionTag})`, 'gm')
                    break;
                case 'differentSize':
                    exceptionTag = 'font';
                    exceptionAttribute = ` style="font-size: ([0-9])([0-9])?px;"`
                    regex = new RegExp(`${string}(?![^<>]*>)(?!(?<=<${exceptionTag}${exceptionAttribute}>[^<]*${string})[^<]*<\/${exceptionTag})`, 'gi')
                    // console.log(regex)
                    if (htmlContent.match(regex) != null && htmlContent.match(regex).length > 1) {
                        // console.log(htmlContent.match(regex))
                        htmlContent = htmlContent.replace(regex, `<mark>${string}</mark>`)
                    }

                    let fontSizes = [...usedFontsizes]
                    fontSizes.forEach(num => {
                        exceptionAttribute = ` style="font-size: ${num}px;"`
                        regex = new RegExp(`${string}(?=(?<=<${exceptionTag}${exceptionAttribute}>[^<]*${string})[^<]*<\/${exceptionTag})`, 'gi')
                        // console.log(regex)
                        if (htmlContent.match(regex) != null && htmlContent.match(regex).length > 1) {
                            // console.log(htmlContent.match(regex))
                            htmlContent = htmlContent.replace(regex, `<mark>${string}</mark>`)
                        }
                    })
                    regex = /^(?!.*)/;
                    break;
            }
            htmlContent = htmlContent.replace(regex, `<mark>${string}</mark>`)
        });
        inputfield.innerHTML = htmlContent;
        doRestore();

    }, 1);
}

function deleteHighlight(ruleNum) {
    // if ((falseBubbles[0] != ruleNum || (!falseBubbles.includes(ruleNum)) && ruleNum === 0))
    //     return
    doSave()
    inputfield.innerHTML = inputfield.innerHTML.replace(/<mark(.*?)>|<\/mark>/g, ''); //get rid of old mark tags
    doRestore()
}


function isSelectionXYZ(modifier, attribute) {
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
                        if (attribute == 'face' && parent.face != '') {
                            return parent.face
                        }
                        if (attribute == 'size' && parent.style.fontSize != '') {
                            return parent.style.fontSize
                        }
                    } else return true

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
        if (document.getElementById('inputfield').offsetLeft == document.getElementById('formattingWrapper').offsetLeft) return
        let wrapper = document.getElementById('formattingWrapper')
        wrapper.style.left = '0px'
        wrapper.style.left = (document.getElementById('inputfield').offsetLeft - document.getElementById('formattingWrapper').offsetLeft) + 'px'
    }, 1);
}