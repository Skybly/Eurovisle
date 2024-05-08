# Cinephidle

Welcome to Cinephidle, a game influenced by the concept of [Wordle](https://www.nytimes.com/games/wordle/index.html), tailored for film enthusiasts. This game challenges players to guess popular films based on minimal clues, with a focus on the top 150 most popular films as listed on [Letterboxd](https://letterboxd.com/mattheuswc/list/top-1000-popular-films/). The game is inspired from a similar game based on music artists called [Spotle](https://spotle.io).

You can play Cinephidle [here](https://cinephidle.vercel.app).

<br>

## What I Used

| Tools      | Version |
|------------|---------|
| React      | 18.2.0  |
| Ant Design | 5.16.2  |
| Tailwind CSS   | 3.4.3   |
| Vercel     | -   |

<br>

## How to Play

Each day, a new film from the top 150 popular films on Letterboxd is picked as the puzzle of the day. Players are given fifteen attempts to guess the correct film. Clues provided include the year of release, genre, director, country the film is from, the name of the director, the name of the lead actor, average Letterboxd rating and the original language of the film. Each incorrect guess provides additional hints to help narrow down the possibilities.

<br>

# Features

* The game resets everyday at 12 AM.
* The game is fully responsive, can be played on any device.
* Horror mode, where you have to guess a movie out of the [top 100 most popular horror](https://letterboxd.com/believememaizey/list/100-most-popular-horror-movies-on-letterboxd/) films on Letterboxd.
* Romance mode, where you have to guess a movie out of the [top 100 most popular romance](https://letterboxd.com/wordsandcolors/list/top-100-romance-films-on-letterboxd-as-of/) films on Letterboxd.
* Science Fiction Mode, where you have to guess a movie out of the [top 150 most popular science fiction](https://letterboxd.com/chris_coke/list/letterboxds-top-250-science-fiction-films/) films on Letterboxd.
* Women mode, where you have to guess a movie out of the [top 100 movies directed by women](https://letterboxd.com/wampeter57/list/100-most-popular-entries-on-letterboxd-directed/) on Letterboxd.

<br>

## Installation

This is if you want to run Cinephidle locally on your machine.


### Prerequisites
Before installing Cinephidle, ensure you have the following installed:
* [Node.js](https://nodejs.org/en/download)
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Cloning the Repository
Open your terminal and run the following command to clone the repository:

```bash
git clone https://github.com/saadpocalypse/Cinephidle.git
```

### Setting Up the Project
Navigate into the project directory with:
```bash
cd Cinephidle
```
Then install all the required dependancies with:
```bash
npm install
```

### Running the Game
Once setup is complete, you can start the game locally with:
```bash
npm start
```

### Accessing the Game
After starting the server, open your web browser and navigate to:

http://localhost:3000

Replace 3000 with the actual port number where your project is running.

<br>

## How to Contribute
I appreciate any and all contributions to Cinephidle. Here's how you can do it:

### 1. Fork the Repository: 
Start by forking the Cinephidle repository to your GitHub account.
### 2. Clone Your Fork: 
Clone your forked repository to your local machine.
### 3. Create a Branch: 
Create a branch for your new feature or bug fix.
### 4. Make Your Changes: 
Implement your feature or fix that bug.
### 5. Commit Changes: 
Commit your changes with a clear, concise commit message.
### 6. Push to GitHub: 
Push your changes to your fork on GitHub.
### 7. Submit a Pull Request: 
Open a pull request from your fork to the main Cinephidle repository.
### 8. Wait: 
Wait for me to review the changes and merge them if needed.

<br>

## License

Cinephidle is open-source software licensed under the GNU Affero General Public License v3.0. See the [LICENSE](https://github.com/saadpocalypse/Cinephidle/blob/main/LICENSE) file for more details. I chose the GNU Affero General Public License v3.0 for Cinephidle because it requires anyone who modifies and redistributes it, especially in a networked environment, to also make their source code available under the same license, thus ensuring the game remains open source and free from ads, just like Cinephidle is.

<br>

## Disclaimer
**This project is for educational purposes only and is not a collaboration with any official film database or quiz platform. It is in no way affiliated with or endorsed by Wordle, Letterboxd or Spotle.**
