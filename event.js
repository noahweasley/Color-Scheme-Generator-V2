let fBGH = "",
    fFGH = "",
    fBG = [0, 0, 0],
    fFG = [0, 0, 0];

let canFlip = false;

let body = document.getElementsByTagName('body')[0];

let change = document.getElementById('change');
let flip = document.getElementById('flip');

change.addEventListener('click', () => {
    canFlip = true;
    fBG = generatorRandomColor();
    fFG = getComplementary(fBG);

    fBGH = convertRGBtoHEX(fBG);
    fFGH = convertRGBtoHEX(fFG);

    let fgHexString = fFGH;
    let bgHexString = fBGH;
    let bg = fBG;

    display(bg, fgHexString, bgHexString);
})

flip.addEventListener('click', () => {
    if (!canFlip) return;

    // swap colors here
    let [sxh, syh] = swap(fFGH, fBGH);
    fFGH = sxh;
    fBGH = syh;
    let [sx, sy] = swap(fFG, fBG);
    fFG = sx;
    fBG = sy;

    display(fBG, fFGH, fBGH);
})

/**
 * swaps two data of same type
 *
 * @param x the first element
 * @param y the second element
 * @return an array where `x = swap[0]` and `y = swap[1]`
 */
function swap(x, y) {
    return [y, x];
}

/**
 * Displays result to the browser
 *
 * @param bg the window background color
 * @param fgHexString the foreground Hex string
 * @param bgHexString the background Hex string
 */
function display(bg, fgHexString, bgHexString) {

    Array.from(document.getElementsByTagName('p')).forEach(text => {
        text.style.color = fgHexString;
        if (text.id === 'fg') text.innerHTML = "Foreground Color: " + fgHexString;
        else if (text.id === 'bg') text.innerHTML = "Background Color: " + bgHexString;
        else text.innerHTML = "Dark: " + isColorDark(bg);
    })

    Array.from(document.getElementsByTagName('button')).forEach(button => {
        button.style.backgroundColor = bgHexString;
        button.style.color = fgHexString;
    });

    body.style.backgroundColor = bgHexString;
}

/**
 * Retrieves the complementary colors
 *
 * @param the color to complement
 * @returns the color in RGB
 */
function getComplementary(colors = [0, 0, 0]) {
    let r = colors[0];
    let b = colors[1];
    let g = colors[2];

    let x = Math.max(r, b, g) + Math.min(r, b, g);

    let rr = x - r;
    let bb = x - b;
    let gg = x - g;
    return [Math.ceil(rr), Math.floor(bb), Math.floor(gg)];
}

/**
 * Convert from RGB color space to corresponding HEX string
 *
 * @param the RGB color
 */
function convertRGBtoHEX(colors = [0, 0, 0]) {
    return "#" +
        colors[0].toString(16).padStart(2, "0") +
        colors[1].toString(16).padStart(2, "0") +
        colors[2].toString(16).padStart(2, "0");
}

/**
 * Generates a random color in RGB
 *
 * @returns an array representing the colors
 */
function generatorRandomColor() {
    let red = Math.round(Math.random() * 255);
    let blue = Math.round(Math.random() * 255);
    let green = Math.round(Math.random() * 255);
    return [red, blue, green];
}

/**
 * Checks if a color is dark or light
 *
 * @param the color in RGB
 */
function isColorDark(colorValues = [0, 0, 0]) {
    let [red, blue, green] = colorValues;
    let hsp = Math.sqrt(0.299 * Math.pow(red, 2) + 0.587 * Math.pow(green, 2) + 0.114 * Math.pow(blue, 2));
    if (hsp > 127.5) return false;
    else return true;
}