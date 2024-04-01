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
        deleteHighlight(true, 5)
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
    var sponsors = ['theowlclub', 'jimmy', 'lego'];
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
        deleteHighlight(true, 9)
        return true
    }
    highlight(romanNum, 9)
}

function stmt10(input) {
    return input.includes(getCaptchaText()) || input.includes('chase')
}

function stmt11(input) {
    return input.includes(answer)
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
    if (typeof apiKey === 'undefined') { //if google rule deactivated
        return input.includes('Google')
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

        deleteHighlight(true, 18)
        return true
    }
    highlight(usedElements, 18)
}

function stmt19(input) {
    const vowels = ['a', 'A', 'e', 'E', 'i', 'I', 'o', 'O', 'u', 'U', 'y', 'Y']
    var usedVowels = []
    vowels.forEach((elem) => {
        if (input.includes(elem)) {
            usedVowels.push(elem)
        }
    })

    function areAllVowelsBolded() {
        // Create a temporary div element to work with the HTML content
        deleteHighlight()
        var tempDiv = document.createElement("div");
        let htmlContent = inputfield.innerHTML
        tempDiv.innerHTML = htmlContent;

        // Get all the text nodes within the editor
        var textNodes = tempDiv.childNodes;

        // Define the vowels

        // Track if all vowels are bolded
        var allBolded = true;

        // Iterate through each text node to check if any vowel is not bolded
        for (var i = 0; i < textNodes.length; i++) {
            var currentNode = textNodes[i];
            if (currentNode.nodeType === Node.TEXT_NODE) {
                // Iterate through each character in the text node
                for (var j = 0; j < currentNode.textContent.length; j++) {
                    var char = currentNode.textContent.charAt(j).toLowerCase();
                    if (vowels.includes(char)) {
                        // If the character is a vowel, check if it's bolded
                        var parentElement = currentNode.parentElement;
                        if (!(parentElement.nodeName === "STRONG" || parentElement.style.fontWeight === "bold")) {
                            allBolded = false; // If any vowel is not bolded, set allBolded to false
                            break; // No need to continue checking this text node
                        }
                    }
                }
            }
            if (!allBolded) {
                break; // No need to check further if any vowel is not bolded
            }
        }
        // Return whether all vowels are bolded
        return allBolded;
    }

    if (areAllVowelsBolded() || usedVowels.length == 0) {
        deleteHighlight(true, 19)
        return true
    }
    highlight(usedVowels, 19)
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
