import './App.css';

import {useCallback, useEffect, useState} from "react";

//import list of words
import {wordsList} from './data/words'

//components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const Stages = [{id: 1, name: "start"}, {id: 2, name: "game"}, {id: 3, name: "end"},]

const guessesQty = 3

function App() {
    const [gameStage, setGameStage] = useState(Stages[0].name)
    const [words] = useState(wordsList)

    const [pickedWord, setPickedWord] = useState("")
    const [pickedCategory, setPickedCategory] = useState("")
    const [letters, setLetters] = useState([])

    const [guessedLetters, setGuessedLetters] = useState([])
    const [wrongLetters, setWrongLetters] = useState([])
    const [guesses, setGuesses] = useState(guessesQty)
    const [score, setScore] = useState(100)

    const pickWordAndCategory =useCallback( () => {
        const categories = Object.keys(words)

        const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]



        const word = words[category][Math.floor(Math.random() * words[category].length)]



        return {word, category}
    },[words])


    const StartGame = useCallback(() => {
        clearLetterStates()
        const {word, category} = pickWordAndCategory()

        let wordLetters = word.split("");

        wordLetters = wordLetters.map((l) => l.toLowerCase());




        setPickedWord(word)
        setPickedCategory(category)
        setLetters(wordLetters)


        setGameStage(Stages[1].name)
    },[pickWordAndCategory])
    const VerifyLetter = (letter) => {
        const normalizedLetter = letter.toLowerCase()

        if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
            return;
        }
        if (letters.includes(normalizedLetter)) {
            setGuessedLetters((actualGuessesLetters) => [
                ...actualGuessesLetters,
                normalizedLetter
            ])
        } else {
            setWrongLetters((actualWrongLetters) => [
                ...actualWrongLetters,
                normalizedLetter
            ])
            setGuesses((actualGuesses) => actualGuesses - 1)
        }

    }

    const clearLetterStates = () => {
        setGuessedLetters([])
        setWrongLetters([])
    }

    useEffect(() => {
        if (guesses <= 0) {
            clearLetterStates();
            setGameStage(Stages[2].name)
        }
    }, [guesses]);
    useEffect(() => {
        const uniqueLetters =[...new Set(letters)]
        if(guessedLetters.length === uniqueLetters.length){
            setScore((actualScore) => actualScore + 100)
            StartGame()
        }

     

    },[guessedLetters,letters,StartGame])



    const retry = () => {

        setScore(0)
        setGuesses(guessesQty)
        setGameStage(Stages[0].name)
    }

    return (<div className="App">
        {gameStage === "start" && <StartScreen StartGame={StartGame}/>}
        {gameStage === "game" &&
            <Game verifyLetter={VerifyLetter}
                  pickedWord={pickedWord}
                  pickedCategory={pickedCategory}
                  letters={letters}
                  guessesLetters={guessedLetters}
                  wrongLetters={wrongLetters}
                  guesses={guesses}
                  score={score}/>}
        {gameStage === "end" && <GameOver retry={retry} score={score}/>}
    </div>);
}

export default App;
