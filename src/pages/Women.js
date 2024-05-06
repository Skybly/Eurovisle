import React, { useState, useEffect, useRef, useContext } from "react";
import GuessWomen from "../components/GuessWomen";
import { AutoComplete, message, ConfigProvider, Modal } from "antd";
import films from "../data/women.json";
import CountdownTimerWomen from "../components/CountdownTimerWomen";
import GameContext from "../context/GameContext";
import { QuestionCircleOutlined, CloseOutlined } from "@ant-design/icons";
import Footer from "../components/Footer";
import SideMenu from "../components/SideMenu";

export default function Women() {
    const { womenMovie } = useContext(GameContext);
    const { daysSince } = useContext(GameContext);
    const wrongEmoji = "⬜️";
    const correctEmoji = "🟩";
    const [inputValue, setInputValue] = useState("");
    const [filmsFromStorage, setFilmsFromStorage] = useState([]);
    const selectFlag = useRef(false);
    const [gameOver, setGameOver] = useState(
        JSON.parse(localStorage.getItem("womenGameOver") || "false")
    );
    const [win, setWin] = useState(
        JSON.parse(localStorage.getItem("womenWin") || "false")
    );
    const [open, setOpen] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);
    const customCloseIcon = () => (
        <CloseOutlined style={{ color: "aliceblue" }} />
    );

    useEffect(() => {
        const lastVisitDate = localStorage.getItem("womenLastVisitDate");
        const today = new Date().toDateString();
        if (gameOver && lastVisitDate === today) {
            setOpen(true);
        }
        if (lastVisitDate !== today) {
            localStorage.removeItem("womenFilms");
            localStorage.removeItem("womenGameOver");
            localStorage.removeItem("womenWin");
            localStorage.setItem("womenLastVisitDate", today);
        }
    }, []);

    useEffect(() => {
        const lastVisitDate = localStorage.getItem("womenLastVisitDate");
        const version = localStorage.getItem("womenVersion");
        if (!lastVisitDate) {
            localStorage.setItem(
                "womenLastVisitDate",
                new Date().toDateString()
            );
        }
        if (!version) {
            localStorage.setItem("womenVersion", "1.2");
        }
    }, []);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const showHelp = () => {
        setHelpOpen(true);
    };
    const handleHelpOk = () => {
        setHelpOpen(false);
    };
    const handleHelpCancel = () => {
        setHelpOpen(false);
    };

    const filterOption = (input, option) =>
        (option?.value ?? "").toLowerCase().includes(input.toLowerCase());

    useEffect(() => {
        const storedFilms = JSON.parse(
            localStorage.getItem("womenFilms") || "[]"
        );
        setFilmsFromStorage(storedFilms);
    }, []);

    const handleSelect = (value) => {
        const selectedFilm = films.find((film) => film.Film_title === value);
        saveToLocal(selectedFilm);
        setInputValue("");
        const storedFilms = JSON.parse(
            localStorage.getItem("womenFilms") || "[]"
        );
        const win = selectedFilm.Film_title === womenMovie.Film_title;
        if (storedFilms.length === 10) {
            if (win) {
                localStorage.setItem("womenWin", JSON.stringify(true));
                setWin(true);
                localStorage.setItem("womenGameOver", JSON.stringify(true));
                setGameOver(true);
                showModal();
            } else {
                localStorage.setItem("womenWin", JSON.stringify(false));
                setWin(false);
                localStorage.setItem("womenGameOver", JSON.stringify(true));
                setGameOver(true);
                showModal();
            }
        } else {
            localStorage.setItem("womenWin", JSON.stringify(win));
            if (win) {
                localStorage.setItem("womenGameOver", JSON.stringify(true));
                setWin(win);
                setGameOver(true);
                showModal();
            } else {
                localStorage.setItem("womenGameOver", JSON.stringify(false));
            }
        }
        selectFlag.current = true;
    };

    const resultCopy = () => {
        let result = "Cinephidle Women #" + daysSince + " 🙍‍♀️\n\n";
        const guesses = filmsFromStorage.length - 1;
        for (let i = 0; i < guesses; i++) {
            result = result + wrongEmoji;
        }
        if (win) {
            result = result + correctEmoji;
        } else {
            result = result + wrongEmoji;
        }
        result = result + "\n\ncinephidle.vercel.app/women";
        navigator.clipboard
            .writeText(result)
            .then(() => {
                message.success("Result copied to clipboard!");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const saveToLocal = (selectedFilm) => {
        const storedFilms = JSON.parse(
            localStorage.getItem("womenFilms") || "[]"
        );
        if (
            !storedFilms.some(
                (film) => film.Film_title === selectedFilm.Film_title
            )
        ) {
            const updatedFilms = [selectedFilm, ...storedFilms];
            localStorage.setItem("womenFilms", JSON.stringify(updatedFilms));
            setFilmsFromStorage(updatedFilms);
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
                message.error("Film not in top 100 directed by women!");
            }
            setInputValue("");
            selectFlag.current = false;
        }
    };
    const filmTitles = films.map((film) => ({ value: film.Film_title }));

    return (
        <div className="flex flex-col items-center h-screen justify-end gap-y-1v pt-5">
            <div
                style={{
                    position: "absolute",
                    zIndex: "99",
                    top: "0",
                    left: "0",
                }}
            >
                <SideMenu page={"women"} />
            </div>
            <div className="h-20 flex flex-col items-center justify-center">
                <img
                    src="/static/images/NameWomen.svg"
                    alt="name"
                    style={{ height: "300px"}}
                ></img>
            </div>
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
                <div>
                    {" "}
                    <div className="font-poppins flex justify-between px-1 mb-1">
                        <div>
                            <QuestionCircleOutlined
                                className="text-primary-gray transition-colors duration-200 hover:cursor-pointer hover:text-primary-text"
                                onClick={showHelp}
                            />
                        </div>
                        <div className="text-primary-text brightness-50">
                            {filmsFromStorage.length}/10
                        </div>
                    </div>
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
                    {/* <CountdownTimer />
                    <Button type="primary" onClick={showModal}>
                        Open Modal
                    </Button> */}
                    {filmsFromStorage.map((film) => (
                        <GuessWomen key={film.Film_title} guess={film} />
                    ))}
                </div>
                <Modal
                    open={open}
                    onOk={handleOk}
                    closeIcon={customCloseIcon()}
                    onCancel={handleCancel}
                    footer={() => (
                        <>
                            <button
                                onClick={resultCopy}
                                style={{ backgroundColor: "#000000" }}
                                className="text-primary-text font-semibold hover:text-primary-innertext py-2 px-5 rounded-md mt-5"
                            >
                                Share Result
                            </button>
                        </>
                    )}
                >
                    <div className="text-2xl text-center text-primary-text font-semibold mt-5">
                        {win
                            ? "Congratulations! You've guessed today's directed by women film!"
                            : "Sorry, better luck next time!"}
                    </div>
                    <div className="text-lg text-center text-primary-text font-semibold mt-10">
                        Today's directed by women film is{" "}
                        <span className="text-primary-partial">
                            {womenMovie.Film_title}!
                        </span>
                    </div>
                    <div className="text-lg text-center text-primary-text font-semibold mt-14">
                        Next Cinephidle Women round starts in
                    </div>
                    <div className="text-lg text-center text-primary-text font-semibold">
                        <CountdownTimerWomen />
                    </div>
                </Modal>

                <Modal
                    open={helpOpen}
                    closeIcon={customCloseIcon()}
                    onOk={handleHelpOk}
                    onCancel={handleHelpCancel}
                    footer={null}
                >
                    <div className="text-3xl text-center text-primary-text font-bold mt-5 font-montserrat">
                        How to play
                    </div>
                    <div className="text-lg text-center text-primary-text font-semibold mt-8 font-poppins">
                        Cinephidle Women is based on the top 100 most popular
                        films directed by women on{" "}
                        <span style={{ color: "#ff6188" }}>Letterboxd</span> as
                        of 2019.
                    </div>
                    <div className="text-lg text-center text-primary-text font-semibold mt-8 font-poppins">
                        You get 10 tries to guess the correct directed by women film.
                    </div>
                    <div className="text-lg text-center text-primary-text font-semibold mt-8 font-poppins">
                        Each guess reveals information about the the film you
                        have to identify.
                    </div>
                    <div className="text-lg text-center text-primary-text font-semibold mt-8 font-poppins">
                        If a cell is{" "}
                        <span style={{ color: "#32a852" }}>green</span>, it
                        means that attribute matches to that of the film you
                        have to identify.
                    </div>
                    <div className="text-lg text-center text-primary-text font-semibold mt-8 font-poppins">
                        If the cell containing the year is{" "}
                        <span style={{ color: "#e3c56d" }}>yellow</span>, it
                        means you are within five years of the target. Arrow
                        pointing up means you have to go forward in time, arrow
                        pointing down means you have to go back.
                    </div>
                    <div className="text-lg text-center text-primary-text font-semibold mt-8 font-poppins">
                        If the cell containing the rating is{" "}
                        <span style={{ color: "#e3c56d" }}>yellow</span>, it
                        means you are within 0.5 of the target. Arrow pointing
                        up means you have to go higher, arrow pointing down
                        means you have to go lower.
                    </div>
                    <div className="text-lg text-center text-primary-text font-semibold mt-8 font-poppins">
                        The game resets everyday at 12 AM.
                    </div>
                    <div className="text-lg text-center text-primary-text font-semibold mt-8 font-poppins">
                        Good luck!
                    </div>
                </Modal>
            </ConfigProvider>
            <Footer />
        </div>
    );
}
