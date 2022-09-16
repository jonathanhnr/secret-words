import './StartScreen.css'
const StartScreen= ({StartGame})=>{
    return(
        <div className="start">
            <h1>Secret Word</h1>
            <p>clique no botao abaixo para jogar</p>
            <button onClick={StartGame}>clique para jogar</button>
        </div>
    )
}
export default StartScreen;