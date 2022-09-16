import './Game.css'
import {useState, useRef} from "react";

const Game = ({
                  verifyLetter, pickedWord, pickedCategory, letters, guesses, guessesLetters, wrongLetters, score
              }) => {

    const [letter, setLetter] = useState("")
    const letterInputRef = useRef(null)

    const handleSubimit = (e)=>{
        e.preventDefault()

        verifyLetter(letter)

        setLetter("")

        letterInputRef.current.focus();
    }

    return (<div className="game">
            <p className="points">
                <span>Pontuaçao: {score}</span>
            </p>
            <h1>Adivinhe a palavra:</h1>
            <h3 className="tip">Dica da palavra : <span>{pickedCategory}</span>
            </h3>
            <p>Voce ainda tem {guesses} tentativas(s). </p>
            <div className="wordContainer">
                {letters.map((letter,i)=>(
                    guessesLetters.includes(letter) ? (
                        <span key={i} className="letter">{letter}</span>
                    ):(
                        <span key={i} className="blankSquare"></span>)
                ))}

            </div>
            <div className="letterContainer">
                <p>tente adivinhar uma letra da palavra:</p>
                <form onSubmit={handleSubimit}>
                    <input type="text" name="letter" maxLength="1" required onChange={(e)=> setLetter(e.target.value)} value={letter} ref={letterInputRef}/>
                    <button>jogar!</button>
                </form>
            </div>
            <div className="wrongLettersContainer">
                <p>letras ja utilizadas</p>
                {wrongLetters.map((letter,i)=>(
                    <span key={i} >{letter},</span>
                ))}
            </div>
        </div>

    )
}
export default Game;