clearConsole()
getCheats()
//GLOBAL_VARIABLES_GLOBAL_VARIABLES_GLOBAL_VARIABLES_GLOBAL_VARIABLES_GLOBAL_VARIABLES_GLOBAL_VARIABLES
const inputfield = document.getElementById("inputfield")
var eingabeText;
let main = document.getElementById('mainfeld')
let height = 114;
let cBottom;
let cLeft;
main.style.height = height + 'px';
let newOffsetheight = 55;
let counter = document.getElementById('counter')
const update = new Event('update')

const buttonWrapper = document.createElement('div')
buttonWrapper.id = 'buttonWrapper'

//for moving bubbles
let trueBubbles = [];
let falseBubbles = [];

//GLOBAL_VARIABLES_GLOBAL_VARIABLES_GLOBAL_VARIABLES_GLOBAL_VARIABLES_GLOBAL_VARIABLES_GLOBAL_VARIABLES

//RULE_VARIABLES_RULE_VARIABLES_RULE_VARIABLES_RULE_VARIABLES_RULE_VARIABLES_RULE_VARIABLES_

//sponsors
const TheOwlClub = new Image()
const Jimmy = new Image()
const LEGO = new Image()
var checkmark = new Image();
var error = new Image();
setImages()
let sponsors = [TheOwlClub, Jimmy, LEGO]

//wordle
let answer;
getWordle()

//moonPhase
let moonPhase;
getMoonPhase()
let moonEmojis = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘']

//chess
let falseMoves = [];

//captcha
var captchaSRC;

//highlighting
let currentHNumber = 0;
let highlightedStrings = []

//greg
let greg;
let gregEmoji = '';
let gregRegExp = new RegExp(gregEmoji, 'g')
let gregAlive = true

//fire
let fireStarted = false
let fireOut = false
let openTags = []
let closeTags = []
let changedOpenTags = []
let changedCloseTags = []
let burning;
let burnedText;
let firstCharBefore;


//RULE_VARIABLES_RULE_VARIABLES_RULE_VARIABLES_RULE_VARIABLES_RULE_VARIABLES_RULE_VARIABLES_

let ruleMatrix = [
    [1, 'Your password must be at least 5 characters.', 'stmt1(eingabeText)'],
    [2, 'Your password must include a number.', 'stmt2(eingabeText)'],
    
    [3, 'Your password must include an uppercase letter.', 'stmt3(eingabeText)'],
    [4, 'Your password must include a special character.', 'stmt4(eingabeText)'],
    [5, 'The digits in your password must add up to 25.', 'stmt5(eingabeText)'],
    [6, 'Your password must include a month of the year.', 'stmt6(eingabeText)'],
    [7, 'Your password must include a roman numeral.', 'stmt7(eingabeText)'],
    [8, 'Your password must include one of my sponsors: ', 'stmt8(eingabeText)', 'addSponsors(ruleText)'],
    [9, 'The roman numerals in your password should multiply to 35.', 'stmt9(eingabeText)'],
    [10, 'Your password must include this CAPTCHA:', 'stmt10(eingabeText)', 'createCaptcha(ruleText)'],
    [11, 'Your password must include today’s Wordle answer.', 'stmt11(eingabeText)'],
    [12, 'Your password must include a two letter symbol from the periodic table.', 'stmt12(eingabeText)'],
    [13, 'Your password must include the current phase of the moon as an emoji.', 'stmt13(eingabeText)'],
    [14, 'Your password must include the name of this country', 'stmt20(eingabeText)', 'checkForAPI(ruleText)'],
    [15, 'Your password must include a leap year.', 'stmt14(eingabeText)'],
    [16, 'Your password must include the best move in <a target="_blank" style="color: red;" href="https://en.wikipedia.org/wiki/Algebraic_notation_(chess)">algebraic chess notation</a>.', 'stmt15(eingabeText)', 'createChessBoard(ruleText)'],
    [17, '<span oncopy="standardCopy()">🥚</span> This my chicken Greg. He hasn’t hatched yet. Please put him in your password and keep him safe.', 'stmt16(eingabeText)'],
    [18, 'The elements in your password must have atomic numbers that add up to 200.', 'stmt17(eingabeText)'],
    [19, 'All the vowels in your password must be bolded.', 'stmt18(eingabeText)', 'boldButton()'],
    [20, 'Oh no! Your password is on fire 🔥. Quick, put it out!', 'stmt19(eingabeText)'],
    
]
copy = () => {
    navigator.clipboard.writeText(eingabeText)
}
addAutoResize();

document.addEventListener('input',() => {inputfield.dispatchEvent(update)})

let currentRuleIndex = 0;
inputfield.addEventListener('update', (event) => {
    eingabeText = inputfield.innerText;
    checkForGreg()
    setTimeout(() => {
        for (let i = 0; i < currentRuleIndex; i++)
            bubble(ruleMatrix[i][0], ruleMatrix[i][1], ruleMatrix[i][2], ruleMatrix[i][3]);
        if (height <= height + inputfield.offsetHeight - newOffsetheight) {
            changeMainElemHeight(false)
        }
        if (height >= height + inputfield.offsetHeight - newOffsetheight) {
            changeMainElemHeight(true)
        }
        moveIndex()
    }, 5);
    updateCounter()
});

function addAutoResize() {
    document.querySelectorAll('[data-autoresize]').forEach(function (element) {
        element.style.boxSizing = 'border-box';
        var offset = element.offsetHeight - element.clientHeight;
        element.addEventListener('update', function (event) {
            event.target.style.height = 'auto';
            event.target.style.height = event.target.scrollHeight + offset + 'px';
        });
        element.removeAttribute('data-autoresize');
    });
}


function setImages() {
    TheOwlClub.src = "images/sponsors/TheOwlClub.webp"
    Jimmy.src = "images/sponsors/Jimmy.png"
    LEGO.src = "images/sponsors/LEGO.png"
    checkmark.src = "images/icons/checkmark.svg"
    error.src = "images/icons/error.svg"
    TheOwlClub.classList.add('sponsor')
    Jimmy.classList.add('sponsor')
    LEGO.classList.add('sponsor')
    checkmark.classList.add('pictogram')
    error.classList.add('pictogram')
}

/**
  * @param {String} text The text to be rendered.
  * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
  */
function getTextWidth(text, font) {
    // re-use canvas object for better performance
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
}

function getCssStyle(element, prop) {
    return window.getComputedStyle(element, null).getPropertyValue(prop);
}

function getCanvasFont(el = document.body) {
    const fontWeight = getCssStyle(el, 'font-weight') || 'normal';
    const fontSize = getCssStyle(el, 'font-size') || '16px';
    const fontFamily = getCssStyle(el, 'font-family') || 'Times New Roman';
    return `${fontWeight} ${fontSize} ${fontFamily}`;
}

function getCheats() {
    let cheatsCommandBuffer = '';
    document.addEventListener('keydown', function (event) {
        const keyPressed = event.key.toLowerCase();
        cheatsCommandBuffer += keyPressed;
        if (cheatsCommandBuffer.includes('cheats')) {
            let cheatsArray = ['Wordle answer: ' + answer, 'MoonPhase: ' + moonEmojis[moonPhase], 'chessMove: ' + chessPositions[board][2]]
            console.log(cheatsArray);
            cheatsCommandBuffer = '';
        }
    });
}

updateCounter = () => {
    eingabeText = eingabeText.replaceAll('\n', '');
    counter.innerText = eingabeText.length
    cLeft = getTextWidth(counter.innerText, "18px arial")
    inputfield.style.marginLeft = cLeft - 10 + 'px'
}
standardCopy = () => {
    navigator.clipboard.writeText('🥚')
}