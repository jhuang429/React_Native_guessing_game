import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'


const GameOver = props => {

    return (
        <View style={styles.screen}>
            <Text>Game Over!</Text>
            <Text>Number of rounds: {props.rounds}</Text>
            <Text>Number was: {props.userNumber}</Text>
            <Button title="New Game" onPress={props.newGame} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default GameOver