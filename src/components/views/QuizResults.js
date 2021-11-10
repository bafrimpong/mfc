import React, { Component } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

class QuizResults extends Component {
    render(){
        return(
            <View>
                <Text>Quiz completed successfully!</Text>
                <Text>You had {0}% correct</Text>
                <TouchableOpacity>
                    <Text>Restart Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Back to Deck</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default QuizResults;