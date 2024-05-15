//GLOBAL_VARIABLES_GLOBAL_VARIABLES_GLOBAL_VARIABLES_GLOBAL_VARIABLES_GLOBAL_VARIABLES_GLOBAL_VARIABLES
const inputfield = document.getElementById("inputfield")
var eingabeText;
let ruleText;
let main = document.getElementById('mainfeld')
let height = 114;
let cBottom;
let cLeft;
main.style.height = height + 'px';
let newOffsetheight = 55;
let counter = document.getElementById('counter')
const updateInput = new Event('update')

const formattingWrapper = document.createElement('div')
formattingWrapper.id = 'formattingWrapper'

//for moving bubbles
let trueBubbles = [];
let falseBubbles = [];

//GLOBAL_VARIABLES_GLOBAL_VARIABLES_GLOBAL_VARIABLES_GLOBAL_VARIABLES_GLOBAL_VARIABLES_GLOBAL_VARIABLES

//RULE_VARIABLES_RULE_VARIABLES_RULE_VARIABLES_RULE_VARIABLES_RULE_VARIABLES_RULE_VARIABLES_

//sponsors and icons
const TheOwlClub = new Image()
const Jimmy = new Image()
const LEGO = new Image()
var checkmark = new Image();
var error = new Image();
var sacrificeFire = new Image()
setImages()
let sponsors = [TheOwlClub, Jimmy, LEGO]


//wordle
let answer;
getWordle()

//moonPhase
let moonPhase;
getMoonPhase()
let moonEmojis = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘']

//geoguessr
let usedCountries;

//chess
let falseMoves = [];

//captcha
var captchaSRC;

//greg
let greg;
let gregEmoji = '🥚';
let gregRegExp;
let firstTimeEgg = true

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

//strength
let firstTimeStrength = true

//evolvedGreg
let firstTimeEvolving = true
let alreadyEating = false
let readyToEat = false
let intervalEating;

//youtube 
let minutes = randomNumber(2, 26)
let seconds = randomNumber(2, 58)
let time;
let firstTimeYouTube = true
var workingLink = ' ';

//sacrifice
let sacrificedLetters = [];
let sacrificed = false;

//hex color
let hexColor = ''


//different Sizes
let usedFontsizes = []
//RULE_VARIABLES_RULE_VARIABLES_RULE_VARIABLES_RULE_VARIABLES_RULE_VARIABLES_RULE_VARIABLES_



clearConsole()

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
    [14, 'Your password must include the name of this country.', 'stmt14(eingabeText)', 'checkForAPI(ruleText)'],
    [15, 'Your password must include a leap year.', 'stmt15(eingabeText)'],
    [16, 'Your password must include the best move in <a target="_blank" style="color: red;" href="https://en.wikipedia.org/wiki/Algebraic_notation_(chess)">algebraic chess notation</a>.', 'stmt16(eingabeText)', 'createChessBoard(ruleText)'],
    [17, '🥚 This is my chicken Greg. He hasn’t hatched yet. Please put him in your password and keep him safe.', 'stmt17(eingabeText)'],
    [18, 'The elements in your password must have atomic numbers that add up to 200.', 'stmt18(eingabeText)'],
    [19, 'All the vowels in your password must be bolded.', 'stmt19(eingabeText)', 'createBoldButton(ruleText)'],
    [20, 'Oh no! Your password is on fire 🔥. Quick, put it out!', 'stmt20(eingabeText)'],
    [21, 'Your password is not strong enough 🏋️‍♂️', 'stmt21(eingabeText)', 'measureStrength(ruleText)'],
    [22, 'Your password must contain one of the following affirmations: <ul><li>I am loved</li><li>I am worthy</li><li>I am enough</li></ul>', 'stmt22(eingabeText)'],
    [23, `Greg has hatched! Please don't forget to feed him. He eats three 🐛 every minute.`, 'stmt23(eingabeText)'],
    [24, `Your password must include the URL of a ${minutes} minute ${seconds} second long YouTube video.`, 'stmt24(eingabeText)', 'embedYouTubeVideo(ruleText)'],
    [25, 'A sacrifice must be made. Pick two letters that you will no longer be able to use.', 'stmt25(eingabeText)', 'proposeSacrifices(ruleText)'],
    [26, 'Your password must contain twice as many italic characters as bold.', 'stmt26(eingabeText)', 'createItalicButton(ruleText)'],
    [27, 'At least 30% of your password must be in the Wingdings font.', 'stmt27()', 'createSelect(ruleText)'],
    [28, 'Your password must include this color in hex.', 'stmt28(eingabeText)', 'createColorDIV(ruleText)'],
    [29, 'All roman numerals must be in Times New Roman', 'stmt29(eingabeText)', 'addTimesNewRoman()'],
    [30, 'The font size of every digit must be equal to its square', 'stmt30(eingabeText)', 'createFontSize(ruleText)'],
    [31, 'Every instance of the same letter must have a different font size.', 'stmt31()'],
    [32, 'Your password must include the length of your password.', 'stmt32(eingabeText)'],
    [33, 'The length of your password must be a prime number.', 'stmt33()'],
    [34, "Uhhh let's skip this one.", 'true'],
    [35, 'Your password must include the current time.', 'stmt35(eingabeText)'],
    ['', 'Is this your final password?', 'false', 'finalPasswordCheck(ruleText)'],
]
document.addEventListener('copy', (e) => {
    e.preventDefault();
    let selectedText = window.getSelection().toString();
    e.clipboardData.setData('text/plain', selectedText);
});

document.addEventListener('paste', handlePaste);
document.addEventListener('drop', handleDrop);

// Prevent the default dragover event to enable drop
document.addEventListener('dragover', function(event) {
    event.preventDefault();
});

function handlePaste(e) {
    // Prevent the default paste action
    e.preventDefault();

    // Retrieve the pasted text from the clipboard data
    let pastedText = (e.clipboardData || window.clipboardData).getData('text/plain');

    // Insert the plain text at the cursor position
    insertPlainText(pastedText);
}

function handleDrop(e) {
    // Prevent the default drop action
    e.preventDefault();

    // Retrieve the dropped text from the DataTransfer object
    let droppedText = e.dataTransfer.getData('text/plain');

    // Insert the plain text at the cursor position
    insertPlainText(droppedText);
}

function insertPlainText(plainText) {
    // Insert the plain text at the cursor position
    if (document.activeElement && document.activeElement.value !== undefined) {
        // If the active element is an input or textarea
        let input = document.activeElement;
        let start = input.selectionStart;
        let end = input.selectionEnd;
        
        // Insert the text at the current cursor position
        input.value = input.value.substring(0, start) + plainText + input.value.substring(end);
        
        // Move the cursor to the end of the inserted text
        input.selectionStart = input.selectionEnd = start + plainText.length;
    } else if (document.activeElement && document.activeElement.isContentEditable) {
        // If the active element is a contenteditable element
        document.execCommand('insertText', false, plainText);
    } else {
        // If there's no active element or it's not an input/textarea or contenteditable element
        console.log('No valid element to insert text into.');
    }
}





addAutoResize();
inputfield.addEventListener('keydown', (e) => {if(!e.key.includes('Arrow')){update()}})
inputfield.addEventListener('input', () => {update()})
let currentRuleIndex = 0;
inputfield.addEventListener('update', () => {
    eingabeText = inputfield.innerText;
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
    checkForGreg()
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
    sacrificeFire.src = "images/icons/fire.svg"
    TheOwlClub.classList.add('sponsor')
    Jimmy.classList.add('sponsor')
    LEGO.classList.add('sponsor')
    checkmark.classList.add('pictogram')
    error.classList.add('pictogram')
    sacrificeFire.classList.add('pictogram')
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

function getCheats() {
    let cheatsCommandBuffer = '';
    document.addEventListener('keydown', function (event) {
        const keyPressed = event.key.toLowerCase();
        cheatsCommandBuffer += keyPressed;
        if (cheatsCommandBuffer.includes('cheats')) {
            let cheatsArray = ['Wordle answer: ' + answer, 'MoonPhase: ' + moonEmojis[moonPhase], 'Country: ' + streetViewCoords[chosenLocation][2], 'chessMove: ' + chessPositions[board][2], 'HEX:' + hexColor]
            cheatsArray.forEach((e)=>{console.log(e)})
            cheatsCommandBuffer = '';
        }
    });
}

function update() {
    inputfield.dispatchEvent(updateInput)
}