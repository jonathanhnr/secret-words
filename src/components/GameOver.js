import './GameOver.css'
const GameOver = ({retry,score})=>{
    return (
        <div>
            <h1>
                gameOver
            </h1>
            <h2>A sua pontuacao foi <span>{score}</span></h2>
            <button onClick={retry}>jogar novamente</button>
        </div>
    )
}
export default GameOver;