const modifyText = (command, defaultUi, value) => {
    //execCommand executes command on selected text
    document.execCommand(command, defaultUi, value);
};
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
        if (age < 1.84566) {
            //        moonPhase = "New";
            moonPhase = 0
            return moonPhase
        } else if (age < 5.53699) {
            //        moonPhase = "Waxing Crescent";
            moonPhase = 1
            return moonPhase
        } else if (age < 9.22831) {
            //        moonPhase = "First Quarter";
            moonPhase = 2
            return moonPhase
        } else if (age < 12.91963) {
            //        moonPhase = "Waxing Gibbous";
            moonPhase = 3
            return moonPhase
        } else if (age < 16.61096) {
            //        moonPhase = "Full";
            moonPhase = 4
            return moonPhase
        } else if (age < 20.30228) {
            //        moonPhase = "Waning Gibbous";
            moonPhase = 5
            return moonPhase
        } else if (age < 23.99361) {
            //        moonPhase = "Last Quarter";
            moonPhase = 6
            return moonPhase
        } else if (age < 27.68493) {
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
    if (greg && eingabeText.match(gregRegExp) == null)
        deathscreen('GREG HAS BEEN SLAIN')
    preventChickenCloning()
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

function startFire() {
    if (burned) return
    burned = true
    let splitText = inputfield.innerHTML.split('')
    console.log(splitText)


    if(!input.includes('🔥')) {
        fireOut = true
        
    }
}