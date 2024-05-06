import React, { createContext, useState, useEffect } from "react";
import movies from "../data/150movies.json";
import horrorMovies from "../data/horror.json";
import romanceMovies from "../data/romance.json";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [movie, setMovie] = useState({});
    const [horrorMovie, setHorrorMovie] = useState({});
    const [romanceMovie, setRomanceMovie] = useState({});
    const [daysSince, setDaysSince] = useState();

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

        const fetchHorrorMoveIndex = () => {
            const index = getHorrorIndex();
            setHorrorMovie(horrorMovies[index]);
        };

        const fetchRomanceMoveIndex = () => {
            const index = getRomanceIndex();
            setRomanceMovie(romanceMovies[index]);
        };

        const updateDaily = () => {
            fetchMovieIndex();
            fetchHorrorMoveIndex();
            fetchRomanceMoveIndex();
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
        let numericValue = today.getFullYear() * 5803 + (today.getMonth() + 1) * 241 + today.getDate();
        while (numericValue > 149) {
            numericValue -= 150;
        }
        return numericValue;
    };

    const getHorrorIndex = () => {
        const today = new Date();
        let numericValue = today.getFullYear() * 5803 + (today.getMonth() + 1) * 241 + today.getDate();
        while (numericValue > 99) {
            numericValue -= 100;
        }
        return numericValue;
    };

    const getRomanceIndex = () => {
        const today = new Date();
        let numericValue = today.getFullYear() * 5803 + (today.getMonth() + 1) * 241 + today.getDate();
        while (numericValue > 99) {
            numericValue -= 100;
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
        <GameContext.Provider value={{ movie, daysSince, horrorMovie, romanceMovie }}>
            {children}
        </GameContext.Provider>
    );
};

export default GameContext;
