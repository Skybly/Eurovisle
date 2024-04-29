import { useState } from "react";
import Guess from "../components/Guess";
import { AutoComplete, message } from "antd";
import films from "../data/movies.json";

const filterOption = (input, option) =>
    (option?.value ?? "").toLowerCase().startsWith(input.toLowerCase());

const onSelect = (data) => {
    console.log("onSelect", data);
};

export default function Home() {
    const [inputValue, setInputValue] = useState("");

    const handleSelect = (value) => {
        const selectedFilm = films.find(film => film.Film_title === value);
        message.success('Film found')
        setInputValue('');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            const film = films.find(film => film.Film_title.toLowerCase() === inputValue.toLowerCase());
            if (!film) {
                message.error('Film not found')
            }
            setInputValue('');
        }
    };

    const filmTitles = films.map(film => ({ value: film.Film_title }));

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
        <AutoComplete
            options={filmTitles}
            style={{ width: 200 }}
            onSelect={handleSelect}
            placeholder="Type here"
            value={inputValue}
            onChange={setInputValue}
            onKeyDown={handleKeyPress}
            filterOption={filterOption}
        />
            <Guess guess={dummyData} />
        </div>
    );
}
