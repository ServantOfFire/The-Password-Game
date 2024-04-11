function highlight(strings, ruleNum) {
    setTimeout(() => { // cant make the whole function a timeout idk why 
        if (falseBubbles[0] != ruleNum)
            return false
        highlightedStrings = strings;
        currentHNumber = ruleNum
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
        let regExpString = filteredStrings.map(element => element.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
        let regExp = new RegExp(regExpString, 'g')

        function replaceCallback(match) {
            return replacements[filteredStrings.indexOf(match)]; // Replace with specific string
        }
        inputfield.innerHTML = highlighted.replace(regExp, replaceCallback);
        doRestore()
    }, 0)
}


function deleteHighlight(completelyDelete, ruleNum) {
    if ((falseBubbles[0] != ruleNum || !falseBubbles.includes(ruleNum)) && ruleNum === 0)
        return
    if (completelyDelete) {
        currentHNumber = 0;
        highlightedStrings = [];
    }
    let newText = inputfield.innerHTML;
    doSave()
    newText = newText.replaceAll(/<mark(.*?)>/g, '')
    newText = newText.replaceAll('</mark>', '')
    inputfield.innerHTML = newText
    doRestore()
}


function isSelectionXYZ(modifier) {
    let acceptedModifiers;
    acceptedModifiers = ['i', 'b', 'mark']

    let sel;
    if (window.getSelection()) {
        sel = window.getSelection();
        if (sel.rangeCount > 0) {
            let parent = sel.getRangeAt(0).commonAncestorContainer;
            while (parent.nodeType !== Node.ELEMENT_NODE) {
                parent = parent.parentNode;
            }
            while (acceptedModifiers.some((e) => { return parent.tagName.toLowerCase() == e })) {
                if (parent.tagName.toLowerCase() == modifier) { return true }
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