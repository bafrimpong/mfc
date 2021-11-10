import React, { Component } from "react";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Animated, ScrollView } from "react-native";
import { Card, Button, ListItem, Input, Badge } from "react-native-elements";
import { connect } from "react-redux";
import { bgColor, colorWhite, darkBlue2, darkGreen, darkRed, lightGreen } from "../../utils/AppColors";
import { Easing } from "react-native-reanimated";
import { clearLocalNotification } from "../../utils/notification";
import { getOrSetLocalNotificationPermissions } from "../../utils/notification";

class CardQuiz extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isCardFlipped: false,
            questionIndex: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            totalQuestions: 0,
            totalUnanswered: 0,
        };

        this.animatedValue = new Animated.Value(0);
        this.value = 0;
    }

    componentDidMount() {
        this.setState(() => ({
            totalQuestions: this.props.deck.questions.length,
            totalUnanswered: this.props.deck.questions.length
        }));

        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        })
    }

    handleIsCardFlipped = () => {
        if (this.value >= 90) {
            Animated.timing(this.animatedValue, {
                toValue: 0,
                duration: 1200,
                useNativeDriver: true,
                easing: Easing.ease
            }).start();
        } else {
            Animated.timing(this.animatedValue, {
                toValue: 180,
                duration: 1200,
                useNativeDriver: true,
                easing: Easing.ease
            }).start();
        }

        this.setState(() => ({
            isCardFlipped: !this.state.isCardFlipped
        }));
    }

    handleSubmitAnswerToQuestion = (answer) => {
        // update the question index
        if (!this.state.totalUnanswered < 1) {
            this.setState(() => ({
                questionIndex: this.state.questionIndex + 1,
                totalUnanswered: this.state.totalUnanswered - 1,
            }));
            if (answer === true) {
                this.setState({
                    correctAnswers: this.state.correctAnswers + 1
                })
            } else {
                this.setState({
                    wrongAnswers: this.state.wrongAnswers + 1
                })
            }
        }
    }

    handleResetQuiz() {
        this.setState(() => ({
            isCardFlipped: false,
            questionIndex: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            isQuizCompleted: false,
            totalQuestions: this.props.deck.questions.length,
            totalUnanswered: this.props.deck.questions.length
        }))
        clearLocalNotification().then(getOrSetLocalNotificationPermissions())
    }

    handleGoToCard() {
        this.handleResetQuiz();
        this.props.navigation.navigate("DeckDetails", { deckId: this.props.route.params.deckId })
    }

    render() {

        const { deck } = this.props;
        const { questionIndex } = this.state;
        let index = questionIndex;

        const { deckTitle } = this.props.route.params;
        const { totalUnanswered, correctAnswers, wrongAnswers, totalQuestions } = this.state;

        const cardQuestion = typeof deck.questions[questionIndex] !== "undefined" && deck.questions[questionIndex].question;
        const cardAnswer = typeof deck.questions[questionIndex] !== "undefined" && deck.questions[questionIndex].answer;

        const frontAnimatedStyle = {
            transform: [{
                "rotateY": this.animatedValue.interpolate({
                    inputRange: [0, 180],
                    outputRange: ["0deg", "180deg"]
                })
            }]
        }

        const backAnimatedStyle = {
            transform: [{
                "rotateY": this.animatedValue.interpolate({
                    inputRange: [0, 180],
                    outputRange: ["180deg", "360deg"]
                })
            }]
        }
        return (
            <ScrollView style={{
                backgroundColor: bgColor,
                flex: 1,
                flexDirection: "column"
            }}>
                {
                    !this.state.totalUnanswered <= 0
                        ?
                        <View>
                            {/* front of card with questions */}
                            <Animated.View style={[
                                styles.flipCard,
                                frontAnimatedStyle
                            ]}>
                                <Card>
                                    <Card.Title>{`Answer Questions on ${deckTitle.toUpperCase()}`}</Card.Title>
                                    <Card.Divider />
                                    <ListItem>
                                        <ListItem.Content>
                                            <ListItem.Title>Question {index += 1}</ListItem.Title>
                                            <ListItem.Subtitle style={styles.listItem}>
                                                {cardQuestion}
                                            </ListItem.Subtitle>
                                            <Card.Divider />
                                            <ListItem.Title>Answer</ListItem.Title>
                                            <ListItem.Subtitle style={styles.listItem}>Not shown</ListItem.Subtitle>
                                        </ListItem.Content>
                                    </ListItem>
                                    {/* <Card.Divider /> */}
                                    <Text style={{ textAlign: "center", color: darkGreen, fontWeight: "bold" }}>
                                        Unanswered Questions {
                                            <Badge
                                                value={totalUnanswered}
                                                status="error"
                                            />
                                        }
                                    </Text>
                                    {/* <Card.Divider /> */}
                                    <View style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}>
                                        <Button
                                            onPress={() => this.handleSubmitAnswerToQuestion(true)}
                                            type="outline"
                                            title="Correct"
                                            buttonStyle={{
                                                borderColor: darkBlue2,
                                                backgroundColor: darkBlue2,
                                                borderWidth: 1,
                                                // opacity: 0.7,
                                                marginTop: 10,
                                                marginBottom: 10,
                                            }}
                                            icon={
                                                <AntDesign
                                                    name="checksquare"
                                                    color={colorWhite}
                                                    size={24}
                                                    style={{
                                                        marginLeft: 20,
                                                    }}
                                                />
                                            }
                                            iconRight
                                            titleStyle={{
                                                color: colorWhite,
                                                fontWeight: "700"
                                            }}
                                        />

                                        <Button
                                            onPress={() => this.handleSubmitAnswerToQuestion(false)}
                                            type="outline"
                                            title="Incorrect"
                                            buttonStyle={{
                                                borderColor: darkRed,
                                                backgroundColor: darkRed,
                                                borderWidth: 1,
                                                // opacity: 0.7,
                                                marginTop: 10,
                                                marginBottom: 10,
                                            }}
                                            icon={
                                                <Entypo
                                                    name="squared-cross"
                                                    color={colorWhite}
                                                    size={24}
                                                    style={{
                                                        marginLeft: 20,
                                                    }}
                                                />
                                            }
                                            iconRight
                                            titleStyle={{
                                                color: colorWhite,
                                                fontWeight: "700"
                                            }}
                                        />

                                    </View>
                                    <Button
                                        onPress={() => this.handleIsCardFlipped()}
                                        title={"Show Answer"}
                                        buttonStyle={{
                                            backgroundColor: darkGreen
                                        }}
                                    />
                                </Card>
                            </Animated.View>

                            {/* back of card with answer */}
                            <Animated.View style={[
                                styles.flipCard,
                                styles.flipCardBack,
                                backAnimatedStyle
                            ]}>
                                <Card>
                                    <Card.Title>{`Answer Questions on ${this.props.route.params.deckTitle.toUpperCase()}`}</Card.Title>
                                    <Card.Divider />
                                    <ListItem>
                                        <ListItem.Content>
                                            <ListItem.Title>Answer to Question {index}</ListItem.Title>
                                            <ListItem.Subtitle style={styles.listItem}>
                                                {cardAnswer}
                                            </ListItem.Subtitle>
                                            <Card.Divider />
                                            <ListItem.Subtitle style={styles.listItem}>
                                                Questions Not Answered {
                                                    <Badge
                                                        value={totalUnanswered}
                                                        status="error"
                                                    />
                                                }
                                            </ListItem.Subtitle>
                                        </ListItem.Content>
                                    </ListItem>
                                    <Card.Divider />
                                    {/* flip card */}
                                    <Button
                                        onPress={() => this.handleIsCardFlipped()}
                                        title={"Back to Quiz"}
                                        buttonStyle={{
                                            backgroundColor: darkGreen
                                        }}
                                    />
                                </Card>
                            </Animated.View>
                        </View>
                        :
                        <View>
                            <Card>
                                <Card.Title>{`${deckTitle.toUpperCase()} Quiz Results`}</Card.Title>
                                <Card.Divider />
                                <ListItem>
                                    <ListItem.Content>
                                        <ListItem.Title>Quiz Completed Successfully</ListItem.Title>
                                        <ListItem.Subtitle style={styles.listItem}>
                                            You have successfully completed the Quiz
                                        </ListItem.Subtitle>
                                        <Card.Divider />
                                        <ListItem.Title>Quiz Score</ListItem.Title>
                                        <ListItem.Subtitle style={styles.listItem}>
                                            {`Raw Score ${correctAnswers} / ${totalQuestions}`}
                                        </ListItem.Subtitle>
                                        <ListItem.Subtitle style={styles.listItem}>
                                            {`Percentage Score ${((correctAnswers / totalQuestions).toFixed(2) * 100)}%`}
                                        </ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                                {/* <Card.Divider /> */}
                                <Text style={{ textAlign: "center", color: darkGreen, fontWeight: "bold" }}>
                                    You had {
                                        <Badge
                                            value={correctAnswers}
                                            status="success"
                                        />
                                    } correct
                                </Text>
                                <Text style={{ textAlign: "center", color: darkGreen, fontWeight: "bold" }}>
                                    You had {
                                        <Badge
                                            value={wrongAnswers}
                                            status="error"
                                        />
                                    } wrong
                                </Text>
                                {/* <Card.Divider /> */}
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}>
                                    <Button
                                        onPress={() => this.handleResetQuiz()}
                                        type="outline"
                                        title="Reset Quiz"
                                        buttonStyle={{
                                            borderColor: darkGreen,
                                            backgroundColor: darkGreen,
                                            borderWidth: 1,
                                            // opacity: 0.7,
                                            marginTop: 10,
                                            marginBottom: 10,
                                        }}
                                        icon={
                                            <Ionicons
                                                name="reload-circle"
                                                color={lightGreen}
                                                size={24}
                                                style={{
                                                    marginLeft: 20,
                                                }}
                                            />
                                        }
                                        iconRight
                                        titleStyle={{
                                            color: lightGreen,
                                            fontWeight: "700"
                                        }}
                                    />

                                    <Button
                                        onPress={() => this.handleGoToCard()}
                                        type="outline"
                                        title="Go to Card"
                                        buttonStyle={{
                                            borderColor: darkRed,
                                            backgroundColor: darkRed,
                                            borderWidth: 1,
                                            // opacity: 0.7,
                                            marginTop: 10,
                                            marginBottom: 10,
                                        }}
                                        icon={
                                            <AntDesign
                                                name="back"
                                                color={colorWhite}
                                                size={24}
                                                style={{
                                                    marginLeft: 20,
                                                }}
                                            />
                                        }
                                        iconRight
                                        titleStyle={{
                                            color: colorWhite,
                                            fontWeight: "700"
                                        }}
                                    />
                                </View>
                            </Card>
                        </View>
                }

            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    listItem: {
        marginLeft: 10
    },
    flipCard: {
        backfaceVisibility: 'hidden'
    },
    flipCardBack: {
        width: "100%",
        position: "absolute",
        top: 0
    }
});

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

export default connect(mapStateToProps)(CardQuiz);