const chessPositions = [
    ["images/chess/position1.png", 'White', "Rxf8+"],
    ["images/chess/position2.png", 'White', "Qxh6+"],
    ["images/chess/position3.png", 'Black', "exf3"],
    ["images/chess/position4.png", 'Black', "Qd3+"],
    ["images/chess/position5.png", 'Black', "Nxf4+"],
    ["images/chess/position6.png", 'White', "Qg3+"],
    ["images/chess/position7.png", 'Black', "Qd1+"],
    ["images/chess/position8.png", 'Black', "Bxc4+"],
    ["images/chess/position9.png", 'Black', "Qxg4+"],
    ["images/chess/position10.png", 'White', "Qd4+"],
    ["images/chess/position11.png", 'White', "Qg6#"],
    ["images/chess/position12.png", 'White', "Qd8#"],
    ["images/chess/position13.png", 'Black', "Qd1#"],
    ["images/chess/position14.png", 'White', "Rxg7+"],
    ["images/chess/position15.png", 'White', "Rxg6"],
    ["images/chess/position16.png", 'Black', "Rb3+"],
    ["images/chess/position17.png", 'White', "Bxb5+"],
    ["images/chess/position18.png", 'Black', "g6+"],
    ["images/chess/position19.png", 'Black', "Bc4+"],
    ["images/chess/position20.png", 'Black', "Nxf3+"],
    ["images/chess/position21.png", 'White', "dxc8=Q+"],
    ["images/chess/position22.png", 'Black', "gxh2+"],
]
let borderWhite = new Image()
borderWhite.src = 'images/chess/borderWhite.png'
borderWhite.classList.add('chessBorders')
let borderBlack = new Image()
borderBlack.src = 'images/chess/borderBlack.png'
borderBlack.classList.add('chessBorders')
const board = randomNumber(0, chessPositions.length - 1)
console.log(chessPositions.length)