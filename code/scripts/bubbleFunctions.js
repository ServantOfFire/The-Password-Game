function moveElement(elementId, place, behind) {
    const div = document.getElementById('rules');
    const element = document.getElementById(String(elementId));
    if (behind)
        place = div.children.length - place;

    const children = Array.from(div.children);
    let referencenode = children[place];
    // Get the child index of the element being moved
    const elementIndex = children.indexOf(element);
    // Get the list of elements that will move.
    const movingChildren = children.slice(
        elementIndex > place ? place : elementIndex,
        (elementIndex > place ? elementIndex : place) + 1,
    );
    // Capture the positions of the elements being moved (First).
    const before = movingChildren.map(
        movingChild => movingChild.getBoundingClientRect(),
    );
    // Do the moving (Last).
    div.insertBefore(element, referencenode);
    // Do the animations.
    movingChildren.forEach((child, i) => {
        // Get the moved position.
        const newPosition = child.getBoundingClientRect();
        // Apply animation using CSS transform.
        child.style.transition = 'transform 0s'
        child.style.transform = `translate(${before[i].x - newPosition.x}px, ${before[i].y - newPosition.y}px)`;

        // Clear transition properties on transition end.
        const clearTransition = () => {
            child.style.transition = '';
            child.style.transform = '';
            child.removeEventListener('transitionend', clearTransition);
        };
        setTimeout(() => {
            child.style.transition = 'transform 250ms';
            child.style.transform = ''
        }, 1);
        setTimeout(clearTransition, 1000)
    });

}
function unfade(element, time) {
    var op = 0.1;
    var timer = setInterval(function () {
        if (op >= 1)
            clearInterval(timer);
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, time);

}
function moveIndex() {
    if (currentRuleIndex < ruleMatrix.length && bubble(ruleMatrix[currentRuleIndex][0], ruleMatrix[currentRuleIndex][1], ruleMatrix[currentRuleIndex][2], ruleMatrix[currentRuleIndex][3])) {
        currentRuleIndex++;
        moveIndex()
    }
}

function bubble(number, text, statement, special) {

    //check if ID is taken
    let ruleId = 'rule' + number;
    let ruleElement = document.getElementById(ruleId);
    // define family variables (check function defineFamily())
    let parent;
    let children;
    let oldPosition;

    if (!ruleElement) {
        if (falseBubbles.length === 0) {
            //create bubble
            let rulesDIV = document.getElementById("rules");
            let ruleBubble = document.createElement('div');
            ruleBubble.id = ruleId
            let ruleName = document.createElement('p')
            let ruleText = document.createElement('p')
            ruleName.innerHTML = `Rule ${number}`;
            ruleText.innerHTML = text
            assignClasses(ruleName, ruleText, ruleBubble)
            ruleBubble.style.opacity = 0                                //prevent visual bug when unfading
            rulesDIV.appendChild(ruleBubble)
            ruleBubble.appendChild(ruleName)
            ruleBubble.appendChild(ruleText)
            rulesDIV.insertBefore(ruleBubble, rulesDIV.children[0])
            oldPosition = 0
            eval(special)

            unfade(ruleBubble, 10)
            //------------------------------------------------------------------------------
            if (eval(statement)) {
                // make bubble positive
                ruleName.innerHTML = `${checkmark.outerHTML}   Rule ${number}`;
                assignTrue(ruleName, ruleText, ruleBubble)

                // add true bubble to array
                trueBubbles.push(number)
                trueBubbles.sort(function (a, b) { return a - b });

                // move to new position
                defineFamily(true)
                let trueIndexOfRule = trueBubbles.indexOf(number)
                if (oldPosition !== trueIndexOfRule)
                    moveElement(ruleId, trueIndexOfRule, true)
                return true

            } else {
                // make bubble negative
                assignFalse(ruleName, ruleText, ruleBubble)
                ruleName.innerHTML = `${error.outerHTML}   Rule ${number}`;

                // add false bubble to array
                falseBubbles.push(number)
                falseBubbles.sort(function (a, b) { return a - b });
                falseBubbles.reverse()

                // move to new position
                defineFamily()
                let falseIndexOfRule = falseBubbles.indexOf(number)
                if (oldPosition != falseIndexOfRule) {
                    moveElement(ruleId, falseIndexOfRule)
                    if (falseIndexOfRule == 0)
                        deleteHighlight(0)
                }
            }
        }
    } else if (eval(statement)) {
        // make negative bubble positive
        let ruleName = ruleElement.querySelector('.ruleName');
        let ruleText = ruleElement.querySelector('.ruleText');
        ruleName.innerHTML = `${checkmark.outerHTML}   Rule ${number}`;
        assignTrue(ruleName, ruleText, ruleElement)

        // delete false bubble from array
        let indexOfRule = falseBubbles.indexOf(number)
        if (indexOfRule > -1)
            falseBubbles.splice(indexOfRule, 1)
        // add true bubble to array
        if (!trueBubbles.includes(number)) {
            trueBubbles.push(number)
            trueBubbles.sort(function (a, b) { return a - b });
        }

        // move to new position
        defineFamily(true)
        let trueIndexOfRule = trueBubbles.indexOf(number)
        if (oldPosition !== trueIndexOfRule)
            moveElement(ruleId, trueIndexOfRule, true)
        return true
    } else {
        // make positive bubble negative
        let ruleName = ruleElement.querySelector('.ruleName');
        let ruleText = ruleElement.querySelector('.ruleText');
        ruleName.innerHTML = `${error.outerHTML}   Rule ${number}`;
        assignFalse(ruleName, ruleText, ruleElement)

        // delete true bubble from array
        let trueIndexOfRule = trueBubbles.indexOf(number)
        trueBubbles.splice(trueIndexOfRule, 1)

        // add false bubble to array
        if (!falseBubbles.includes(number)) {
            falseBubbles.push(number)
            falseBubbles.sort(function (a, b) { return a - b });
            falseBubbles.reverse()
        }

        //move to new position
        defineFamily()
        let falseIndexOfRule = falseBubbles.indexOf(number)
        if (oldPosition != falseIndexOfRule) {
            moveElement(ruleId, falseIndexOfRule)
            if (falseIndexOfRule == 0)
                deleteHighlight(0)
        }

    }

    function assignTrue(a, b, c) {
        a.classList.add('trueName')
        b.classList.add('trueText')
        c.classList.add('trueBubble')
        a.classList.remove('falseName')
        b.classList.remove('falseText')
        c.classList.remove('falseBubble')
    }
    function assignClasses(a, b, c) {
        a.classList.add('ruleName')
        b.classList.add('ruleText')
        c.classList.add('ruleBubble')
    }
    function assignFalse(a, b, c) {
        a.classList.add('falseName')
        b.classList.add('falseText')
        c.classList.add('falseBubble')
        a.classList.remove('trueName')
        b.classList.remove('trueText')
        c.classList.remove('trueBubble')
        // deleteHighlight()
    }
    function defineFamily(tBubble) {
        parent = document.getElementById("rules");
        children = Array.from(parent.children)
        if (tBubble)
            children.reverse()
        children.forEach((item, index, array) => {
            array[index] = item.id;
        });
        oldPosition = children.indexOf(ruleId)
    }

    // a is the ruleText element in all following functions
    function addSponsors(a) {
        let sponsorsP = document.createElement('p')
        sponsorsP.id = 'sponsorsP'
        sponsorsP.innerHTML = `${sponsors[0].outerHTML}${sponsors[1].outerHTML}${sponsors[2].outerHTML}`
        a.appendChild(sponsorsP)
    }
    function createCaptcha(a) {
        const wrapper = document.createElement('div')
        const captchaImage = document.createElement('img')
        let refresh = document.createElement('img')
        refresh.src = "images/icons/refresh.svg"
        refresh.id = 'refreshButton'
        wrapper.classList.add('wrapper')
        captchaImage.id = 'captchaImg'
        captchaImage.src = loadRandomCaptchaImage(captchaImage)
        refresh.onclick = () => {
            captchaImage.src = loadRandomCaptchaImage(captchaImage)
            bubble(ruleMatrix[9][0], ruleMatrix[9][1], ruleMatrix[9][2], ruleMatrix[9][3])
        }
        wrapper.appendChild(captchaImage)
        wrapper.appendChild(refresh)
        a.appendChild(wrapper)
    }
    function checkForAPI(a) {
        if (typeof mapsApiKey === 'undefined') {
            a.innerHTML = `Rule 14 is not activated in the online version to prevent abuse of the owner's API key. \n Type "${allCountries[chosenLocation]}" in your password to pass this rule.`
            return
        }
        let map = document.createElement('div')
        map.id = 'map'
        let falseCountries = document.createElement('div')
        falseCountries.id = 'falseCountries'
        a.appendChild(falseCountries)
        a.appendChild(map)
        const apiScript = document.createElement('script')
        apiScript.src = `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&callback=createStreetView&v=weekly`
        apiScript.defer = true
        setTimeout(() => {
            document.querySelector('head').appendChild(apiScript)
        }, 300);
    }
    function createChessBoard(a) {
        const wrapper = document.createElement('div')
        const boardWrapper = document.createElement('div')
        const chessImage = document.createElement('img')
        const playerMove = document.createElement('p')
        boardWrapper.id = 'boardWrapper'
        boardWrapper.style.marginTop = '18px' // for the wrong moves so they can have no bottom margin
        playerMove.innerHTML = `<i>${chessPositions[board][1]} to move.</i>`
        playerMove.style.textAlign = 'center'
        playerMove.style.marginTop = '25px'
        chessImage.src = chessPositions[board][0]
        chessImage.id = 'chessImg'
        wrapper.id = 'chessWrapper'
        if (chessPositions[board][1] == 'White')
            boardWrapper.appendChild(borderWhite)
        else
            boardWrapper.appendChild(borderBlack)
        boardWrapper.appendChild(chessImage)
        wrapper.appendChild(boardWrapper)
        wrapper.appendChild(playerMove)
        a.appendChild(wrapper)
    }
    function createBoldButton(a) {
        //formattingWrapper-div already defined in script as global variable
        const boldButton = document.createElement('button')
        boldButton.innerText = 'Bold'
        boldButton.type = 'button'
        boldButton.id = 'boldButton'
        boldButton.classList.add('stylingButtons')
        formattingWrapper.appendChild(boldButton)
        formattingWrapper.style.opacity = 0

        setTimeout(() => {
            document.addEventListener('update', (event) => {
                resizeWrapper()
            })
        }, 500);
        document.getElementById('inputWrapper').appendChild(formattingWrapper)

        setTimeout(function () {
            formattingWrapper.style.opacity = 1
            formattingWrapper.style.top = '-5px'
            inputfield.style.borderBottomRightRadius = '0px'
            inputfield.style.borderBottomLeftRadius = '0px'
        }, 100)

        boldButton.addEventListener("click", () => { //making text bold
            modifyText('bold', false, null);
            isBold()
            update()
        });

        let neededEvents = 'mouseup input click'.split(' ')
        neededEvents.forEach(event => document.getElementById('inputWrapper').addEventListener(event, buttonActiveColor))

        function buttonActiveColor() {
            isBold()
        }
    }
    function measureStrength(a) {
        const strengthBar = document.createElement('p')
        const red = document.createElement('p')
        const orange = document.createElement('p')
        const yellow = document.createElement('p')
        const green = document.createElement('p')
        strengthBar.id = 'strengthBar'

        red.classList.add('strength', 'red')
        orange.classList.add('strength', 'orange')
        yellow.classList.add('strength', 'yellow')
        green.classList.add('strength', 'green')
        inputfield.addEventListener('update', animateStrength)
        orange.style.visibility = 'hidden'
        yellow.style.visibility = 'hidden'
        green.style.visibility = 'hidden'

        strengthBar.appendChild(red)
        strengthBar.appendChild(orange)
        strengthBar.appendChild(yellow)
        strengthBar.appendChild(green)
        a.appendChild(strengthBar)
        animateStrength()
        function animateStrength() {
            if (!inputfield.innerText.includes('🏋️')) {
                orange.style.visibility = 'hidden'
                yellow.style.visibility = 'hidden'
                green.style.visibility = 'hidden'
                orange.style.left = '13.5px'
                orange.style.width = '90px'
                yellow.style.left = '103.5px'
                green.style.left = '207px'
                return
            }
            if (inputfield.innerText.match(/🏋️/g).length >= 1) {
                orange.style.visibility = 'visible'
                yellow.style.visibility = 'hidden'
                green.style.visibility = 'hidden'
                orange.style.width = '116.5px'
                orange.style.left = '116.5px'
                yellow.style.left = '116.5px'
                green.style.left = '233px'
            }
            if (inputfield.innerText.match(/🏋️/g).length >= 2) {
                yellow.style.visibility = 'visible'
                green.style.visibility = 'hidden'
                yellow.style.left = '233px'
                green.style.left = '233px'
            }

            if (inputfield.innerText.match(/🏋️/g).length > 2) {
                green.style.visibility = 'visible'
                green.style.left = '349.5px'
            }
        }
    }
    function embedYouTubeVideo(a) {
        if (typeof YouTubeApiKey === 'undefined') {
            a.style.userSelect = 'text'
            a.style.lineHeight = '120%'
            a.innerHTML = `Rule 24 is not activated in the online version to prevent abuse of the owner's API key. \n Copy this YouTube URL <span oncopy="standardCopy('url')" style="text-decoration: underline">https://www.youtube.com/watch?v=H10xp3u5AxE</span> in your password to pass this rule.`
        }
        let script = document.createElement('script')
        script.src = 'https://apis.google.com/js/api.js'
        let iframe = document.createElement('iframe')
        iframe.width = '0px'
        iframe.height = '0px'
        document.querySelector('head').appendChild(script)
        a.appendChild(iframe)
    }
    function proposeSacrifices(a) {
        a.innerHTML += '<br>'
        const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        const letterDIV = document.createElement('div')
        letterDIV.id = 'letterDIV'
        alphabet.forEach((elem) => {
            let letterButton = document.createElement('button')
            letterButton.classList.add('letterButtons')
            letterButton.classList.add('letterButtonsHOVER')
            letterButton.innerText = elem
            letterDIV.appendChild(letterButton)
            letterButton.onclick = () => {
                toggleActiveClass(letterButton)
            }
        })
        let sacrificeButton = document.createElement('button')
        sacrificeButton.classList.add('sacrificeButton')
        sacrificeButton.innerHTML = `${sacrificeFire.outerHTML} Sacrifice`
        letterDIV.appendChild(sacrificeButton)
        a.appendChild(letterDIV)

        function toggleActiveClass(element) {
            if ((sacrificedLetters.length > 1 && sacrificedLetters.indexOf(element.innerText) == -1) || sacrificed) return
            element.classList.toggle('activeButton')
            if (sacrificedLetters.indexOf(element.innerText) == -1) {
                sacrificedLetters.push(element.innerText)
                if (sacrificedLetters.length == 2) {
                    sacrificeButton.id = 'sacrificeButtonReady'
                    sacrificeButton.onclick = () => {
                        sacrificeLetters()
                    }
                }
                return
            }
            sacrificeButton.id = ''
            sacrificeButton.onclick = () => { }
            sacrificedLetters.splice(sacrificedLetters.indexOf(element.innerText), 1)
        }
        function sacrificeLetters() {
            //make buttons non-interactible
            sacrificeButton.onclick = () => { }
            sacrificeButton.id = ''
            document.querySelectorAll('.letterButtons').forEach((elem) => { elem.onclick = () => { }; elem.classList.remove('letterButtonsHOVER') })
            document.querySelectorAll('.letterButtons.activeButton').forEach((elem) => { elem.classList.add('sacrificedLetter') })
            sacrificed = true
            sacrificedLetters.push(sacrificedLetters[0].toLowerCase())
            sacrificedLetters.push(sacrificedLetters[1].toLowerCase())
            setTimeout(() => {
                update()
            }, 2000);
        }
    }
    function createItalicButton(a) {
        //formattingWrapper-div already defined in script as global variable
        const italicButton = document.createElement('button')
        italicButton.innerText = 'Italic'
        italicButton.type = 'button'
        italicButton.id = 'italicButton'
        italicButton.classList.add('stylingButtons')

        formattingWrapper.appendChild(italicButton)
        unfade(italicButton, 10)

        italicButton.addEventListener("click", () => { //making text italic
            modifyText('italic', false, null);
            isItalic()
            update()
        });

        let neededEvents = 'mouseup input click'.split(' ')
        neededEvents.forEach(event => document.getElementById('inputWrapper').addEventListener(event, buttonActiveColor))
        function buttonActiveColor() {
            isItalic()
        }
    }
    function createSelect(a) {
        let selected = 0;   //2 to not change the select value for 2 clicks; 
        // one for manual selection of select element and one for focusing the inputfield
        const fontSelector = document.createElement('select')
        fontSelector.id = 'fontSelector'
        fontSelector.style.width = '130px'
        const wingdings = document.createElement('option')
        wingdings.value = 'Wingdings'
        wingdings.innerText = 'Wingdings'

        const monospace = document.createElement('option')
        monospace.value = 'Monospace'
        monospace.innerText = 'Monospace'

        const comicSans = document.createElement('option')
        comicSans.value = 'Comic Sans MS'
        comicSans.innerText = 'Comic Sans'

        fontSelector.appendChild(monospace)
        fontSelector.appendChild(comicSans)
        fontSelector.appendChild(wingdings)

        fontSelector.oninput = () => {
            modifyText('fontName', false, fontSelector.value)
            selected = 2
        }

        let events = ['click', 'update']
        checkFont = () => {
            if (selected != 0) {
                selected--
                return
            }
            setTimeout(() => {
                if (!isSelectionXYZ('font', 'face')) {
                    fontSelector.value = 'Monospace'
                    return
                } else
                    fontSelector.value = isSelectionXYZ('font', 'face')
            }, 1)
        }
        events.forEach((e) => { inputfield.addEventListener(e, checkFont) })

        formattingWrapper.appendChild(fontSelector)
    }
    function createColorDIV(a) {
        const colorDIV = document.createElement('div')
        colorDIV.id = 'colorDIV'
        colorDIV.style.backgroundColor = randomColor();

        const newColorButton = document.createElement('button')
        newColorButton.id = 'newColorButton'

        const refresh = document.createElement('img')
        refresh.src = "images/icons/refresh.svg"
        refresh.id = 'colorRefresh'

        newColorButton.onclick = () => { colorDIV.style.backgroundColor = randomColor(); update() }

        newColorButton.appendChild(refresh)
        colorDIV.appendChild(newColorButton)
        a.appendChild(colorDIV)
    }
    function addTimesNewRoman() {
        let timesNewRoman = document.createElement('option')
        timesNewRoman.value = 'Times New Roman'
        timesNewRoman.innerText = 'Times New Roman'

        document.getElementById('fontSelector').appendChild(timesNewRoman)
        document.getElementById('fontSelector').style.width = '155px'
    }
    function createFontSize() {
        let selected = 0;
        let sizeSelector = document.createElement('select')
        sizeSelector.id = 'sizeSelector'

        const sizes = [0, 1, 4, 9, 12, 16, 25, 28, 32, 36, 42, 49, 64, 81]
        sizes.forEach((e) => {
            let sizeOption = document.createElement('option')
            sizeOption.value = e
            sizeOption.innerText = e + 'px'
            sizeSelector.appendChild(sizeOption)
        })
        sizeSelector.value = 28
        formattingWrapper.insertBefore(sizeSelector, document.getElementById('fontSelector'))
        update()

        sizeSelector.oninput = () => {
            modifyText('fontSize', false, sizeSelector.value)
            selected = 2
        }
        let events = ['click', 'update']
        checkSize = () => {
            if (selected != 0) {
                selected--
                return
            }
            setTimeout(() => {
                if (!isSelectionXYZ('font', 'size')) {
                    sizeSelector.value = '28'
                    return
                } else
                    sizeSelector.value = isSelectionXYZ('font', 'size').replace('px', '')
            }, 1)
        }
        events.forEach((e) => { inputfield.addEventListener(e, checkSize) })
    }
    function finalPasswordCheck(a) {
        let margin = 10
        let finalButtonDIV = document.createElement('div')
        let yes = document.createElement('button')
        let no = document.createElement('button')
        yes.innerText = 'Yes'
        no.innerText = 'No'
        yes.id = 'YesButton'
        no.id = 'NoButton'
        finalButtonDIV.style.marginTop = margin + 'px'
        finalButtonDIV.id = 'finalButtonDIV'
        yes.classList.add('stylingButtons', 'finalButtons')
        no.classList.add('stylingButtons', 'finalButtons')

        yes.addEventListener('mouseover', () => { finalButtonDIV.style.marginTop = margin - 2 + 'px' })
        no.addEventListener('mouseover', () => { finalButtonDIV.style.marginTop = margin - 2 + 'px' })

        yes.addEventListener('mouseout', () => { finalButtonDIV.style.marginTop = margin + 'px' })
        no.addEventListener('mouseout', () => { finalButtonDIV.style.marginTop = margin + 'px' })
        yes.onclick = () => { initiateRetype() }
        no.onclick = () => { no.outerHTML = ''; finalButtonDIV.style.marginTop = margin + 'px' }
        finalButtonDIV.appendChild(yes)
        finalButtonDIV.appendChild(no)
        a.appendChild(finalButtonDIV)

        document.getElementById('rule').removeChild(document.getElementById('rule').querySelector('p'))
        document.getElementById('rule').querySelector('p').style.borderTop = '1px solid red'
        document.getElementById('rule').querySelector('p').style.borderRadius = '10px'

        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        //styling



    }
}


function changeMainElemHeight() {
    setTimeout(() => {
        let oldHeight = mainHeight
        mainHeight = 49
        let childElements = main.children;
        for (let i = 0; i < childElements.length; i++) {
            mainHeight += childElements[i].offsetHeight;
        }
        if(mainHeight == oldHeight) return
        main.style.height = mainHeight + 'px'
    }, 20);
}