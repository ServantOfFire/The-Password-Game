function isSelectionBold() {
    var sel;
    if (window.getSelection) {
        sel = window.getSelection();
        
    }
    else if (document.getSelection) {
        sel = document.getSelection();
    }

    var raw_html = getSelectionAsHtml();
    // This is if nothing is selected
    if (raw_html === "") return false;

    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = raw_html;

    var is_bold_nodes = []
    for (var node of tempDiv.childNodes) {
        var tags = [node.nodeName.toLowerCase()];

        // This covers selection that are inside bolded characters
        while (tags.includes("#text")) {
            var start_tag = sel.anchorNode.parentNode.nodeName.toLowerCase();
            var end_tag = sel.focusNode.parentNode.nodeName.toLowerCase();
            tags = [start_tag, end_tag]
        }
        is_bold_nodes.push(containsOnly(['strong', 'b'], tags));
    }
    return (!is_bold_nodes.includes(false))
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
    return html//.replaceAll('<mark>', '').replaceAll('</mark>', '');
}

function containsOnly(array1, array2) {
    return !array2.some(elem => !array1.includes(elem))
}

function isBold() {
    if (!document.getElementById('boldButton'))
        return
    if (isSelectionBold()) {
        document.getElementById('boldButton').classList.add('activeButton')
    } else {
        document.getElementById('boldButton').classList.remove('activeButton')
    }
}