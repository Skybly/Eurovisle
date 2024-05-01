import React, { createContext, useState, useEffect } from "react";
import movies from "../data/movies.json";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [movie, setMovie] = useState({});
    const [daysSince, setDaysSince] = useState();

    useEffect(() => {
        const baseDate = new Date('2024-05-01T00:00:00');

        const calculateDaysSince = () => {
            const today = new Date();
            const difference = today - baseDate;
            return Math.floor(difference / (1000 * 60 * 60 * 24));
        };

        const fetchMovieIndex = () => {
            const index = getMovieIndex();
            setMovie(movies[index]);
            console.log(movies[index]);
        };

        const updateDaily = () => {
            fetchMovieIndex();
            setDaysSince(calculateDaysSince());
        };

        updateDaily();

        const midnightTime = getMidnightTime();
        const timeUntilMidnight = midnightTime - Date.now();
        const timeoutId = setTimeout(() => {
            updateDaily();
            const intervalId = setInterval(updateDaily, 24 * 60 * 60 * 1000);
            return () => clearInterval(intervalId);
        }, timeUntilMidnight);

        return () => clearTimeout(timeoutId);
    }, []);

    const getMovieIndex = () => {
        const today = new Date();
        let numericValue = today.getFullYear() * 5893 + (today.getMonth() + 1) * 241 + today.getDate();
        while (numericValue > 999) {
            numericValue -= 1000;
        }
        return numericValue;
    };

    const getMidnightTime = () => {
        const today = new Date();
        const midnight = new Date(today);
        midnight.setHours(24, 0, 0, 0);
        return midnight.getTime();
    };

    return (
        <GameContext.Provider value={{ movie, daysSince }}>
            {children}
        </GameContext.Provider>
    );
};

export default GameContext;
