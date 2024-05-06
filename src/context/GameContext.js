import React, { createContext, useState, useEffect } from "react";
import movies from "../data/150movies.json";
import horrorMovies from "../data/horror.json";
import romanceMovies from "../data/romance.json";
import womenMovies from "../data/women.json";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [movie, setMovie] = useState({});
    const [horrorMovie, setHorrorMovie] = useState({});
    const [womenMovie, setWomenMovie] = useState({});
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

        const fetchRomanceMovieIndex = () => {
            const index = getRomanceIndex();
            setRomanceMovie(romanceMovies[index]);
        };

        const fetchWomenMovieIndex = () => {
            const index = getWomenIndex();
            setWomenMovie(womenMovies[index]);
        };

        const updateDaily = () => {
            fetchMovieIndex();
            fetchHorrorMoveIndex();
            fetchRomanceMovieIndex();
            fetchWomenMovieIndex();
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
        const randomNumberOne = Math.floor(Math.random() * 10000) + 1;
        const randomNumberTwo = Math.floor(Math.random() * 10000) + 1;
        let numericValue = today.getFullYear() * randomNumberOne + (today.getMonth() + 1) * randomNumberTwo + today.getDate();
        while (numericValue > 149) {
            numericValue -= 150;
        }
        return numericValue;
    };

    const getHorrorIndex = () => {
        const today = new Date();
        const randomNumberOne = Math.floor(Math.random() * 10000) + 1;
        const randomNumberTwo = Math.floor(Math.random() * 10000) + 1;
        let numericValue = today.getFullYear() * randomNumberOne + (today.getMonth() + 1) * randomNumberTwo + today.getDate();
        while (numericValue > 99) {
            numericValue -= 100;
        }
        return numericValue;
    };

    const getRomanceIndex = () => {
        const today = new Date();
        const randomNumberOne = Math.floor(Math.random() * 10000) + 1;
        const randomNumberTwo = Math.floor(Math.random() * 10000) + 1;
        let numericValue = today.getFullYear() * randomNumberOne + (today.getMonth() + 1) * randomNumberTwo + today.getDate();
        while (numericValue > 99) {
            numericValue -= 100;
        }
        return numericValue;
    };

    const getWomenIndex = () => {
        const today = new Date();
        const randomNumberOne = Math.floor(Math.random() * 10000) + 1;
        const randomNumberTwo = Math.floor(Math.random() * 10000) + 1;
        let numericValue = today.getFullYear() * randomNumberOne + (today.getMonth() + 1) * randomNumberTwo + today.getDate();
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
        <GameContext.Provider value={{ movie, daysSince, horrorMovie, romanceMovie, womenMovie }}>
            {children}
        </GameContext.Provider>
    );
};

export default GameContext;
