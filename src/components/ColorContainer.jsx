/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function ColorContainer({
  fgColor,
  bgColor,
  isDark,
  onCopy,
  isCopied,
}) {
  return (
    <div
      className={`color-container ${isDark ? "dark" : "light"}`}
      style={{ backgroundColor: bgColor }}
    >
      <p style={{ color: fgColor }}>Color Code: {bgColor}</p>
      <p style={{ color: fgColor }}>
        {isDark ? "[Dark Color]" : "[Light Color]"}
      </p>
      <button
        className={`btn ${isDark ? "dark" : "light"}`}
        onClick={(e) => {
          e.stopPropagation();
          onCopy();
        }}
      >
        {isCopied ? (
          <>
            COPIED <FontAwesomeIcon icon={faCheck} />
          </>
        ) : (
          <>COPY</>
        )}
      </button>
    </div>
  );
}
