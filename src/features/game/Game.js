import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CardGrid from './cardGrid/CardGrid'
import { addCard, selectAllCards } from '../game/gameSlice'
import { fetchPokemon, selectPokemon } from '../pokemon/pokemonSlice'
import { v4 as uuidv4 } from 'uuid'
import './Game.scss'

const Game = () => {
  const dispatch = useDispatch();
  const cards = useSelector(selectAllCards);
  const pokemonList = useSelector(selectPokemon);

  useEffect(() => {
    dispatch(fetchPokemon())
  },[])
  
  useEffect(() => {
    const pokemonArr = Object.values(pokemonList)
    const unsuffledDeck = []
    const suffledDeck = unsuffledDeck


    for (const pokemon of pokemonArr) {
      const { name, number, image } = pokemon;

      for (let i = 0; i < 2; i++) {
        unsuffledDeck.push({
          id: uuidv4(),
          name: name,
          number: number,
          image: image,
          visible: false, 
          matched: false
        })
      }
    }

    for(let i = suffledDeck.length - 1; i > 0; i--){
      const randomNum = Math.floor(Math.random() * i)
      const temp = suffledDeck[i]
      suffledDeck[i] = suffledDeck[randomNum]
      suffledDeck[randomNum] = temp
    }
    
    suffledDeck.forEach(card => dispatch(addCard(card)))
    
  }, [pokemonList])

  

  return (
    <main>
      <h1>Pokémon Snap</h1>
      <CardGrid cardList={cards}/>     
    </main>
  )
}

export default Game