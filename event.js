let bgHexString = "#ffffff";
let fgHexString = "#000000";
let BGC = [255, 255, 255];
let FGC = [0, 0, 0];

const change = document.documentElement;

const colorFg = document.getElementById("color-fg");
const colorBg = document.getElementById("color-bg");

const bgCopy = document.getElementById("copy-1");
const fgCopy = document.getElementById("copy-2");

const darkIndicator1 = document.getElementById("dark-indicator-1");
const darkIndicator2 = document.getElementById("dark-indicator-2");

const bgColorContainer = document.getElementById("bg");
const fgColorContainer = document.getElementById("fg");

const bgTexts = Array.from(document.querySelectorAll(".color-container.color-container__first>p"));
const fgTexts = Array.from(document.querySelectorAll(".color-container.color-container__second>p"));

bgCopy.addEventListener("click", (event) => {
  event.stopPropagation();
  bgCopy.innerHTML = "COPIED " + '<i class="fas fa-check">';
  navigator.clipboard.writeText(bgHexString);
});

fgCopy.addEventListener("click", (event) => {
  event.stopPropagation();
  fgCopy.innerHTML = "COPIED " + '<i class="fas fa-check">';
  navigator.clipboard.writeText(fgHexString);
});

change.addEventListener("click", () => {
  bgCopy.innerText = fgCopy.innerText = "COPY";

  BGC = generatorRandomColor();
  FGC = getComplementary(BGC);

  bgHexString = convertRGBtoHEX(BGC);
  fgHexString = convertRGBtoHEX(FGC);

  display(FGC, BGC, fgHexString, bgHexString);
});

/**
 * Displays result to the browser
 *
 * @param bg the window background color
 * @param fgHexString the foreground Hex string
 * @param bgHexString the background Hex string
 */
function display(fg, bg, fgHexString, bgHexString) {
  let isBGDark = isColorDark(bg);
  let isFGDark = isColorDark(fg);

  fgColorContainer.style.backgroundColor = fgHexString;
  bgColorContainer.style.backgroundColor = bgHexString;

  darkIndicator1.innerText = isFGDark ? "[Dark Color]" : "[Light Color]";
  darkIndicator2.innerText = isBGDark ? "[Dark Color]" : "[Light Color]";

  colorBg.innerText = `Color code: ${bgHexString}`;
  colorFg.innerText = `Color code: ${fgHexString}`;

  bgTexts.forEach((text) => {
    if (isBGDark) {
      text.classList.add("dark");
      text.classList.remove("light");
    } else {
      text.classList.add("light");
      text.classList.remove("dark");
    }

    text.style.color = fgHexString;
  });

  fgTexts.forEach((text) => {
    if (isFGDark) {
      text.classList.add("dark");
      text.classList.remove("light");
    } else {
      text.classList.add("light");
      text.classList.remove("dark");
    }

    text.style.color = bgHexString;
  });

  bgCopy.style.color = fgHexString;
  fgCopy.style.color = bgHexString;

  if (isBGDark) {
    bgCopy.classList.add("dark");
    bgCopy.classList.remove("light");
  } else {
    bgCopy.classList.add("light");
    bgCopy.classList.remove("dark");
  }

  if (isFGDark) {
    fgCopy.classList.add("dark");
    fgCopy.classList.remove("light");
  } else {
    fgCopy.classList.add("light");
    fgCopy.classList.remove("dark");
  }
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
  return (
    "#" +
    colors[0].toString(16).padStart(2, "0") +
    colors[1].toString(16).padStart(2, "0") +
    colors[2].toString(16).padStart(2, "0")
  );
}

/**
 * Generates a random color in RGB
 *
 * @returns an array representing the colors
 */
function generatorRandomColor() {
  let red = Math.round(Math.random() * 254);
  let blue = Math.round(Math.random() * 254);
  let green = Math.round(Math.random() * 254);
  return [red, blue, green];
}

/**
 * Checks if a color is dark or light using the HSP color space
 *
 * @param the color in RGB
 */
function isColorDark(colorValues = [0, 0, 0]) {
  // R.E: http://alienryderflex.com/hsp.html
  let [red, blue, green] = colorValues;
  let hsp = Math.sqrt(0.299 * Math.pow(red, 2) + 0.587 * Math.pow(green, 2) + 0.114 * Math.pow(blue, 2));
  console.log("hsp: " + hsp);
  if (hsp > 127.5) return false;
  else return true;
}
