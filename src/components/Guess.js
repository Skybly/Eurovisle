import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

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
    const guessedYearHigher =
        guessYear !== correctYear ? guessYear > correctYear : null;
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
    const guessedRatingHigher =
        guessRating !== correctRating ? guessRating > correctRating : null;
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

    return (
        <div className="flex flex-col gap-y-1 items-center w-72">
            <div className="text-3xl text-primary-text font-montserrat text-center font-bold">
                {guessTitle}
            </div>
            <div className="text-primary-innertext flex w-full justify-center gap-x-2">
                <div
                    className="p-2 rounded-sm w-28"
                    style={{
                        background: yearRequired,
                    }}
                >
                    <div className="text-lg font-montserrat font-semibold text-center">
                        Year
                    </div>
                    <div className="text-xl font-poppins font-semibold text-center flex items-center justify-center gap-x-1">
                        {guessYear}
                        {guessedYearHigher !== null &&
                            (guessedYearHigher ? (
                                <ArrowDownOutlined />
                            ) : (
                                <ArrowUpOutlined />
                            ))}
                    </div>
                </div>
                <div
                    className="p-2 rounded-sm w-28"
                    style={{
                        background: ratingRequired,
                    }}
                >
                    <div className="text-lg font-montserrat font-semibold text-center">
                        Rating
                    </div>
                    <div className="text-xl font-poppins font-semibold text-center flex items-center justify-center gap-x-1">
                        {guessRating}
                        {guessedRatingHigher !== null &&
                            (guessedRatingHigher ? (
                                <ArrowDownOutlined />
                            ) : (
                                <ArrowUpOutlined />
                            ))}
                    </div>
                </div>
            </div>
            <div className="flex text-primary-innertext justify-center gap-x-2">
                <div
                    className="p-2 rounded-sm w-28"
                    style={{
                        background: genreCorrect ? "#418243" : "#29282B",
                    }}
                >
                    <div className="text-lg font-montserrat font-semibold text-center">
                        Genre
                    </div>
                    <div className="text-xl font-poppins font-semibold text-center">
                        {guessGenre}
                    </div>
                </div>
                <div
                    className="p-2 rounded-sm w-28"
                    style={{
                        background: languageCorrect ? "#418243" : "#29282B",
                    }}
                >
                    <div className="text-lg font-montserrat font-semibold text-center">
                        Language
                    </div>
                    <div className="text-xl font-poppins font-semibold text-center">
                        {guessLanguage}
                    </div>
                </div>
            </div>

            <div className="flex gap-x-1 text-primary-innertext">
                <div
                    className="p-2 rounded-sm min-w-32"
                    style={{
                        background: countryCorrect ? "#418243" : "#29282B",
                    }}
                >
                    <div className="text-lg font-montserrat font-semibold text-center">
                        Country
                    </div>
                    <div className="text-xl font-poppins font-semibold text-center">
                        {guessCountry}
                    </div>
                </div>
            </div>
            <div className="flex gap-x-1 text-primary-innertext">
                <div
                    className="p-2 rounded-sm min-w-32"
                    style={{
                        background: directorCorrect ? "#418243" : "#29282B",
                    }}
                >
                    <div className="text-lg font-montserrat font-semibold text-center">
                        Director
                    </div>
                    <div className="text-xl font-poppins font-semibold text-center">
                        {guessDirector}
                    </div>
                </div>
            </div>
            <div className="flex gap-x-1 text-primary-innertext">
                <div
                    className="p-2 rounded-sm min-w-32"
                    style={{
                        background: castCorrect ? "#418243" : "#29282B",
                    }}
                >
                    <div className="text-lg font-montserrat font-semibold text-center">
                        Lead
                    </div>
                    <div className="text-xl font-poppins font-semibold text-center">
                        {guessCast}
                    </div>
                </div>
            </div>
        </div>
    );
}
