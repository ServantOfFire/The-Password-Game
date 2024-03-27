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
    element.style.display = 'block';
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
            height += ruleBubble.offsetHeight + 20
            main.style.height = height + 'px'

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
                if (oldPosition !== falseIndexOfRule)
                    moveElement(ruleId, falseIndexOfRule)
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
        if (oldPosition !== falseIndexOfRule)
            moveElement(ruleId, falseIndexOfRule)
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
        height += 40
        main.style.height = height + 'px'
    }
    function checkForAPI(a) {
        if (typeof apiKey === 'undefined') {
            a.innerHTML = `Rule 14 is not activated in the online version to prevent abuse of the owner's API key. \n Type "Google" in your password to pass this rule.`
            return
        }
        a.innerHTML = apiKey
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
        height += 405
        main.style.height = height + 'px'
    }
    function boldButton(a) {
        //buttonWrapper-div already defined in script as global variable
        const boldButton = document.createElement('button')
        boldButton.innerText = 'Bold'
        boldButton.type = 'button'
        boldButton.id = 'boldButton'
        buttonWrapper.appendChild(boldButton)
        setTimeout(function () {
            buttonWrapper.style.marginTop = '-5px'
        }, 1)
        height += 45
        main.style.height = height + 'px'
        inputfield.style.borderBottomRightRadius = '0px'
        inputfield.style.borderBottomLeftRadius = '0px'
        document.getElementById('inputWrapper').appendChild(buttonWrapper)

        boldButton.addEventListener("click", () => { //making text bold
            deleteHighlight()
            modifyText('bold', false, null);
            isBold()
            highlight(highlightedStrings, currentHNumber)
        });

        let neededEvents = 'mouseup input click'.split(' ')
        neededEvents.forEach(event => document.getElementById('inputWrapper').addEventListener(event, buttonActiveColor))

        function buttonActiveColor() {
            timer = setTimeout(() => {
                deleteHighlight()
                isBold()
                highlight(highlightedStrings, currentHNumber)
            }, 1)
        }
    }

}
function changeMainElemHeight(reduce) {
    //reduce true => smaller; reduce false => bigger
    if (reduce) {
        height -= newOffsetheight - inputfield.offsetHeight
        main.style.height = height + 'px'
        newOffsetheight = inputfield.offsetHeight
        cBottom = (inputfield.offsetHeight - 55) / 2 + 3
        counter.style.bottom = cBottom + 'px'
        return // its finished
    }
    height += inputfield.offsetHeight - newOffsetheight
    main.style.height = height + 'px'
    newOffsetheight = inputfield.offsetHeight
    cBottom = (inputfield.offsetHeight - 55) / 2 + 3
    counter.style.bottom = cBottom + 'px'
}