import styles from './MemoryGame.module.css'
import Card from '../Card/Card'
import { useEffect, useState } from 'react';
export let clickedCards = [];
import WinText from '../WinText/WinText'

function MemoryGame(){
    let pokemonIds = []; 
    let [counter, setCounter] = useState(0); 
    let [pokemonSrc, setPokemonSrc] = useState([]); 
    let [pokemonNames, setPokemonNames] = useState([]);
    async function setImages(){
        let tempPokemonSrc = [];
        let tempPokemonNames = [];
        for(let i = 0; i < 16; i++){
            let index = Math.floor(Math.random()*pokemonIds.length); 
            let pokemonId = pokemonIds[index];
            pokemonIds.splice(index,1);
            fetchPokemonData(pokemonId, tempPokemonSrc, tempPokemonNames);
        }
    }
    async function fetchPokemonData(pokemonId, tempPokemonSrc, tempPokemonNames){
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            if(!response.ok){
                throw new Error("Could not fetch resource");
            }
            const data = await response.json();
            tempPokemonSrc.push(data.sprites.front_default);
            tempPokemonNames.push(data.name);
            if(tempPokemonSrc.length === 16 && tempPokemonNames.length === 16){
                setPokemonSrc(tempPokemonSrc);
                setPokemonNames(tempPokemonNames);
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        while(pokemonIds.length<16){
            let id = Math.floor(1+Math.random()*649);
            if(pokemonIds.indexOf(id) === -1){
                pokemonIds.push(id);
                pokemonIds.push(id); 
            }
        }
        setImages();
    },[]);
    const cards = [];
    if(pokemonSrc.length === 16 && pokemonNames.length === 16){
        for(let i = 0; i < 16; i++){
            cards.push(<Card src={pokemonSrc[i]} name={pokemonNames[i]} key={i} checkcards={checkCards}/>); 
        }
    }
    function checkCards(){
        if(clickedCards[0].querySelector("img").src !== clickedCards[1].querySelector("img").src || clickedCards[0] === clickedCards[1]){
            clickedCards[0].style.transform = "rotateY(0)"; 
            clickedCards[1].style.transform = "rotateY(0)";
        }else{
            setCounter(c => c+1);
        }
        clickedCards = []; 
    }
    return(
        <>
        {counter === 8 ? <WinText/> : null}
        <div id={styles.memoryContainer}>
            {cards}
        </div>
         
        </>
        
    );
}
export default MemoryGame