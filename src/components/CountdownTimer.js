import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
    const [timeUntilMidnight, setTimeUntilMidnight] = useState(0);

    useEffect(() => {
        const calculateTimeUntilMidnight = () => {
            const now = new Date();
            const midnight = new Date(now);
            midnight.setHours(24, 0, 0, 0);
            const timeRemaining = midnight.getTime() - now.getTime();
            setTimeUntilMidnight(timeRemaining);
            if (timeRemaining === 0) {
                localStorage.removeItem('films');
                window.location.reload();
            }
        };

        calculateTimeUntilMidnight();
        const timerId = setInterval(calculateTimeUntilMidnight, 1000);
        return () => clearInterval(timerId);
    }, []);

    const formatTime = (milliseconds) => {
        const hours = Math.floor(milliseconds / (1000 * 60 * 60));
        const minutes = Math.floor(
            (milliseconds % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    const deleteFilms = () => {
        localStorage.removeItem("films");
        window.location.reload();
    };

    return (
        <div className="text-2xl font-semibold text-primary-text">
            {/* <button onClick={deleteFilms} className="text-2xl font-semibold text-primary-correct">click</button> */}
            {formatTime(timeUntilMidnight)}
        </div>
    );
};

export default CountdownTimer;
