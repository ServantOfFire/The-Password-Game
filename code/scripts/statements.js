function stmt1(input) {
    return input.length >= 5
}

function stmt2(input) {
    return /\d/.test(input);
}

function stmt3(input) {
    return input !== input.toLowerCase();
}

function stmt4(input) {
    var specialC = /[!§@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return specialC.test(input)
}

function stmt5(input) {
    var num = input.replace(/[^0-9]/g, '');
    var numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    var sum = 0;
    for (i = 0; i < num.length; i++)
        sum += parseInt(num.charAt(i));
    if (sum === 25) {
        deleteHighlight(5)
        return true;
    }
    highlight(numbers, 5)
}

function stmt6(input) {
    var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    for (let month = 0; month <= months.length; month++) {
        if (input.toLowerCase().includes(months[month])) return true
    }
}

function stmt7(input) {
    var romanNum = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
    for (let num = 0; num <= romanNum.length; num++) {
        if (input.includes(romanNum[num])) return true
    }
}

function stmt8(input) {
    var sponsors = ['theowlclub', 'jimmy', 'lego', 'simi'];
    for (let i = 0; i <= sponsors.length; i++) {
        if (input.toLowerCase().includes(sponsors[i])) return true
    }
}

function stmt9(input) {
    let romanNumeralsWithSpaces = input.match(/(?:M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3}))/g);
    var romanNum = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
    const roman = [];
    for (const item of romanNumeralsWithSpaces) {
        if (item !== '') roman.push(item);
    }
    const arabic = [];
    for (let i = 0; i < roman.length; i++)
        arabic.push(deromanize(roman[i]))
    let product = arabic[0]
    for (let i = 1; i < arabic.length; i++)
        product *= arabic[i]
    if (product === 35) {
        deleteHighlight(9)
        return true
    }
    highlight(romanNum, 9)
}

function stmt10(input) {
    return input.includes(getCaptchaText()) || input.includes('chase')
}

function stmt11(input) {
    return true
    return input.toLowerCase().includes(answer.toLowerCase())
}

function stmt12(input) {
    let symbols = ["He", "Li", "Be", "Ne", "Na", "Mg", "Al", "Si", "Cl", "Ar",
        "Ca", "Sc", "Ti", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge",
        "As", "Se", "Br", "Kr", "Rb", "Sr", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh",
        "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "Xe", "Cs", "Ba", "La", "Ce",
        "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb",
        "Lu", "Hf", "Ta", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi",
        "Po", "At", "Rn", "Fr", "Ra", "Ac", "Th", "Pa", "Np", "Pu", "Am", "Cm",
        "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs",
        "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"
    ]
    for (let i = 0; i <= symbols.length; i++) {
        if (input.includes(symbols[i])) {
            return true
        }
    }
}

function stmt13(input) {
    //moonEmojis = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'] already declared in script for cheats
    if (input.includes(moonEmojis[moonPhase]))
        return true
}

function stmt14(input) {
    if (typeof mapsApiKey === 'undefined') { //if google rule deactivated
        return input.toLowerCase().includes(allCountries[chosenLocation].toLowerCase())
    }
    input = input.toLowerCase().replaceAll(' ', '')
    if (input.includes(streetViewCoords[chosenLocation][2].toLowerCase())) {
        return true
    }
    document.getElementById('falseCountries').innerHTML = ''
    if (usedCountries) {
        height -= 42 * usedCountries.length
        main.style.height = height + 'px'
    }


    usedCountries = allCountries.filter(function (element) {
        return input.includes(element.toLowerCase())
    })
    usedCountries.forEach(function (element) {
        let wrongCountry = document.createElement('p')
        wrongCountry.innerHTML = `${error.outerHTML}${element}`
        document.getElementById('falseCountries').appendChild(wrongCountry)
        height += 42
        main.style.height = height + 'px'
    })
}

function stmt15(input) {
    var numbers = input.replace(/[^0-9]/g, ' ');
    let num = numbers.split(' ')
    for (let i = 0; i <= num.length; i++) {
        if (num[i] !== '') {
            if (num[i] % 4 === 0) {
                if (num[i] % 100 === 0) {
                    if (num[i] % 400 === 0)
                        return true
                } else
                    return true
            }
        }
    }
}

function stmt16(input) {
    const move = chessPositions[board][2];
    //FALSEMOVES ARRAY IS DEFINED IN SCRIPT SO IT DOESN`T RESET ITSELF
    let possibleChessMoves = input.match(/[NBRQK]?[a-h]?[1-8]?[x-]?[a-h][1-8](\=[NBRQ])?(\+|\#)?/g)
    removeMoves()
    if (input.includes(move)) {
        removeMoves(true)
        return true
    }
    if (possibleChessMoves != null) {
        for (let i = 0; i < possibleChessMoves.length; i++) {
            if (!document.getElementById(possibleChessMoves[i])) {
                let invalidNotation = document.createElement('p')
                invalidNotation.id = possibleChessMoves[i]
                invalidNotation.classList.add('chessInvalid')
                invalidNotation.style.textAlign = 'center'
                invalidNotation.style.marginBottom = '0px'
                for (let o = 0; o < falseMoves.length; o++) {
                    if (possibleChessMoves[i].includes(falseMoves[o])) {//remove smaller moves
                        if (document.getElementById(falseMoves[o])) {
                            document.getElementById('chessWrapper').removeChild(document.getElementById(falseMoves[o]))
                            height -= 42
                            main.style.height = height + 'px'
                        }
                        let index = falseMoves.indexOf(falseMoves[o]);
                        falseMoves.splice(index, 1); // 2nd parameter means remove one item only
                    }
                }
                falseMoves.push(possibleChessMoves[i])
                if (possibleChessMoves[i].replace(/([x+#]|=[QRNB])/g, '') == move.replace(/([x+#]|=[QRNB])/g, ''))
                    invalidNotation.innerHTML = `${error.outerHTML}${possibleChessMoves[i]} (Invalid notation)`
                else
                    invalidNotation.innerHTML = `${error.outerHTML}${possibleChessMoves[i]}`
                height += 42
                main.style.height = height + 'px'
                document.getElementById('chessWrapper').insertBefore(invalidNotation, document.getElementById('boardWrapper'))
            }
        }
    }

    function removeMoves(all) {
        let removable = document.getElementsByClassName('chessInvalid');
        if (removable.length != 0) {
            for (let i = 0; i < removable.length; i++) {
                if (all) {
                    let index = falseMoves.indexOf(removable[i].innerText); // remove from falseMoves array
                    falseMoves.splice(index, 1)
                    document.getElementById('chessWrapper').removeChild(removable[i])
                    height -= 42
                    main.style.height = height + 'px'
                } else if (!input.includes(removable[i].innerText)) {
                    let index = falseMoves.indexOf(removable[i].innerText); // remove from falseMoves array
                    falseMoves.splice(index, 1)
                    document.getElementById('chessWrapper').removeChild(removable[i])
                    height -= 42
                    main.style.height = height + 'px'
                }
            }
        }
    }
}

function stmt17(input) {
    if (input.includes(gregEmoji)) {
        if (firstTimeEgg) {
            firstTimeEgg = false
            greg = true;
            gregRegExp = new RegExp(gregEmoji, 'g')
        }
    }
    if (greg) return true
}

function stmt18(input) {
    var usedElements = []
    var sum = 0;
    const periodicTable = [
        "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al",
        "Si", "P", "S", "Cl", "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe",
        "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr",
        "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn",
        "Sb", "Te", "I", "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm", "Sm",
        "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re",
        "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn", "Fr", "Ra",
        "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md",
        "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl",
        "Mc", "Lv", "Ts", "Og"
    ]
    const periodicSorted = periodicTable.toSorted().reverse()
    var regexFromPeriodicTable = new RegExp(periodicSorted.join("|"), 'g');
    var matches = input.match(regexFromPeriodicTable) || [];
    for (var i = 0; i < matches.length; i++) { //Get rid of mistakes by He != H
        for (let o = 0; o < usedElements.length; o++) {
            if (matches[i].includes(usedElements[o].charAt(0) && usedElements[o].length == 1)) { //remove smaller moves
                let index = usedElements.indexOf(usedElements[o]);
                usedElements.splice(index, 1); // 2nd parameter means remove one item only
            }
        }
        usedElements.push(matches[i])
    }
    for (var i = 0; i < usedElements.length; i++)
        sum += periodicTable.indexOf(usedElements[i]) + 1
    if (sum == 200) {
        deleteHighlight(18)
        return true
    }
    highlight(usedElements, 18)
}

function stmt19(input) {
    return true
    const vowels = ['a', 'A', 'e', 'E', 'i', 'I', 'o', 'O', 'u', 'U', 'y', 'Y']
    var usedVowels = []
    vowels.forEach((elem) => {
        if (input.includes(elem)) {
            usedVowels.push(elem)
        }
    })
    function areAllVowelsFormatted(modifier) {
        let alternateModifiers = ['b', 'i', 'mark', 'font']
        alternateModifiers.splice(alternateModifiers.indexOf(modifier), 1)
        //replace All other modifiers
        alternateModifiers = alternateModifiers.flatMap(e => [`<${e}(.*?)>`, `</${e}>`]);
        let modifierRegEx = new RegExp(alternateModifiers.join('|'), 'g');
        let html = inputfield.innerHTML
        html = html.replace(modifierRegEx, '')


        const formatRegExp = new RegExp(`<${modifier}>(.*?)</${modifier}>`, 'gi')
        let matches = html.match(formatRegExp)
        if (matches == null) return
        matches = matches.join('')
        matches = matches.replaceAll(`<${modifier}>`, '')
        matches = matches.replaceAll(`</${modifier}>`, '')

        // only leave vowels
        let NotVowelRegExp = new RegExp('[^aeiouy]', 'gi')
        let vowelRegExp = new RegExp('[aeiouy]', 'gi')
        let matchedVowels = matches.replace(NotVowelRegExp, '')

        if (inputfield.innerText.match(vowelRegExp) == null) return false
        return matchedVowels.length == inputfield.innerText.match(vowelRegExp).length
    }
    if (areAllVowelsFormatted('b') || usedVowels.length == 0) {
        deleteHighlight(19)
        return true
    }
    // highlight(usedVowels, 19, true, false)
    highlight(usedVowels, 19, 'bolded')
}

function stmt20() {
    startFire()
    if (fireOut) return true
}

function stmt21(input) {
    if (!input.includes('🏋️')) return
    if (firstTimeStrength && input.match(/🏋️/g).length > 2) {
        setTimeout(() => {
            firstTimeStrength = false
            return true
        }, 1000)
    } else { return input.match(/🏋️/g).length > 2 }
    update()
}
function stmt22(input) {
    input = input.replaceAll(' ', '').toLowerCase()
    return input.includes('iamloved') || input.includes('iamworthy') || input.includes('iamenough')
}

function stmt23(input) {
    if (firstTimeEvolving && !alreadyEating) {
        firstTimeEvolving = false
        gregEmoji = '🐔'
        gregRegExp = new RegExp(gregEmoji, 'g')
        gregHatching()
    }
    if (input.includes('🐛')) {
        gregEating()
        return true
    }
}

function stmt24(input) {
    let iframe = document.querySelector('iframe');
    if (!input.includes('youtube.com/watch?v=')) {
        iframe.src = ''
        if (iframe.width != '0px') {
            iframe.width = '0px'
            iframe.height = '0px'
            height -= 273
            main.style.height = height + 'px'
        }
        return false
    }

    if (input.includes(workingLink) && workingLink != '') return true
    let indexOfLink = inputfield.innerText.indexOf('youtube.com/watch?v=')
    let videoId = inputfield.innerText.slice(indexOfLink + 20, indexOfLink + 31)
    if (workingLink == videoId) {
        return true
    }
    if (iframe.height == '0px') {
        iframe.width = '468px'
        iframe.height = '263px'
        height += 273
        main.style.height = height + 'px'
    }
    iframe.src = `https://www.youtube.com/embed/${videoId}`
    if (workingLink != videoId) {
        getVideoDuration(videoId)
    }
    return workingLink === videoId
}
function stmt25(input) {
    if (sacrificed) {
        let regEx = new RegExp(sacrificedLetters.join("|"), 'g');
        if (input.match(regEx) == null) {
            deleteHighlight(25)
            return true
        }
        highlight(sacrificedLetters, 25)
    }
}
function stmt26() {
    return true
    deleteHighlight()
    let numberOfBolded = numberOfFormats('b')
    let numberOfItalics = numberOfFormats('i')
    return numberOfItalics >= 2 * numberOfBolded
    function numberOfFormats(modifier) {
        let alternateModifiers = ['b', 'i', 'mark', 'font']
        alternateModifiers.splice(alternateModifiers.indexOf(modifier), 1)
        //replace All other modifiers
        alternateModifiers = alternateModifiers.flatMap(e => [`<${e}(.*?)>`, `</${e}>`]);
        let modifierRegEx = new RegExp(alternateModifiers.join('|'), 'g');
        let html = inputfield.innerHTML
        html = html.replace(modifierRegEx, '')
        const formatRegExp = new RegExp(`<${modifier}>(.*?)</${modifier}>`, 'gi');
        let matches = html.match(formatRegExp)

        if (matches == null) return 0
        matches = matches.join('')
        matches = matches.replaceAll(`<${modifier}>`, '')
        matches = matches.replaceAll(`</${modifier}>`, '')
        return matches.actualLength()
        // return matches.length
    }

}

function stmt27() {
    return true
    let wingDingsTags = Array.from(document.querySelectorAll('font[face="Wingdings"]'));
    if (wingDingsTags.length == 0) return
    let wingdingsText = ''
    wingDingsTags.forEach((e) => { wingdingsText += e.innerText })
    return wingdingsText.actualLength() >= inputfield.innerText.actualLength() * 0.3
}

function stmt28(input) {
    return true
    return input.toLowerCase().includes(hexColor.toLowerCase())
}

function stmt29(input) {
    return true
    let timesNewRomanTags = Array.from(document.querySelectorAll('font[face="Times New Roman"]'));
    let romanNumerals = input.match(/[IVXLCDM]/g)
    if (romanNumerals == null) return
    let romanText = ''
    timesNewRomanTags.forEach((e) => { romanText += e.innerText })
    romanText = romanText.replace(/[^IVXLCDM]/g, '')
    if (romanText.length == romanNumerals.length) {
        deleteHighlight(29)
        return true
    } else highlight(romanNumerals, 29, 'Times New Roman')
}

function stmt30(input) {
    return true
    let numbers = input.match(/[0-9]/g)
    if (numbers == null) return
    numbers = numbers.filter((value, index, self) => self.indexOf(value) === index).sort().reverse();

    function allRightSize() {
        return numbers.every(num => {
            let fontSizeTag = Array.from(document.querySelectorAll(`font[style="font-size: ${Math.pow(num, 2)}px;"]`))
            let contents = ''
            fontSizeTag.forEach(e => { contents += e.innerText })
            let regex = new RegExp(`${num}`, 'g')
            contents = contents.match(regex)
            if (contents == null || contents.length != input.match(regex).length) {
                return false
            }
            return true
        })
    }

    if (allRightSize()) {
        deleteHighlight(30)
        return true
    }
    highlight(numbers, 30, 'squared')
}

function stmt31() {
    return true
    let fontSizes = [0, 1, 4, 9, 12, 16, 25, 32, 36, 42, 49, 64, 81]
    usedFontsizes = []
    let remainingText = inputfield.cloneNode(true)
    for (let i = 0; i < fontSizes.length; i++) {
        let num = fontSizes[i]
        let fontSizeTags = Array.from(remainingText.querySelectorAll(`font[style="font-size: ${num}px;"]`))
        if (fontSizeTags.length == 0)
            continue
        usedFontsizes.push(num)
        fontSizeTags.forEach(e => { remainingText.innerHTML = remainingText.innerHTML.replace(e.outerHTML, '') })//remainingText.innerHTML = remainingText.innerHTML.replace(e.innerHTML, '')})
        let contents = ''
        fontSizeTags.forEach(e => { contents += e.innerText.toLowerCase() })
        contents = contents.replace(/[^a-zA-Z]/g, '').split('');
        if (contents.join('') != contents.filter((item, index) => contents.indexOf(item) === index).join(''))
            return false
    }
    remainingText = remainingText.innerText.replace(/[^a-zA-Z]/g, '').split('')
    if (remainingText.join('') == remainingText.filter((item, index) => remainingText.indexOf(item) === index).join('')) {
        deleteHighlight(31)
        return true
    }
    let letters = inputfield.innerText.match(/[a-z]/gi)

    highlight(letters, 31, 'differentSize')
}

function stmt32(input) {
    return true
    return input.includes(input.actualLength())
}
function stmt33() {
    return true
    function isPrime(number) {
        let start = 2;
        const limit = Math.sqrt(number);
        while (start <= limit) {
            if (number % start++ < 1) return false;
        }
        return number > 1;
    }
    return isPrime(inputfield.innerText.actualLength())
}

function stmt34() {
    return true
}

function stmt35(input) {
    return true
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var time12h = hours + ':' + minutes
    return input.includes(time12h)
}

function finalPassword(check){
    if(!check) return
    if(document.querySelector('.oldPassword').innerHTML == inputfield.innerHTML){
        document.getElementById('theLastBubble').classList.remove('falseBubble', 'falseText')
        document.getElementById('theLastBubble').classList.add('trueBubble', 'trueText')
        document.getElementById('theLastBubble').style.borderTop = '1px solid green'
        document.getElementById('theLastBubble').style.height = '60px'
        document.getElementById('theLastBubble').style.paddingTop = '3.5%'
        document.getElementById('theLastBubble'). innerHTML = `<b>Congratulations!</b> You have succesfully chosen a<br>password in ${inputfield.innerText.actualLength()} characters.`
        
        document.querySelector('#inputWrapper').removeChild(document.querySelector('#rules').querySelector('#formattingWrapper'))

        inputfield.style.borderRadius = '10px'
        inputfield.style.userSelect = 'none'
        inputfield.contentEditable = 'false'
    
    }

    
}