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
        } else if(!trackMouse){
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