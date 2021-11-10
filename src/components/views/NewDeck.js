import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { Component } from "react";
import { Text, View, TextInput, Alert } from "react-native";
import { Card, Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { handleGetDecks, handleSaveDeckTitle } from "../../redux/actions/decks";
import { bgColor, darkGreen, lightGreen } from "../../utils/AppColors";

class NewDeck extends Component {
    constructor(props) {
        super(props)

        this.state = {
            deckTitle: ''
        }
    }

    handleDeckTitleOnChange = (event) => {
        this.setState(() => ({
            deckTitle: event
        }))
    }

    handleSaveDeckButtonOnPress = () => {
        const { deckTitle } = this.state;

        // check if deck title is not empty or null
        if (deckTitle === '' || deckTitle === null) {
            Alert.alert(
                "Required Field",
                "Deck title field cannot be empty",
                [
                    {
                        text: "Okay",
                        onPress: () => {return},
                        style: "cancel"
                    }
                ]
            )
            return;
        }

        // save the deck info
        this.props.dispatch(handleSaveDeckTitle(deckTitle));

        // reload the decks
        this.props.dispatch(handleGetDecks());

        // rest the state of deckTitle
        this.setState({
            deckTitle: ''
        })

        //redirect to deck list
        // this.props.navigation.navigate("DeckList");

        this.props.navigation.goBack();
    }

    render() {

        const { deckTitle } = this.state;

        return (
            <View style={{
                backgroundColor: bgColor,
                flex: 1,
                flexDirection: "column"
            }}>
                <Card>
                    <Card.Title>Add New Deck</Card.Title>
                    <Card.Divider />
                    <View>
                        <Input
                            label={'Deck Title'}
                            defaultValue={deckTitle}
                            placeholder="Enter deck title"
                            onChangeText={this.handleDeckTitleOnChange}
                            errorStyle={{ color: 'red' }}
                            errorMessage='* Deck title is required'
                            leftIcon={
                                <MaterialIcons
                                    name='title'
                                    size={24}
                                    color={darkGreen}
                                />
                            }
                        />
                    </View>
                    <Card.Divider />
                    <Button
                        onPress={() => this.handleSaveDeckButtonOnPress()}
                        type="outline"
                        title="Create Deck"
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

export default connect()(NewDeck);