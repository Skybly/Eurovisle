import Guess from "../components/Guess";

export default function Home() {

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
            <Guess guess = {dummyData}/>
        </div>
    );
}
