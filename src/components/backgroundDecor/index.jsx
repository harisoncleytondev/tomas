/* REACT */
import { useState, useEffect } from "react";

/* ASSETS */
import hat from "./assets/hat.png";
import book from "./assets/book.png";

export default function BackgroundDecor() {
  const decorItems = [
    { id: 1, type: "book", top: "10%", left: "5%", rotation: "-15deg" },
    { id: 2, type: "hat", top: "30%", left: "70%", rotation: "10deg" },
    { id: 3, type: "book", top: "30%", left: "18%", rotation: "15deg" },
    { id: 4, type: "hat", top: "15%", left: "50%", rotation: "-10deg" },
    { id: 5, type: "book", top: "40%", left: "85%", rotation: "-15deg" },
    { id: 6, type: "book", top: "10%", left: "70%", rotation: "10deg" },
    { id: 7, type: "hat", top: "10%", left: "20%", rotation: "-15deg" },
    { id: 8, type: "book", top: "65%", left: "15%", rotation: "20deg" },
    { id: 9, type: "hat", top: "80%", left: "40%", rotation: "-25deg" },
    { id: 10, type: "book", top: "75%", left: "75%", rotation: "5deg" },
    { id: 11, type: "hat", top: "50%", left: "30%", rotation: "30deg" },
    { id: 12, type: "book", top: "60%", left: "85%", rotation: "-20deg" },
    { id: 13, type: "hat", top: "20%", left: "80%", rotation: "15deg" },
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    function verify() {
      setIsMobile(window.innerWidth <= 600);
    }
    window.addEventListener("resize", verify);
    return () => window.removeEventListener("resize", verify);
  }, []);

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: -1,
        }}
      >
        {(isMobile
          ? decorItems.filter((item) => item.type !== "book")
          : decorItems
        ).map(({ id, type, top, left, rotation }) => (
          <img
            key={id}
            src={type == "book" ? book : hat}
            alt={type}
            style={{
              position: "absolute",
              top,
              left,
              width: 60,
              transform: `rotate(${rotation})`,
              userSelect: "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
