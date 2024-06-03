// Mouse coords tracking
let trackMouse = false;
function TrackMouseCoords() {
    document.addEventListener('mousemove', (event) => {
        if (!trackMouse) {
            return;
        }
        const {
            clientX,
            clientY
        } = event;
        console.log(clientX, clientY);
    });
    document.addEventListener('keydown', function (event) {
        if (event.key === 'F8') {
            if (trackMouse) {
                console.log('F8 Pressed, stopping mouse tracking.');
                trackMouse = false;
                return;
            } else if (!trackMouse) {
                trackMouse = true;
                console.log('F8 Pressed, mouse tracking activated.');
            }
        }
    });
}

//----------------------------------------------------------------------------------------------------------
// Randomnumber: 
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}
//----------------------------------------------------------------------------------------------------------
//clear console shortcat
function clearConsole() {
    let commandBuffer = '';
    document.addEventListener('keydown', function (event) {
        const keyPressed = event.key.toLowerCase();
        commandBuffer += keyPressed;
        if (commandBuffer.includes('clear')) {
            console.clear();
            commandBuffer = '';
        }
    });
}

//----------------------------------------------------------------------------------------------------------
//replaces a character at given index in a string
String.prototype.replaceAt = function (index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }

    return this.substring(0, index) + replacement + this.substring(index + 1);
};

//----------------------------------------------------------------------------------------------------------
//like array splice, but for a string.
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

//----------------------------------------------------------------------------------------------------------
// returns the length of characters visible to user, insead of UTF-8 characters
String.prototype.actualLength = function () {
    var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    var stringWithoutSurrogates = this.replace(surrogatePairs, 'a');
    return stringWithoutSurrogates.length;
};

//----------------------------------------------------------------------------------------------------------
// replaces a random match from a regex
String.prototype.replaceRandomMatch = function (regex, replacement) {
    let matches = this.match(regex);
    if (!matches || matches.length === 0) {
        return this; // No matches found, return the original string
    }
    console.log(matches)
    let index = randomNumber(0, matches.length - 1);
    let i = 0;
    console.log(index)
    return this.replace(regex, (match) => {
        if (i === index) {
            i++;
            return replacement;
        }
        i++;
        return match;
    });
}