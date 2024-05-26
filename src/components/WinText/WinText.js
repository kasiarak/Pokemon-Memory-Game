import styles from './WinText.module.css';
function WinText(){
    return(
        <>
            <h2 id={styles.winText}>YOU WIN!</h2>
            <button id={styles.winBtn} onClick={() => window.location.reload()}>NEW GAME</button>
        </>
    );
}
export default WinText;