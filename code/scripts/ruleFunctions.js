updateCounter = () => {
    counter.innerText = eingabeText.actualLength()
    cLeft = getTextWidth(counter.innerText, "18px arial")
    inputfield.style.marginLeft = cLeft - 10 + 'px'
}

function deromanize(str) {
    var str = str.toUpperCase();
    var validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/;
    var token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g;
    var key = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
    var num = 0, m;
    if (!(str && validator.test(str))) return false;
    while (m = token.exec(str)) num += key[m[0]];
    return num;
}
function loadRandomCaptchaImage(img) {
    let ranNum = randomNumber(0, captchas.length)
    captchaSRC = captchas[ranNum]
    img.classList.add("captcha")
    return img.src = captchas[ranNum]
}
function loadChessImage(img) {
    img.classList.add('chessImg')
    return img.src = chessPositions[board][1]
}
function getCaptchaText() {
    let captchaText = captchaSRC
    captchaText = captchaText.replace('images/captchas/samples/', '')
    captchaText = captchaText.replace('.png', '')
    return captchaText
}
function getWordle() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    fetch('https://neal.fun/api/password-game/wordle?date=' + today)
        .then(response => {
            if (!response.ok)
                throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            answer = data.answer;
        })
}

function getMoonPhase() {
    const getJulianDate = (date = new Date()) => {
        const time = date.getTime();
        const tzoffset = date.getTimezoneOffset()
        return (time / 86400000) - (tzoffset / 1440) + 2440587.5;
    }
    const LUNAR_MONTH = 29.530588853;
    const getLunarAge = (date = new Date()) => {
        const percent = getLunarAgePercent(date);
        const age = percent * LUNAR_MONTH;
        return age;
    }
    const getLunarAgePercent = (date = new Date()) => {
        return normalize((getJulianDate(date) - 2451550.1) / LUNAR_MONTH);
    }
    const normalize = value => {
        value = value - Math.floor(value);
        if (value < 0)
            value = value + 1
        return value;
    }
    const getLunarPhase = (date = new Date()) => {
        const age = getLunarAge(date);
        if (age <= 1) {
            //        moonPhase = "New";
            moonPhase = 0
            return moonPhase
        } else if (age <= 6.38264692644001) {
            //        moonPhase = "Waxing Crescent";
            moonPhase = 1
            return moonPhase
        } else if (age < 8.38264692644) {
            //        moonPhase = "First Quarter";
            moonPhase = 2
            return moonPhase
        } else if (age < 13.76529385288) {
            //        moonPhase = "Waxing Gibbous";
            moonPhase = 3
            return moonPhase
        } else if (age < 15.76529385288) {
            //        moonPhase = "Full";
            moonPhase = 4
            return moonPhase
        } else if (age < 21.14794077932) {
            //        moonPhase = "Waning Gibbous";
            moonPhase = 5
            return moonPhase
        } else if (age < 23.14794077932) {
            //        moonPhase = "Last Quarter";
            moonPhase = 6
            return moonPhase
        } else if (age < 28.53058770576) {
            //        moonPhase = "Waning Crescent";
            moonPhase = 7
            return moonPhase
        } else {
            //        moonPhase = "New";
            moonPhase = 0
            return moonPhase
        }
    }
    getLunarPhase()
}

function deathscreen(message) {
    inputfield.blur()
    let blackCenter = document.createElement('div')
    let overlay = document.createElement('div')
    let deathText = document.createElement('p')
    overlay.id = 'deathMessageOverlay'
    blackCenter.id = 'deathMessageCenter'
    deathText.id = 'deathMessageText'
    deathText.innerText = message
    overlay.appendChild(blackCenter)
    blackCenter.appendChild(deathText)
    document.body.appendChild(overlay)
    overlay.style.opacity = 0
    unfade(overlay, 50)
    document.body.style.overflow = 'hidden'
    return
}
function checkForGreg() {
    setTimeout(() => {
        if (greg && inputfield.innerHTML.match(gregRegExp) == null) {
            deathscreen('GREG HAS BEEN SLAIN')
            clearInterval(intervalEating)
            greg = false
            inputfield.innerHTML = inputfield.innerHTML.replaceAll('\uD83E', '')
            inputfield.innerHTML = inputfield.innerHTML.replaceAll('\uDD5A', '')
            return
        }
        preventChickenCloning()
    }, 10);

}
function preventChickenCloning() {
    if (greg && eingabeText.match(gregRegExp).length > 1) {
        doSave(2)
        for (let i = 0; i < eingabeText.match(gregRegExp).length - 1; i++) {
            inputfield.innerText = inputfield.innerText.replace(gregEmoji, '')
        }
        eingabeText = inputfield.innerText;
        doRestore()
    }
}

function saveTagPositions(inputString, tagName, deleteTag) {
    openTags = []
    closeTags = []
    const tagLength = tagName.length;
    const openTag = `<${tagName}>`;
    const closeTag = `</${tagName}>`;

    let currentIndex = 0;
    while (currentIndex < inputString.length) {
        const openIndex = inputString.indexOf(openTag, currentIndex);
        if (openIndex === -1) break; // No more open tags found

        const closeIndex = inputString.indexOf(closeTag, openIndex + tagLength);
        if (closeIndex === -1) break; // No corresponding close tag found

        openTags.push(openIndex)
        closeTags.push(closeIndex)

        currentIndex = closeIndex; // Move to check after the closing tag
    }
    if (deleteTag) {
        inputfield.innerHTML = inputfield.innerHTML.replaceAll(`<${tagName}>`, '')
        inputfield.innerHTML = inputfield.innerHTML.replaceAll(`</${tagName}>`, '')
    }
}

String.prototype.replaceAt = function (index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }

    return this.substring(0, index) + replacement + this.substring(index + 1);
};
if (String.prototype.splice === undefined) {
    /**
     * Splices text within a string.
     * @param {int} offset The position to insert the text at (before)
     * @param {string} text The text to insert
     * @param {int} [removeCount=0] An optional number of characters to overwrite
     * @returns {string} A modified string containing the spliced text.
     */
    String.prototype.splice = function (offset, text, removeCount = 0) {
        let calculatedOffset = offset < 0 ? this.length + offset : offset;
        return this.substring(0, calculatedOffset) +
            text + this.substring(calculatedOffset + removeCount);
    };
}

function startFire() {
    if (fireOut) return
    if (fireStarted) {
        if (!inputfield.innerText.includes('🔥')) {
            fireOut = true;
            window.clearInterval(burning)
        }
        return
    }
    fireStarted = true
    saveTagPositions(inputfield.innerHTML, 'b')
    doSave()
    burnedText = inputfield.innerText.replaceAt(randomNumber(1, inputfield.innerText.length - 1), '🔥')
    let iteration = 1
    insertTags()
    inputfield.innerHTML = burnedText
    doRestore()
    var amountBurned = 0;
    //fire is: \uD83D + \uDD25
    burning = setInterval(() => {
        iteration++
        let fireIndexes = []
        amountBurned = 0;
        doSave()
        saveTagPositions(inputfield.innerHTML, 'b', true)
        burnedText = inputfield.innerText
        firstCharBefore = burnedText.split('')[0]
        for (let i = 0; i < inputfield.innerText.length; i++) {
            if (inputfield.innerText[i] == '\uD83D') {
                fireIndexes.push(i)
            }
        }
        let symbolArray = burnedText.split('')
        fireIndexes.forEach((index) => {
            burnToLeft(index, symbolArray)
        });
        symbolArray = burnedText.split('')
        fireIndexes.forEach((index) => {
            burnToRight((index + amountBurned), symbolArray)
        });
        insertTags()
        inputfield.innerHTML = burnedText
        update()
        doRestore()
        checkForGreg()
        function burnToLeft(index, symbolArray) {
            if (symbolArray[index - 1] != '\uDD25' && symbolArray[index - 1] != undefined) {
                burnedText = burnedText.replaceAt(index - 1, '\uD83D')
                burnedText = burnedText.splice(index, '\uDD25')
                amountBurned++
            }
        }
        function burnToRight(index, symbolArray) {
            if (symbolArray[index + 2] != '\uD83D' && symbolArray[index + 2] != undefined) {
                burnedText = burnedText.replaceAt(index + 2, '\uD83D')
                burnedText = burnedText.splice(index + 3, '\uDD25')
            }
        }
    }, 1000);

    function insertTags() {
        openTags.forEach(function (element, index) {
            let slicedText = burnedText.slice(0, element - (index * 3 + index * 4))
            let numberOfFire = slicedText.split('').filter(item => item === '\uD83D').length;
            if (numberOfFire > 0 &&
                iteration != 1 &&
                burnedText.split('')[0] != '\uD83D') {
                changedOpenTags[index] = openTags[index] + 2
                changedCloseTags[index] = closeTags[index] + 2
                return
            }
            if (numberOfFire > 0 && (burnedText.split('')[0] == '\uD83D' || iteration == 1)) {
                changedOpenTags[index] = openTags[index] + 1
                changedCloseTags[index] = closeTags[index] + 1
                if (firstCharBefore != '\uD83D' && burnedText.split('')[0] == '\uD83D') {
                    changedOpenTags[index]++
                    changedCloseTags[index]++
                }
                return
            }
            changedOpenTags[index] = openTags[index]
            changedCloseTags[index] = closeTags[index]
        });
        for (let i = 0; i < changedOpenTags.length; i++) {
            if (burnedText.split('')[changedOpenTags[i] - 1] == '\ud83d') {
                changedOpenTags[i]++
            }
            if (burnedText.split('')[changedOpenTags[i]] == '>') {
                changedOpenTags[i]++
            }
            burnedText = burnedText.splice(changedOpenTags[i], '<b>')
            if (burnedText.split('')[changedCloseTags[i]] == '\udd25') {
                changedCloseTags[i]++
            }
            if (burnedText.split('')[changedCloseTags[i]] == '>') {
                changedCloseTags[i]++
            }
            burnedText = burnedText.splice(changedCloseTags[i], '</b>')
        }
    }
}
function gregHatching() {
    doSave()
    inputfield.innerHTML = inputfield.innerHTML.replace('🥚', '🐔')
    doRestore()
}
function gregEating() {
    if (alreadyEating) return
    alreadyEating = true
    intervalEating = setInterval(() => {
        if (inputfield.innerHTML.match(/🐛/g) == null) {
            deathscreen('GREG HAS STARVED')
            clearInterval(intervalEating)
            inputfield.innerHTML = inputfield.innerHTML.replace('🐔', '')
            return
        }
        if (inputfield.innerHTML.match(/🐛/g).length > 8) {
            deathscreen('GREG WAS OVERFED')
            clearInterval(intervalEating)
            inputfield.innerHTML = inputfield.innerHTML.replace('🐔', '')
            return
        }
        doSave()
        inputfield.innerHTML = inputfield.innerHTML.replace('🐛', '')
        doRestore()
    }, 20000);
}
function randomColor() {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    hexColor = '#' + n.slice(0, 6)
    return '#' + n.slice(0, 6);
};


String.prototype.actualLength = function () {
    var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    var stringWithoutSurrogates = this.replace(surrogatePairs, 'a');
    return stringWithoutSurrogates.length;
};

function initiateRetype() {
    document.getElementById('counter').outerHTML = ''

    inputfield.style.left = '2px'
    let rulesDIV = document.getElementById('rules')
    rulesDIV.innerHTML = '<br>'
    document.getElementById('ChoosePassword').innerText = 'Your Password'
    document.getElementById('ChoosePassword').style.left = '-188px'
    let retypeMessage = document.createElement('p')

    rulesDIV.appendChild(retypeMessage)
    retypeMessage.outerHTML = '<p id="retypeMessage" style="position: relative; left: -127px; font-size: 18px; margin-bottom: 5px;">Please re-type your password</p>'
    rulesDIV.appendChild(document.getElementById('inputWrapper'))
    document.getElementById('formattingWrapper').style.top = '0px'


    let oldPassword = inputfield.cloneNode(true)
    document.getElementById('game').appendChild(oldPassword)

    oldPassword.style.userSelect = 'none'
    oldPassword.contentEditable = 'false'
    oldPassword.style.borderRadius = '10px'
    oldPassword.style.left = '0px'
    oldPassword.classList.add('oldPassword')
    inputfield.innerHTML = ''

    let lastBubble = document.createElement('div')
    lastBubble.classList.add('ruleBubble', 'falseBubble', 'falseText')
    lastBubble.innerText = 'Your passwords must match'
    lastBubble.id = 'theLastBubble'
    rulesDIV.appendChild(lastBubble)

    clearInterval(intervalEating)
    inputfield.addEventListener('update', () => { finalPassword() })

}