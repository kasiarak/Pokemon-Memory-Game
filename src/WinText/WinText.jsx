import './WinText.css';
function WinText(){
    return(
        <>
            <h2 id="winText">YOU WIN!</h2>
            <button id="winBtn" onClick={() => window.location.reload()}>NEW GAME</button>
        </>
    );
}
export default WinText;