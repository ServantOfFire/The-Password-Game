function isSelectionXYZ(modifier) {
    let alternateModifier;
    if(modifier == 'b'){
        modifier = ['strong', 'b']
        alternateModifier = ['em', 'i']
    }
    if(modifier == 'i'){
        modifier = ['em', 'i']
        alternateModifier = ['strong', 'b']
    }
    console.log(alternateModifier)
    var sel;
    if (document.getSelection) {
        sel = document.getSelection();
    }

    var raw_html = getSelectionAsHtml();
    // This is if nothing is selected
    if (raw_html === "") return false;
    console.log(raw_html)
    alternateModifier.forEach((elem) => {raw_html = raw_html.replaceAll(`<${elem}>`, '');raw_html = raw_html.replaceAll(`</${elem}>`, '')})
    console.log(raw_html)
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = raw_html;
    
    var is_XYZ_nodes = []
    for (var node of tempDiv.childNodes) {
        var tags = [node.nodeName.toLowerCase()];

        // This covers selection that are inside XYZed characters
        while (tags.includes("#text")) {
            var start_tag = sel.anchorNode.parentNode.nodeName.toLowerCase();
            var end_tag = sel.focusNode.parentNode.nodeName.toLowerCase();
            tags = [start_tag, end_tag]
        }
        console.log(is_XYZ_nodes)
        is_XYZ_nodes.push(containsOnly(modifier, tags));
    }
    return (!is_XYZ_nodes.includes(false))
}


function getSelectionAsHtml() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    return html;
}



function containsOnly(array1, array2) {
    return !array2.some(elem => !array1.includes(elem))
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