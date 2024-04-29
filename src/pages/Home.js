import { useState } from "react";
import Guess from "../components/Guess";
import { AutoComplete } from "antd";

const options = [
    { value: "Jack" },
    { value: "Lucy" },
    { value: "Tom" },
    { value: "Barbie" },
    { value: "Greta" },
];


const filterOption = (input, option) =>
    (option?.value ?? "").toLowerCase().startsWith(input.toLowerCase());

const onSelect = (data) => {
    console.log("onSelect", data);
};

export default function Home() {
    const [inputValue, setInputValue] = useState("");

const handleSelect = (value) => {
    console.log(`selected ${value}`);
    setInputValue(""); // Clear the input after selection
};

const handleKeyPress = (event) => {
    if (event.key === "Enter") {
        console.log(`Enter pressed, input value: ${inputValue}`);
        setInputValue(""); // Clear the input after pressing Enter
    }
};

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
            options={options}
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
