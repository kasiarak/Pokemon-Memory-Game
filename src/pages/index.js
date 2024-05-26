import styles from '../styles/Home.module.css'
import MemoryGame from '../components/MemoryGame/MemoryGame';
import Head from 'next/head';
function App() {
  return(
    <>
    <Head>
      <title>Pokemon Memory Game</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </Head>
    <h1 id = {styles.heading}>P<span id ={styles.pokeball} alt = "O"></span>KEMON MEMORY GAME</h1>
    <MemoryGame/>
    </>
  );
}
export default App
