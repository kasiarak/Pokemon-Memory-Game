import styles from './Card.module.css' 
import { clickedCards } from '../MemoryGame/MemoryGame';

function Card(props){
    
    function flip(e){
        const box = e.target.parentNode; 
        clickedCards.push(box);
        box.style.transform= "rotateY(180deg)";
        if(clickedCards.length === 2){
            const cards = document.querySelectorAll(".memoryCard");
            cards.forEach(card => {
            card.style.pointerEvents = "none";
            });
            setTimeout(props.checkcards,1000);
            setTimeout(() => {
            cards.forEach(card => {
                card.style.pointerEvents = "auto";
            });
            },1000);
        }
    }
    return(
        <div className ={`${styles.card} memoryCard`}>
            <div onClick={(e) => flip(e)} className ={styles.front}>?</div>
            <div className ={styles.back}><img className={styles.pokemonImg} src={props.src} alt={props.name} checkcards={props.checkCards}></img></div>
        </div>
    );
}
export default Card