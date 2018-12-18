// IMPORT AND RETURN COMPONENTS AS FINISHED
// SOUND LOGIC


// import React from "react";

import React, { Component } from "react";
import Container from "../Container";
import Header from "../Header";
import data from "../../data.json";


class ClickGame extends Component {
    state = {
        data,
        score: 0,
        topScore: 0
    };

    componentDidMount(){
        this.setState({
            data: this.shuffleData(this.state.data)
        });
    }
    handleCorrectGuess = newData => {
        const {topScore, score } = this.state;
        const newScore = score +1;
        const newTopScore = Math.max(newScore, topScore);

        this.setState({
            data: this.shuffleData(newData),
            score: newScore,
            topScore: newTopScore
        });
    };

    handleIncorrectGuess = data => {
        this.setState({
            data:this.resetData(data),
            score: 0
        });
    };

    resetData = data => {
        const resetData = data.map(item => ({ ...item, clicked: false}))
        return this.shuffleData(resetData);
    };

    shuffleData = data => {
        let i = data.length -1;
        while (i > 0) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = data[i];
            data[i] = data[j];
            data[j] = temp;
            i--;
        }
        return data;
    };

    handleItemClick = id => {
        let correct = false;
        const newData = this.state.data.map(item => {
            const newItem = { ...item };
            if (newItem.id === id) {
                if (!newItem.clicked) {
                    newItem.clicked = true;
                    correct = true;
                }
            }
            return newItem;
        })
        correct
        ? this.handleCorrectGuess(newData)
        : this.handleIncorrectGuess(newData);
    };

    render() {
        return (
            <div>
                 <Container />
                <Header />
               
            </div>
        )
    };
};

    export default ClickGame;
