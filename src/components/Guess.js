export default function Guess({ guess }) {
    const {
        Film_title: guessTitle,
        Release_year: guessYear,
        Director: guessDirector,
        Cast: guessCast,
        Average_rating: guessRating,
        Genres: guessGenre,
        Countries: guessCountry,
        Original_language: guessLanguage,
    } = guess;

    const actualAnswer = {
        Film_title: "Parasite",
        Release_year: 2019,
        Director: "Bong Joon-ho",
        Cast: "Song Kang-ho",
        Average_rating: 4.6,
        Genres: "Comedy",
        Countries: "South Korea",
        Original_language: "Korean",
    };

    const {
        Film_title: correctTitle,
        Release_year: correctYear,
        Director: correctDirector,
        Cast: correctCast,
        Average_rating: correctRating,
        Genres: correctGenres,
        Countries: correctCountries,
        Original_language: correctLanguage,
    } = actualAnswer;

    const titleCorrect = guessTitle === correctTitle;
    const directorCorrect = guessDirector === correctDirector;
    const castCorrect = guessCast === correctCast;
    const genreCorrect = guessGenre === correctGenres;
    const countryCorrect = guessCountry === correctCountries;
    const languageCorrect = guessLanguage === correctLanguage;
    const yearDiff = Math.abs(guessYear - correctYear);
    const yearRequired =
        guessYear > correctYear
            ? yearDiff <= 5
                ? "#B89737"
                : "#29282B"
            : guessYear < correctYear
            ? yearDiff <= 5
                ? "#B89737"
                : "#29282B"
            : "#418243";

    const ratingDiff = Math.abs(guessRating - correctRating);
    const ratingRequired =
        guessRating > correctRating
            ? ratingDiff <= 0.5
                ? "#B89737"
                : "#29282B"
            : guessRating < correctRating
            ? ratingDiff <= 0.5
                ? "#B89737"
                : "#29282B"
            : "#418243";

    console.log(yearRequired);

    return (
        <div className="flex flex-col gap-y-1">
            <div className="text-2xl text-primary-text">{guessTitle}</div>
            <div style={{ color: "white", display: "flex", columnGap: "5px" }}>
                <div
                    style={{
                        background: yearRequired,
                    }}
                >
                    <div>Year</div>
                    <div>{guessYear}</div>
                </div>
                <div
                    style={{
                        background: ratingRequired,
                    }}
                >
                    <div>Rating</div>
                    <div>{guessRating}</div>
                </div>
            </div>
            <div className="flex gap-x-1">
                <div
                    style={{
                        background: genreCorrect ? "#418243" : "#29282B",
                    }}
                >
                    <div>Genre</div>
                    <div>{guessGenre}</div>
                </div>
                <div
                    style={{
                        background: languageCorrect ? "#418243" : "#29282B",
                    }}
                >
                    <div>Language</div>
                    <div>{guessLanguage}</div>
                </div>
            </div>

            <div className="flex gap-x-1">
                <div
                    style={{
                        background: countryCorrect ? "#418243" : "#29282B",
                    }}
                >
                    <div>Country</div>
                    <div>{guessCountry}</div>
                </div>
            </div>
            <div className="flex gap-x-1">
                <div
                    style={{
                        background: directorCorrect ? "#418243" : "#29282B",
                    }}
                >
                    <div>Director</div>
                    <div>{guessDirector}</div>
                </div>
            </div>
            <div className="flex gap-x-1">
                <div
                    style={{
                        background: castCorrect ? "#418243" : "#29282B",
                    }}
                >
                    <div>Lead</div>
                    <div>{guessCast}</div>
                </div>
            </div>
        </div>
    );
}
