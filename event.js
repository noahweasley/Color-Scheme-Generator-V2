let body = document.getElementsByTagName('body')[0];

body.addEventListener('click', () => {
    let bg = generatorRandomColor();
    let [red, blue, green] = bg;

    let fg = getComplementary(bg);

    let fgHexString = convertRGBtoHEX(fg);
    let bgHexString = convertRGBtoHEX(bg);

    Array.from(document.getElementsByTagName('p')).forEach(text => {
        text.style.color = "rgb(" + fg[0] + "," + fg[1] + "," + fg[2] + ")";
        if (text.id === 'fg') text.innerHTML = "Foreground Color: " + fgHexString;
        else text.innerHTML = "Background Color: " + bgHexString;
    })

    body.style.backgroundColor = "rgb(" + red + "," + blue + "," + green + ")";
})

function getComplementary(colors) {
    let r = colors[0];
    let b = colors[1];
    let g = colors[2];

    let x = Math.max(r, b, g) + Math.min(r, b, g);

    let rr = x - r;
    let bb = x - b;
    let gg = x - g;
    return [Math.ceil(rr), Math.ceil(bb), Math.ceil(gg)];
}

function convertRGBtoHEX(colors) {
    return "#" + colors[0].toString(16) + colors[0].toString(16) + colors[0].toString(16);
}

function generatorRandomColor() {
    let red = Math.round(Math.random() * 255);
    let blue = Math.round(Math.random() * 255);
    let green = Math.round(Math.random() * 255);
    return [red, blue, green];
}

function isColorDark(colorValues) {
    let [red, blue, green] = colorValues;
    let hsp = Math.sqrt(0.299 * Math.pow(red, 2) + 0.587 * Math.pow(green, 2) + 0.114 * Math.pow(blue, 2));
    if (hsp > 127.5) return false;
    else return true;
}