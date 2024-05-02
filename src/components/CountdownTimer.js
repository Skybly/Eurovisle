import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
    const [timeUntilMidnight, setTimeUntilMidnight] = useState(0);

    useEffect(() => {
        const calculateTimeUntilMidnight = () => {
            const now = new Date();
            const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
            const timeRemaining = midnight.getTime() - now.getTime();
            setTimeUntilMidnight(timeRemaining);
            if (timeRemaining < 1000) {
                resetAll();
            }
        };

        calculateTimeUntilMidnight();
        const timerId = setInterval(calculateTimeUntilMidnight, 1000);
        return () => clearInterval(timerId);
    }, []);

    const resetAll = () => {
        localStorage.removeItem('films');
        localStorage.removeItem("gameOver");
        localStorage.removeItem("win");
        window.location.reload();
    };

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

    return (
        <div className="text-2xl font-semibold text-primary-text">
            {formatTime(timeUntilMidnight)}
        </div>
    );
};

export default CountdownTimer;
