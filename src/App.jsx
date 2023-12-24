import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Draggable from "react-draggable";
import vid1 from "./assets/vid1.mp4";
import vid2 from "./assets/vid2.mp4";
import vid3 from "./assets/vid3.mp4";

function App() {
    const vidRef = useRef(null);
    const [startY, setStartY] = useState(0);
    const [isDragging, setIsDragging] = useState(true);
    const videos = [
        { src: vid1, bgColor: "bg-blue-500" },
        { src: vid2, bgColor: "bg-red-500" },
        { src: vid3, bgColor: "bg-green-500" },
    ];

    const handleOnStart = (e, data) => {
        setStartY(data.y);
        setIsDragging(false);
        // console.log(data);
    };

    const handleOnStop = (e, data) => {
        const deltaY = data.y - startY;
        const scrollIncrement = vidRef.current.clientHeight; // Atur nilai scroll yang diinginkan di sini

        if (deltaY > 0) {
            // Scroll ke bawah
            setIsDragging(false);
            const scrollTo = vidRef.current.scrollTop - scrollIncrement;
            vidRef.current.scrollTo({ top: scrollTo, behavior: "smooth" });
            setIsDragging(false);
            // console.log(vidRef.current.scrollTop, " - ", scrollIncrement, " = ", scrollTo);
        } else if (deltaY < 0) {
            // Scroll ke atas
            setIsDragging(false);
            const scrollTo = vidRef.current.scrollTop + scrollIncrement;
            vidRef.current.scrollTo({ top: scrollTo, behavior: "smooth" });
            setIsDragging(false);
            // console.log(vidRef.current.scrollTop, " + ", scrollIncrement, " = ", scrollTo);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setIsDragging(true);
        }, 1000);

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
                        onStart={isDragging ? handleOnStart : ""}
                        onDrag={() => false}
                        onStop={handleOnStop}
                    >
                        <div className="w-full h-full overflow-scroll" ref={vidRef}>
                            {videos.map((video, index) => (
                                <div key={index} className={`h-full ${video.bgColor}`}>
                                    <video controls className="w-full h-full">
                                        <source src={video.src} type="video/mp4" controls />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            ))}
                        </div>
                    </Draggable>
                </div>
            </div>
        </>
    );
}

export default App;
