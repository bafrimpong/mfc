import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import DeckList from '../../components/views/DeckList';
import NewDeck from '../../components/views/NewDeck';
import DeckDetails from '../views/DeckDetails';
import NewCard from '../views/NewCard';
import CardQuiz from '../views/CardQuiz';
import QuizResults from '../views/QuizResults';
import { darkGreen, lightGreen } from '../../utils/AppColors';
import { AntDesign, Entypo } from '@expo/vector-icons';

const StackNavigator = createStackNavigator();
const StackNavigatorScreens = () => (
    <StackNavigator.Navigator initialRouteName="DeckList">
        <StackNavigator.Screen
            name={"DeckList"}
            component={DeckList}
            options={setOptions('List of Decks')}
        />

        <StackNavigator.Screen 
            name={"DeckDetails"} 
            component={DeckDetails}
            options={setOptions('Deck Details')} 
        />

        {/* <StackNavigator.Screen 
            name={"QuizResults"} 
            component={QuizResults}
            options={{
                title: "Quiz Results"
            }} 
        /> */}

        <StackNavigator.Screen 
            name={"NewCard"} 
            component={NewCard} 
            options={{
                title: "Add New Card"
            }} 
        />

        <StackNavigator.Screen 
            name={"CardQuiz"} 
            component={CardQuiz}
            options={{
                title: "Start Quiz"
            }}
        />
    </StackNavigator.Navigator>
)

const setScreenOptions = ({ route }) => {
    return {
        tabBarIcon: ({ focused, size }) => {
            if (route.name === 'DeckList') {
                size = focused ? 24 : 20;
                return (
                    <Entypo name='blackboard' size={size} color={lightGreen} />
                )
            } else {
                size = focused ? 24 : 20;
                return (
                    <AntDesign name='plussquare' size={size} color={lightGreen} />
                )
            }
        },
        tabBarActiveTintColor: "#f0f",
        tabBarInactiveTintColor: "#555",
        tabBarActiveBackgroundColor: "#fff",
        tabBarInactiveBackgroundColor: "#999",
        tabBarShowLabel: true,
        tabBarLabelStyle: {
            fontSize: 14
        },
        tabBarStyle: [
            {
                display: "flex"
            },
            null
        ]
    }
}

const setOptions = (_title) => {
    return {
        title: _title
    }
}

const MaterialBottomTabNavigator = createMaterialBottomTabNavigator();
const MaterialBottomTabNavigatorScreen = ({ deckList }) => (
    <MaterialBottomTabNavigator.Navigator
        screenOptions={({ route }) => (
            setScreenOptions({ route })
        )}
        barStyle={{ backgroundColor: darkGreen }}
    >
        <MaterialBottomTabNavigator.Screen
            name={"StackNavigatorScreens"}
            component={StackNavigatorScreens}
            options={{
                title: "All Decks",
                tabBarBadge: deckList.length
            }} />
        <MaterialBottomTabNavigator.Screen 
            name={"NewDeck"} 
            component={NewDeck}
            options={{
                title: "New Deck"
            }}
        />
    </MaterialBottomTabNavigator.Navigator>
)

export default ({ deckList }) => (
    <MaterialBottomTabNavigatorScreen deckList={deckList} />
)