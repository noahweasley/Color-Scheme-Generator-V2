import "./App.css";
import { useState } from "react";
import {
  getComplementary,
  convertRGBtoHEX,
  generatorRandomColor,
  isColorDark,
} from "./utils.js";

import ColorContainer from "./components/ColorContainer";

export default function App() {
  const [bgColor, setBgColor] = useState([255, 255, 255]);
  const [fgColor, setFgColor] = useState([0, 0, 0]);
  const [isCopied1, setIsCopy1] = useState(false);
  const [isCopied2, setIsCopy2] = useState(false);

  const bgHex = convertRGBtoHEX(bgColor);
  const fgHex = convertRGBtoHEX(fgColor);

  const handleGenerateColors = () => {
    const newBgColor = generatorRandomColor();
    const newFgColor = getComplementary(newBgColor);

    setBgColor(newBgColor);
    setFgColor(newFgColor);

    isCopied1 && setIsCopy1(false);
    isCopied2 && setIsCopy2(false);
  };

  const handleCopy1 = (color) => {
    navigator.clipboard.writeText(color);
    setIsCopy1(true);
  };

  const handleCopy2 = (color) => {
    navigator.clipboard.writeText(color);
    setIsCopy2(true);
  };

  return (
    <div className="window" onClick={handleGenerateColors}>
      <ColorContainer
        fgColor={fgHex}
        bgColor={bgHex}
        isCopied={isCopied1}
        isDark={isColorDark(bgColor)}
        onCopy={() => handleCopy1(bgHex)}
      />
      <ColorContainer
        fgColor={bgHex}
        bgColor={fgHex}
        isCopied={isCopied2}
        isDark={isColorDark(fgColor)}
        onCopy={() => handleCopy2(fgHex)}
      />
    </div>
  );
}
