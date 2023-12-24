import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Draggable from "react-draggable";

function App() {
  const vidRef = useRef(null);
  const [startY, setStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(true);

  const handleOnStart = (e, data) => {
    setStartY(data.y);
    // console.log(data);
  };

  const handleOnStop = (e, data) => {
    const deltaY = data.y - startY;
    const scrollIncrement = vidRef.current.clientHeight; // Atur nilai scroll yang diinginkan di sini

    
    if (deltaY > 0) {
      // Scroll ke bawah
      const scrollTo = vidRef.current.scrollTop - scrollIncrement;
      vidRef.current.scrollTo({ top: scrollTo, behavior: "smooth" });
      setIsDragging(false)
      // console.log(vidRef.current.scrollTop, " - ", scrollIncrement, " = ", scrollTo);
    } else if (deltaY < 0) {
      // Scroll ke atas
      const scrollTo = vidRef.current.scrollTop + scrollIncrement;
      vidRef.current.scrollTo({ top: scrollTo, behavior: "smooth" });
      setIsDragging(false)
      // console.log(vidRef.current.scrollTop, " + ", scrollIncrement, " = ", scrollTo);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsDragging(true);
    }, 900);

    // Membersihkan interval saat komponen tidak lagi ter-render
    return () => clearInterval(interval);
  }, []); 

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center h-[100dvh] bg-black max-w-md m-auto overflow-hidden">
        <div className="w-full h-full relative overflow-auto">
          <Draggable 
            // bounds="parent"
            axis="y"
            onStart={isDragging ? handleOnStart : ''}
            onDrag={() => false}
            onStop={handleOnStop}
          >
            <div className="w-full h-full overflow-scroll" ref={vidRef}>
              <div className="h-full bg-blue-500"></div>
              <div className="h-full bg-red-500"></div>
              <div className="h-full bg-green-500"></div>
            </div>
          </Draggable>
        </div>
      </div>
    </>
  );
}

export default App;
