import { useState, useEffect } from "react";
import Guess from "../components/Guess";
import { AutoComplete, message, ConfigProvider } from "antd";
import films from "../data/movies.json";

export default function Home() {
    const [inputValue, setInputValue] = useState("");
    const [filmsFromStorage, setFilmsFromStorage] = useState([]);
    const filterOption = (input, option) =>
        (option?.value ?? "").toLowerCase().startsWith(input.toLowerCase());

    useEffect(() => {
        const storedFilms = JSON.parse(localStorage.getItem("films") || "[]");
        setFilmsFromStorage(storedFilms);
    }, []);

    const handleSelect = (value) => {
        const selectedFilm = films.find((film) => film.Film_title === value);
        saveToLocal(selectedFilm);
        console.log(filmsFromStorage);
        setInputValue("");
    };

    const saveToLocal = (selectedFilm) => {
        const storedFilms = JSON.parse(localStorage.getItem("films") || "[]");
        if (!storedFilms.some(film => film.Film_title === selectedFilm.Film_title)) {
            const updatedFilms = [selectedFilm, ...storedFilms];
            localStorage.setItem("films", JSON.stringify(updatedFilms));
            setFilmsFromStorage(updatedFilms);
            message.success("Film added to local storage.");
        } else {
            message.error("Film already exists in local storage.");
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            const film = films.find(
                (film) =>
                    film.Film_title.toLowerCase() === inputValue.toLowerCase()
            );
            if (!film) {
                message.error("Film not in top 1000!");
            }
            setInputValue("");
        }
    };

    const filmTitles = films.map((film) => ({ value: film.Film_title }));

    const dummyData = {
        Film_title: "Barbie",
        Release_year: 2023,
        Director: "Greta Gerwig",
        Cast: "Margot Robbie",
        Average_rating: 3.9,
        Genres: "Comedy",
        Countries: "UK",
        Original_language: "English",
    };

    return (
        <div className="flex flex-col items-center h-screen pt-10 justify-end gap-y-1">
            <div>
                <ConfigProvider
                    theme={{
                        token: {
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
                        components: {
                            Select: {
                                optionActiveBg: "#030016",
                                fontFamily: "Montserrat",
                                optionFontSize: 16,
                            },
                        },
                    }}
                >
                    {" "}
                    <AutoComplete
                        options={filmTitles}
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
                </ConfigProvider>
            </div>
            <div className="pt-8 flex flex-col gap-y-10 overflow-y-scroll h-[90vh] pb-28 w-full items-center">
                {filmsFromStorage.map((film) => (
                    <Guess key={film.Film_title} guess={film} />
                ))}
            </div>
        </div>
    );
}
