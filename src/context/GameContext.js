import React, { createContext, useState, useEffect } from "react";
import movies from "../data/movies.json";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [movie, setMovie] = useState({});

    useEffect(() => {
        const fetchMovieIndex = () => {
            const index = getMovieIndex();
            setMovie(movies[index]);
            console.log(movies[index]);
        };
        fetchMovieIndex();

        const midnightTime = getMidnightTime();
        const timeUntilMidnight = midnightTime - Date.now();
        const timeoutId = setTimeout(() => {
            fetchMovieIndex();
            const intervalId = setInterval(fetchMovieIndex, 24 * 60 * 60 * 1000);
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
        <GameContext.Provider value={{ movie }}>
            {children}
        </GameContext.Provider>
    );
};

export default GameContext;
