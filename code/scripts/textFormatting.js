const modifyText = (command, defaultUi, value) => {
    //execCommand executes command on selected text
    document.execCommand(command, defaultUi, value);
};
/*
function highlight(strings, ruleNum) {
    setTimeout(() => { // cant make the whole function a timeout idk why 
        if (falseBubbles[0] != ruleNum)
            return false
        doSave()
        deleteHighlight()
        var highlighted = inputfield.innerHTML
        //initialising the strings and the replacements
        let filteredStrings = strings.filter((value, index, self) => self.indexOf(value) === index).sort().reverse();
        if (filteredStrings.length == 0)
            return
        let replacements = [...filteredStrings]
        replacements.forEach((element, index) => { //replace the items with the Items in a mark tag
            replacements[index] = `<mark>${element}</mark>`
        });

        //initialising the regExp
        let regExpString = filteredStrings.join('|');
        let regExp = new RegExp(regExpString, 'g')

        function replaceCallback(match) {
            return replacements[filteredStrings.indexOf(match)]; // Replace with specific string
        }
        inputfield.innerHTML = highlighted.replace(regExp, replaceCallback);
        doRestore()
    }, 0)
}*/
function highlight(strings, ruleNum) {
        if (falseBubbles[0] != ruleNum)
            return false
        deleteHighlight()
        doSave()
        var htmlContent = inputfield.innerHTML;
        strings.forEach(string => {
            const regex = new RegExp(`(${string})(?![^<]*>)`, 'gi');
            htmlContent = htmlContent.replace(regex, '<mark>$1</mark>');
        });
        inputfield.innerHTML = htmlContent;
        doRestore()
}




function deleteHighlight(completelyDelete, ruleNum) {
    if ((falseBubbles[0] != ruleNum || !falseBubbles.includes(ruleNum)) && ruleNum === 0)
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