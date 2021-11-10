import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Avatar,
    Badge,
    ListItem,
    Card, Button
} from "react-native-elements";
import {
    Easing,
    StyleSheet,
    View,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import { ScrollView } from "react-native-gesture-handler";
import { handleDeleteDeck, handleGetDecks } from "../../redux/actions/decks";
import { createArrayFromDeckListObject, getTitleInitials } from "../../utils/generics";
import { bgColor, colorWhite, darkBlue, darkGreen, darkRed, lightBlue, lightGreen } from "../../utils/AppColors";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Alert, Animated } from "react-native";

class DeckList extends Component {
    constructor(props) {
        super(props)
        this.cardAnimationValue = new Animated.Value(0)

        this.state = {
            fadeOut: false
        }
    }

    handleFadeCardIn = () => {
        FadeCardIn(this.cardAnimationValue);
    }

    handleFadeCardOut = (_deck) => {
        Animated.timing(this.cardAnimationValue, {
            toValue: 0,
            duration: 800,
            easing: Easing.ease,
            useNativeDriver: true
        }).start(() =>
            this.handleNavigateToViewCardDetails(_deck),
            this.setState({
                fadeOut: true
            })
        );
    }

    componentDidMount() {
        this.props.dispatch(handleGetDecks());
        this.handleFadeCardIn();
    }

    handleNavigateToViewCardDetails = (_deck) => {
        this.props.navigation.navigate("DeckDetails", { deckId: _deck.id });
    }

    renderDecks(_decks) {
        let count = 1;
        const _deckListArray = createArrayFromDeckListObject(_decks);

        return (
            <View style={{
                marginBottom: 15,
            }}>
                {
                    _deckListArray.map((_deck, i) =>
                        <Animated.View style={[
                            styles.fadeCardStyle,
                            { opacity: this.cardAnimationValue }
                        ]} key={i}>
                            <Card key={_deck.id} >
                                <Card.Title>{_deck.title.toUpperCase()}</Card.Title>
                                <Card.Divider />
                                <ListItem key={_deck.title} onPress={() => this.handleFadeCardOut(_deck)}>
                                    <Avatar
                                        avatarStyle={{
                                            backgroundColor: lightGreen,
                                            opacity: 0.5
                                        }}
                                        titleStyle={{
                                            color: darkGreen,
                                            fontWeight: 'bold',
                                        }}
                                        size="medium"
                                        rounded
                                        source={{ uri: 'gh.jpg' }}
                                        title={`${getTitleInitials(_deck.title)}`}
                                        activeOpacity={0.5}
                                    />
                                    <ListItem.Content key={count++}>
                                        <ListItem.Title>
                                            {'Total Cards '}<Badge
                                                value={_deck.questions.length}
                                                status="warning"
                                            />
                                        </ListItem.Title>
                                        <ListItem.Subtitle>
                                            {`Contains Cards or Questions on ${_deck.title}.`}
                                        </ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            </Card>
                        </Animated.View>
                    )
                }
            </View>
        )
    }

    render() {
        // destructure the state properties
        const { decks } = this.props.decks;

        // reload the animation if the state changes to true
        setTimeout(()=> {
            if(this.state.fadeOut === true){
                this.handleFadeCardIn();
            }
        }, 100)

        return (
            <View style={{
                backgroundColor: bgColor
            }}>
                <ScrollView>
                    {
                        this.renderDecks(decks)
                    }
                </ScrollView>
            </View>
        )
    }
}

const FadeCardIn = (cardAnimationValue) => {
    Animated.timing(cardAnimationValue, {
        toValue: 1,
        duration: 1200,
        easing: Easing.ease,
        useNativeDriver: true
    }).start()
}

const styles = StyleSheet.create({
    fadeCardStyle: {
        // padding: 20,
        // backgroundColor: lightGreen
    },
});

function mapStatesToProps(decks) {
    return {
        decks,
        fadeCardAnimation: () => FadeCardIn(0)
    }
}
export default connect(mapStatesToProps)(DeckList);