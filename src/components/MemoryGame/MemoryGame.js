import styles from './MemoryGame.module.css';
import Card from '../Card/Card';
import { useEffect, useState } from 'react';
import WinText from '../WinText/WinText';

export let clickedCards = [];

function MemoryGame() {
    const [counter, setCounter] = useState(0);
    const [pokemonData, setPokemonData] = useState([]);
    
    useEffect(() => {
        async function fetchPokemonData(pokemonIds) {
            const fetchPromises = pokemonIds.map(async (pokemonId) => {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                    if (!response.ok) {
                        throw new Error("Could not fetch resource");
                    }
                    const data = await response.json();
                    return { src: data.sprites.front_default, name: data.name };
                } catch (error) {
                    console.error(error);
                    return null;
                }
            });
            const results = await Promise.all(fetchPromises);
            return results.filter(item => item !== null);
        }

        function getRandomPokemonIds() {
            const ids = new Set();
            while (ids.size < 8) {
                ids.add(Math.floor(1 + Math.random() * 649));
            }
            const doubledIds = [...ids, ...ids]; // duplicate the ids
            return doubledIds.sort(() => Math.random() - 0.5); // shuffle
        }

        async function setImages() {
            const pokemonIds = getRandomPokemonIds();
            const pokemonData = await fetchPokemonData(pokemonIds);
            setPokemonData(pokemonData);
        }

        setImages();
    }, []);

    const cards = pokemonData.map((data, index) => (
        <Card src={data.src} name={data.name} key={index} checkcards={checkCards} />
    ));

    function checkCards() {
        if (
            clickedCards[0].querySelector("img").src !== clickedCards[1].querySelector("img").src ||
            clickedCards[0] === clickedCards[1]
        ) {
            clickedCards[0].style.transform = "rotateY(0)";
            clickedCards[1].style.transform = "rotateY(0)";
        } else {
            setCounter(c => c + 1);
        }
        clickedCards = [];
    }

    return (
        <>
            {counter === 8 ? <WinText /> : null}
            <div id={styles.memoryContainer}>
                {cards}
            </div>
        </>
    );
}

export default MemoryGame;
