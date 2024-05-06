import './Card.css' 
import { clickedCards } from '../MemoryGame/MemoryGame';
function Card(props){
    
    function flip(e){
        const box = e.target.parentNode; 
        clickedCards.push(box);
        box.style.transform= "rotateY(180deg)";
        if(clickedCards.length === 2){
            const cards = document.querySelectorAll(".card");
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
        <div className = "card">
            <div onClick={(e) => flip(e)} className = "front">?</div>
            <div className = "back"><img className="pokemonImg" src={props.src} alt={props.name} checkcards={props.checkCards}></img></div>
        </div>
    );
}
export default Card