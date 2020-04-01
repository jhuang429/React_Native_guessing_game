import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen'
import GameOver from './screens/GameOver';

export default function App() {

  const [userNumber, setUserNumber] = useState()
  const [guessRounds, setGuessRounds] = useState(0)

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber)
    setGuessRounds(0) 
  }

  let content = <StartGameScreen onStartGame={startGameHandler}/>

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds)
  }

  const newGame = () => {
    setGuessRounds(0)
    setUserNumber(null)

  }

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
  }
  else if (guessRounds > 0) {
    content = <GameOver rounds={guessRounds} userNumber={userNumber} newGame={newGame}/>
  }

  return (
    <View style={styles.container}>
      <Header title={"Guessing Game"} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
