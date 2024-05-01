import React, { useState, useEffect, useRef, useContext } from "react";
import Guess from "../components/Guess";
import { AutoComplete, message, ConfigProvider, Modal, Button } from "antd";
import films from "../data/movies.json";
import CountdownTimer from "../components/CountdownTimer";
import GameContext from "../context/GameContext";

export default function Home() {
    const { movie } = useContext(GameContext);
    const { daysSince } = useContext(GameContext);
    const wrongEmoji = "⬜️";
    const correctEmoji = "🟩";
    const [inputValue, setInputValue] = useState("");
    const [filmsFromStorage, setFilmsFromStorage] = useState([]);
    const selectFlag = useRef(false);
    const [gameOver, setGameOver] = useState(JSON.parse(localStorage.getItem("gameOver") || "false"));
    const [win, setWin] = useState(JSON.parse(localStorage.getItem("win") || "false"));
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (gameOver) {
            setOpen(true);
        }
    }, [])

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const filterOption = (input, option) =>
        (option?.value ?? "").toLowerCase().includes(input.toLowerCase());

    useEffect(() => {
        const storedFilms = JSON.parse(localStorage.getItem("films") || "[]");
        setFilmsFromStorage(storedFilms);
    }, []);

    const handleSelect = (value) => {
        const selectedFilm = films.find((film) => film.Film_title === value);
        saveToLocal(selectedFilm);
        setInputValue("");
        const storedFilms = JSON.parse(localStorage.getItem("films") || "[]");
        const win = selectedFilm.Film_title === movie.Film_title;
        if (storedFilms.length === 10) {
            if (win) {
                localStorage.setItem("win", JSON.stringify(true));
                setWin(true);
                localStorage.setItem("gameOver", JSON.stringify(true));
                setGameOver(true);
                showModal();
                message.success("Correct guess on the 10th turn! Game over!");
            } else {
                localStorage.setItem("win", JSON.stringify(false));
                setWin(false);
                localStorage.setItem("gameOver", JSON.stringify(true));
                setGameOver(true);
                showModal();
                message.error("Game over! You've reached 10 turns without a correct final guess.");
            }
        } else {
            localStorage.setItem("win", JSON.stringify(win));
            if (win) {
                localStorage.setItem("gameOver", JSON.stringify(true));
                setWin(win);
                setGameOver(true);
                showModal();
            }
            else{
                localStorage.setItem("gameOver", JSON.stringify(false));
            }
        }
        selectFlag.current = true;
        if (!win && storedFilms.length < 10) {
            message.error("Wrong guess! Try again!");
        }
    };

    const resultCopy = () => {
        let result = "Cinephidle #" +  daysSince  + " 🎬\n\n";
        message.success("Result copied to clipboard!");
        const guesses = filmsFromStorage.length - 1;
        for (let i = 0; i < guesses; i++) {
            result = result + wrongEmoji;
        }
        if (win){
            result = result + correctEmoji;
        }
        else{
            result = result + wrongEmoji;
        }
        result = result + "\n\nCinephidle.com"
        console.log(result);
    };

    const saveToLocal = (selectedFilm) => {
        const storedFilms = JSON.parse(localStorage.getItem("films") || "[]");
        if (
            !storedFilms.some(
                (film) => film.Film_title === selectedFilm.Film_title
            )
        ) {
            const updatedFilms = [selectedFilm, ...storedFilms];
            localStorage.setItem("films", JSON.stringify(updatedFilms));
            setFilmsFromStorage(updatedFilms);
            message.success("Guess entered!");
        } else {
            message.error("Film already guessed!");
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            const film = films.find(
                (film) =>
                    film.Film_title.toLowerCase() === inputValue.toLowerCase()
            );
            if (!film && !selectFlag.current) {
                message.error("Film not in top 1000!");
            }
            setInputValue("");
            selectFlag.current = false;
        }
    };
    const filmTitles = films.map((film) => ({ value: film.Film_title }));

    return (
        <div className="flex flex-col items-center h-screen pt-10 justify-end gap-y-1">
            <ConfigProvider
                theme={{
                    components: {
                        Select: {
                            optionActiveBg: "#030016",
                            fontFamily: "Montserrat",
                            optionFontSize: 16,
                            colorBgContainer: "transparent",
                            colorText: "#E4FAFB",
                            controlOutline: "none",
                            colorBorder: "#8f9d9e",
                            colorPrimaryHover: "#E4FAFB",
                            colorPrimary: "#E4FAFB",
                            colorTextPlaceholder: "#8f9d9e",
                            selectorBg: "#000000",
                            colorBgElevated: "#353535f0",
                        },
                        Modal: {
                            fontFamily: "Montserrat",
                            colorBgElevated: "#353535fa",
                        },
                    },
                }}
            >
                <CountdownTimer />
                <Button type="primary" onClick={showModal}>
                    Open Modal
                </Button>
                <div>
                    {" "}
                    <AutoComplete
                        options={filmTitles}
                        disabled={gameOver}
                        style={{ width: 280, color: "#ff6188 !important" }}
                        onSelect={handleSelect}
                        placeholder="Enter film title"
                        value={inputValue}
                        onChange={setInputValue}
                        onKeyDown={handleKeyPress}
                        filterOption={filterOption}
                        size="large"
                        className="my-auto-complete text-primary-text font-montserrat text-2xl font-semibold"
                    />
                </div>
                <div className="pt-8 flex flex-col gap-y-10 overflow-y-scroll h-[90vh] pb-28 w-full items-center">
                    {filmsFromStorage.map((film) => (
                        <Guess key={film.Film_title} guess={film} />
                    ))}
                </div>
                <Modal
                    open={open}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={() => (
                        <>
                            <button
                                onClick={resultCopy}
                                style={{ backgroundColor: "#000000" }}
                                className="text-primary-text font-semibold hover:text-primary-innertext py-2 px-5 rounded-md"
                            >
                                Share Result
                            </button>
                        </>
                    )}
                >
                    <div className="text-2xl text-center text-primary-text font-semibold mt-5">
                        {win ? "Congratulations! You've guessed the film!" : "Sorry, better luck next time!"}
                    </div>
                    <div className="text-lg text-center text-primary-text font-semibold mt-10">
                        Today's film is{" "}
                        <span className="text-primary-partial">
                            {movie.Film_title}!
                        </span>
                    </div>
                    <div className="text-lg text-center text-primary-text font-semibold mt-14">
                        Next Cinephidle round starts in
                    </div>
                    <div className="text-lg text-center text-primary-text font-semibold">
                        <CountdownTimer />
                    </div>
                </Modal>
            </ConfigProvider>
        </div>
    );
}
