import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import Card from '../components/Card'
import Colors from '../Constants/colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState("") //form
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState(0)

    const handleText = e => {
        // console.log(e.nativeEvent.text)
        setEnteredValue(e.nativeEvent.text)
    }
    
    const resetInputHandler = () => {
        setEnteredValue("")
        setConfirmed(false)
    }

    let confirmedOutPut

    if (confirmed) {
        confirmedOutPut =
            <Card styles={styles.summary}>
                <View>
                    <Text>You Selected:</Text>
                    <NumberContainer>
                        {selectedNumber}
                    </NumberContainer>
                    <Button title="Start Game" onPress={()=>props.onStartGame(selectedNumber)}/>
                </View>
            </Card>
    }

    const confirmInputHandler = () => {
        const chosen = parseInt(enteredValue)
        console.log(chosen === NaN)
        if (isNaN(chosen) || chosen <= 0 || chosen > 99) {
            Alert.alert('Invalid Number!', "Number has to be a number between 1 and 99", [{ text: "okie", style: "destructive" }])
            return;
        }
        else {
            setConfirmed(true)
            setSelectedNumber(chosen)
            setEnteredValue("")
            Keyboard.dismiss()
        }

    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game!</Text>
                <Card styles={styles.inputContainer}>
                    <Text>Select A Number:</Text>
                    <Input
                        style={styles.input}
                        blueOnSubmit
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChange={handleText}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Reset" onPress={resetInputHandler} color={Colors.primary} />
                        </View>
                        <View style={styles.button}>
                            <Button title="Confirm" onPress={confirmInputHandler} color={Colors.accent} />
                        </View>
                    </View>
                </Card>
                {confirmedOutPut}
            </View>
        </TouchableWithoutFeedback>
    )

}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },

    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15,

    },
    inputContainer: {
        width: 300,
        maxWidth: "80%",
        alignItems: "center",
    },
    button: {
        width: 100,
    },
    input: {
        width: 100,
        textAlign: "center"
    },
    summary: {
        marginTop: 20,
        alignItems: "center"
    } 
})

export default StartGameScreen