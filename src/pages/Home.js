import { useState } from "react";
import Guess from "../components/Guess";
import { AutoComplete, message, ConfigProvider } from "antd";
import films from "../data/movies.json";

const filterOption = (input, option) =>
    (option?.value ?? "").toLowerCase().startsWith(input.toLowerCase());

const onSelect = (data) => {
    console.log("onSelect", data);
};

export default function Home() {
    const [inputValue, setInputValue] = useState("");

    const handleSelect = (value) => {
        const selectedFilm = films.find((film) => film.Film_title === value);
        message.success("Film found");
        setInputValue("");
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
        <div className="flex flex-col items-center justify-center h-screen">
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
                            optionActiveBg: '#030016',
                            fontFamily: 'Montserrat',
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
                    defaultOpen={true}
                    size="large"
                    className="my-auto-complete text-primary-text font-montserrat text-2xl font-semibold"
                />
            </ConfigProvider>

            <Guess guess={dummyData} />
        </div>
    );
}
