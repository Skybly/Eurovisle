import React, { createContext, useState, useEffect } from "react";
import movies from "../data/1000movies.json";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [movie, setMovie] = useState({});
    const [daysSince, setDaysSince] = useState();
    const a = 48271;
    const c = 21;
    const today = new Date();

    useEffect(() => {
        const baseDate = new Date('2024-05-02T00:00:00');

        const calculateDaysSince = () => {
            const today = new Date();
            const difference = today - baseDate;
            return Math.floor(difference / (1000 * 60 * 60 * 24));
        };

        const fetchMovieIndex = () => {
            const index = getMovieIndex();
            setMovie(movies[index]);
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
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        const m = 150;
        let numericValue = (a * seed + c) % m;
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
