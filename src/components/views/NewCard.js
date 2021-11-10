import { FontAwesome } from "@expo/vector-icons";
import React, { Component } from "react";
import { Alert, Text, View } from "react-native";
import { Card, Input, Button } from "react-native-elements";
import { TextInput } from "react-native-paper";
import { bgColor, darkGreen, lightGreen } from "../../utils/AppColors";
import { AntDesign } from '@expo/vector-icons';
import { connect } from "react-redux";
import { handleAddCardToDeck } from "../../redux/actions/decks";
class NewCard extends Component {
    constructor(props){
        super(props)

        this.state = {
            cardQuestion: '',
            cardAnswer: ''
        }
    }

    handleCardTextInputOnChange = (_stateName) => (_inputText) => {
        this.setState(() => ({
            [_stateName]: _inputText
        }))
    }

    handleSaveCardButtonOnPress = () => {
        const { cardQuestion, cardAnswer } = this.state;

        // check if deck title is not empty or null
        if (cardQuestion === '' || cardQuestion === null) {
            Alert.alert(
                "Required Field",
                "Question field cannot be empty",
                [
                    {
                        text: "Okay",
                        onPress: () => {return},
                    }
                ]
            )
            return;
        }
        if (cardAnswer === '' || cardAnswer === null) {
            Alert.alert(
                "Required Field",
                "Answer field cannot be empty",
                [
                    {
                        text: "Okay",
                        onPress: () => {return},
                    }
                ]
            )
            return;
        }

        // save the deck info
        const { deckId } = this.props.route.params;
        const _deck = {
            question: this.state.cardQuestion,
            answer: this.state.cardAnswer
        };

        this.props.dispatch(handleAddCardToDeck(deckId, _deck))

        // reset state
        this.setState(() => ({
            cardQuestion: '',
            cardAnswer: ''
        }));

        // go back to the card
        this.props.navigation.goBack();
    }

    render(){
        const { cardQuestion, cardAnswer } = this.state;
        console.log('PROPS ', this.props)
        return(
            <View style={{
                backgroundColor: bgColor,
                flex: 1,
                flexDirection: "column"
            }}>
            <Card>
                <Card.Title>{`Card for ${this.props.route.params.deckTitle.toUpperCase()} Deck`}</Card.Title>
                <Card.Divider />
                <View>
                    <Input
                        data-name="cardQuestion"
                        label={'Question'} 
                        defaultValue={cardQuestion}
                        placeholder={'Enter question'}
                        onChangeText={this.handleCardTextInputOnChange("cardQuestion")}
                        leftIcon={{type: "font-awesome", name:"question-circle"}}
                    />

                    <Input 
                        data-name="cardAnswer"
                        label={'Answer'}
                        defaultValue={cardAnswer}
                        placeholder={'Enter answer'}
                        onChangeText={this.handleCardTextInputOnChange("cardAnswer")}
                        leftIcon={{type:"MaterialIcons", name:"feedback"}}
                    />
                </View>
                <Card.Divider />
                <Button
                        onPress={() => this.handleSaveCardButtonOnPress()}
                        type="outline"
                        title="Save Card"
                        buttonStyle={{
                            borderColor: darkGreen,
                            backgroundColor: darkGreen,
                            borderWidth: 1,
                            opacity: 0.7,
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                        icon={
                            <FontAwesome
                                style={{
                                    marginLeft: 20,
                                }}
                                name="save"
                                size={24}
                                color={lightGreen}
                            />
                        }
                        iconRight
                        titleStyle={{
                            color: lightGreen,
                            fontWeight: "700"
                        }}
                    />
            </Card>
            </View>
        )
    }
}

export default connect()(NewCard);