import React, { Component } from "react";
import { Avatar, Badge, ListItem, Card, Button } from "react-native-elements";
import { Alert, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { getTitleInitials, isAlertActionYesOrNo } from "../../utils/generics";
import { bgColor, darkGreen, darkRed, lightGreen } from "../../utils/AppColors";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { handleDeleteDeck, handleGetDecks } from "../../redux/actions/decks";
import { NavigationActions } from '@react-navigation/native';
class DeckDetails extends Component {
    getDeck = () => {
        const { deck } = this.props;
        return deck;
    };


    handleDeleteDeck = () => {
        const { deckId, dispatch, navigation } = this.props;
        const _alertTitle = "Delete Deck";
        const _alertMessage = "Do you really want to DELETE this deck?";

        Alert.alert(_alertTitle, _alertMessage, [
            {
                text: "No",
                onPress: () => {
                    return;
                },
            },
            {
                text: "Yes",
                onPress: () => {
                    console.log("Deleting...1", deckId)
                    dispatch(handleDeleteDeck(deckId))
                    // dispatch(handleGetDecks()),
                    // navigation.goBack({ key: "DeckDetails" }) 
                    navigation.goBack()
                },
            },
        ]);
    };

    handleAddNewCard = () => {
        this.props.navigation.navigate("NewCard", {
            deckTitle: this.props.deck.title,
            deckId: this.props.deck.id
        });
    };

    handleStartQuiz = () => {
        if (this.props.deck.questions.length <= 0) {
            Alert.alert("Action Not Allowed",
                "Quiz can not be started when Deck has no Cards or Questions available!", [
                {
                    text: "Okay",
                    onPress: () => {
                        return;
                    },
                },
            ]);
            return;
        }

        // navigate to the CardQuiz screen
        this.props.navigation.navigate("CardQuiz", {
            deckTitle: this.props.deck.title,
            deckId: this.props.deck.id
        })
    };

    render() {
        const _deck = this.getDeck();
        console.log("DeckDetails ~ render ~ _deck", this.props)
        if (typeof _deck !== "undefined") {
            return (
                <View
                    style={{
                        backgroundColor: bgColor,
                        flex: 1,
                        flexDirection: "column",
                    }}
                >
                    {
                        <Card
                            containerStyle={{
                                flex: 1,
                                flexDirection: "column",
                                marginBottom: 15,
                            }}
                        >
                            <Card.Title>{typeof _deck.title !== "undefined" && _deck.title.toUpperCase()}</Card.Title>
                            <Card.Divider />

                            <View>
                                <ListItem>
                                    <Avatar
                                        avatarStyle={{
                                            backgroundColor: lightGreen,
                                            opacity: 0.5,
                                        }}
                                        titleStyle={{
                                            color: darkGreen,
                                            fontWeight: "bold",
                                        }}
                                        size="medium"
                                        rounded
                                        source={{ uri: "gh.jpg" }}
                                        title={`${getTitleInitials(typeof _deck.title !== "undefined" && _deck.title)}`}
                                        activeOpacity={0.5}
                                    />

                                    <ListItem.Content>
                                        <ListItem.Title>
                                            {"Total Cards "}
                                            <Badge value={typeof _deck.questions !== "undefined" && _deck.questions.length} status="warning" />
                                        </ListItem.Title>
                                        <ListItem.Subtitle>
                                            {`Contains Cards or Questions on ${typeof _deck.title !== "undefined" && _deck.title}.`}
                                        </ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            </View>
                            <Card.Divider />
                            <View>
                                <Button
                                    onPress={() => this.handleStartQuiz()}
                                    type="outline"
                                    title="Start Quiz"
                                    buttonStyle={{
                                        borderColor: darkGreen,
                                        backgroundColor: darkGreen,
                                        borderWidth: 1,
                                        opacity: 0.7,
                                        marginTop: 10,
                                        marginBottom: 10,
                                    }}
                                    icon={
                                        <MaterialCommunityIcons
                                            style={{
                                                marginLeft: 20,
                                            }}
                                            name="clock-start"
                                            size={24}
                                            color={lightGreen}
                                        />
                                    }
                                    iconRight
                                    titleStyle={{
                                        color: lightGreen,
                                        fontWeight: "700",
                                    }}
                                />

                                <Button
                                    onPress={() => this.handleAddNewCard()}
                                    type="outline"
                                    title="Add New Card"
                                    buttonStyle={{
                                        borderColor: darkGreen,
                                        backgroundColor: bgColor,
                                        borderWidth: 1,
                                        opacity: 0.7,
                                        marginTop: 10,
                                        marginBottom: 10,
                                    }}
                                    icon={
                                        <AntDesign
                                            style={{
                                                marginLeft: 20,
                                            }}
                                            name="addfolder"
                                            size={24}
                                            color={darkGreen}
                                        />
                                    }
                                    iconRight
                                    titleStyle={{
                                        color: darkGreen,
                                        fontWeight: "700",
                                    }}
                                />

                                <Button
                                    onPress={() => this.handleDeleteDeck()}
                                    type="outline"
                                    title="Delete Deck"
                                    buttonStyle={{
                                        borderColor: darkRed,
                                        borderWidth: 1,
                                        opacity: 0.7,
                                        marginTop: 10,
                                    }}
                                    icon={
                                        <AntDesign
                                            style={{
                                                marginLeft: 20,
                                            }}
                                            name="delete"
                                            size={24}
                                            color={darkRed}
                                        />
                                    }
                                    iconRight
                                    titleStyle={{
                                        color: darkRed,
                                        fontWeight: "700",
                                    }}
                                />
                            </View>
                        </Card>
                    }
                </View>
            );
        } else {
            return (
                <View>

                </View>
            )
        }
    }
}

function mapStateToProps(decks, { navigation, route }) {
    const { deckId } = route.params;
    const deck = decks.decks[deckId];

    return {
        decks,
        navigation,
        deck,
        deckId,
    };
}

const styles = StyleSheet.create({
    cardButtons: {
        marginTop: 20,
        marginBottom: 10,
    },
});

export default connect(mapStateToProps)(DeckDetails);
