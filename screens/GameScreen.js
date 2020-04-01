import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const rndNum = Math.floor(Math.random() * (max - min) + min);
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum
    }
}


const GameScreen = props => {

    const [currentguess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));
    const [rounds, setRounds] = useState(0)

    const CurrentLow = useRef(1);
    const CurrentHigh = useRef(100);

    const {userChoice, onGameOver} = props

    useEffect(()=> {
        if (currentguess === props.userChoice) {
            onGameOver(rounds)
        }
    },[currentguess, userChoice, onGameOver]
    )

    const nextGuessHandler = direction => {
        if (
            (direction === "lower" && currentguess < props.userChoice) ||
            (direction === "higher" && currentguess > props.userChoice)
            ) {
            Alert.alert("Don\'t Cheat","you know you are wrong",[{ text: "Sorry!" }])
            return;
        }
        if (direction === "lower") {
            CurrentHigh.current = currentguess
        }
        else {
            CurrentLow.current = currentguess
        }
        const nextNumber = generateRandomBetween(CurrentLow.current, CurrentHigh.current, currentguess)
        setCurrentGuess(nextNumber)
        setRounds(cur => cur + 1)
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentguess}  </NumberContainer>
            <Card styles={styles.buttonContainer}>
                <Button title="Lower" onPress={() => nextGuessHandler("lower")} />
                <Button title="Higher" onPress={() => nextGuessHandler("higher")} />
            </Card>
        </View>
    )
}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
        width: 300,
        maxWidth: "80%"
    }
})

export default GameScreen