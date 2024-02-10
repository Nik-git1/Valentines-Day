import { useState, useEffect } from "react";
import "./App.css";
import ConfettiExplosion from 'react-confetti-explosion'; // Import ConfettiExplosion component

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({
    top: "-20px", // Initial top position set to 0
    left: "60px" // Initial left position set to 0
  });
  const [showConfetti, setShowConfetti] = useState(false); // State to track whether to show confetti

  const yesButtonSize = noCount * 20 + 16;

  useEffect(() => {
    if (noCount > 0) {
      function handleResize() {
        const maxWidth = window.innerWidth - 100; // Adjusted to account for button width
        const maxHeight = window.innerHeight - 100; // Adjusted to account for button height
        const newPosition = {
          top: Math.random() * maxHeight,
          left: Math.random() * maxWidth
        };
        setButtonPosition(newPosition);
      }

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, [noCount]);

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "ure bub?",
      "Really sure bubbb?",
      "Soch le bhyii!",
      "Last chance!",
      "Rehpatt??!",
      "Mere alava hai bhi kon bhai !",
      "Lodu hai kya aarti!",
      "Muh todd dunga bkl ab mai tera",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const handleYesClick = () => {
    setYesPressed(true);
    setShowConfetti(true);
  };

  return (
    <div className="full-page-container">
      {showConfetti && <ConfettiExplosion
        force={0.5}
        duration={5500}
        particleCount={200}
        width={900}
      />}
      <div className="centered-container" style={{ backgroundColor: "#fff5f5", textAlign: "center" }}>
        <div className="valentine-container">
          {yesPressed ? (
            <>
              <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" alt="Bear kisses" />
              <div className="text-container" style={{ color: "#ff6961" }}>  Yayyyyyyy!!!</div>
            </>
          ) : (
            <>
              <img
                className="h-[200px]"
                style={{ width: "100%", maxWidth: "400px", height: "auto" }}
                src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
                alt="Bear with roses"
              />
              <h1 className="text-container" style={{ color: "#ff6961" }}>Will you be my Valentine?</h1>
              <div style={{ position: "relative" }}>
                <button
                  className={"yes-button"}
                  style={{ fontSize: yesButtonSize }}
                  onClick={handleYesClick}
                >
                  Yes
                </button>

                <button
                  onClick={handleNoClick}
                  className="no-button"
                  style={{
                    marginTop: "1rem",
                    position: "absolute",
                    top: buttonPosition.top,
                    left: buttonPosition.left,
                    maxWidth: "90%",
                  }}
                >
                  {noCount === 0 ? "No" : getNoButtonText()}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
