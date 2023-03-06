import React from "react";
import Die from "./components/Die";
import {nanoid} from "nanoid"
import Confetti from "react-confetti"




export default function App () {
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allValue = dice.every(die => firstValue === die.value)
        if(allHeld && allValue){
            setTenzies(true)
            
        }
    }, [dice])
    
    function generateNewDice() {
        return{
            value: Math.ceil(Math.random() * 6),
                id: nanoid(),
                isHeld:false

        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDice())
        }
        return newDice
    }
    const diceElements = dice.map(dice => <Die key={dice.id} value={dice.value} isHeld={dice.isHeld} holdDice={() => holdDice(dice.id)}/>)


    function rollDice(){
        if(!tenzies){
            setDice(prevDice => prevDice.map(die => die.isHeld ? die : generateNewDice()))
        }
        else {
            setTenzies(false)
            setDice(allNewDice())
        }
    }

    function holdDice(id){
        setDice(oldDice => oldDice.map(die => id === die.id ? {...die, isHeld: !die.isHeld}: die))
    }

    return(
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="rollDice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
            
        </main>
    )
}