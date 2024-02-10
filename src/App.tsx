import { useState, useEffect } from "react";
import "./App.css";
import ConfettiExplosion from 'react-confetti-explosion'; // Import ConfettiExplosion component
import MusicFile from './Cherry.mp3'; // Import the music file

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({
    top: "-20px", // Initial top position set to 0
    left: "60px" // Initial left position set to 0
  });
  const [showConfetti, setShowConfetti] = useState(false); // State to track whether to show confetti
  const [audio] = useState(new Audio(MusicFile)); // Initialize audio element with music file

  const yesButtonSize = noCount * 20 + 16;

  useEffect(() => {
    if (noCount > 0) {
      const handleResize = () => {
        const maxWidth = window.innerWidth - 100;
        const maxHeight = window.innerHeight - 100;
        const newPosition = {
          top: `${Math.random() * maxHeight}px`, // Convert to string with 'px' suffix
          left: `${Math.random() * maxWidth}px`, // Convert to string with 'px' suffix
        };
        setButtonPosition(newPosition);
      };
      

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, [noCount]);

  useEffect(() => {
    // Play the audio silently to unlock it for later playback
    audio.volume = 0;
    audio.play().then(() => {
      audio.pause();
      audio.currentTime = 0;
    });

    // Cleanup function to pause music on component unmount
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Sure bub?",
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
    // Play the audio when the user clicks "Yes"
    audio.volume = 1; // Set the volume to audible
    audio.play().catch(error => console.error('Error playing audio:', error));
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
