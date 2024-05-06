import React, { useState, useEffect } from "react";

const currentVersion = '1.2';
const CountdownTimerWomen = () => {
    const [timeUntilMidnight, setTimeUntilMidnight] = useState(0);

    useEffect(() => {
        const checkVersionAndReset = () => {
            const storedVersion = localStorage.getItem('womenVersion') || '0';
            const today = new Date().toDateString();
            const lastVisitDate = localStorage.getItem('womenLastVisitDate');
            if (storedVersion !== currentVersion || lastVisitDate !== today) {
                resetAll();
            }
            localStorage.setItem('womenVersion', currentVersion);
            localStorage.setItem('womenLastVisitDate', today);
        };

        const calculateTimeUntilMidnight = () => {
            const now = new Date();
            const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
            const timeRemaining = midnight.getTime() - now.getTime();
            setTimeUntilMidnight(timeRemaining);
            if (timeRemaining < 1000) {
                resetAll();
            }
        };

        checkVersionAndReset();
        calculateTimeUntilMidnight();
        const timerId = setInterval(calculateTimeUntilMidnight, 1000);
        return () => {
            clearInterval(timerId);
        };
        
    }, []);

    const resetAll = () => {
        localStorage.removeItem('womenFilms');
        localStorage.removeItem("womenGameOver");
        localStorage.removeItem("womeneWin");
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

export default CountdownTimerWomen;
