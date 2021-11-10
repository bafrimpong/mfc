import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Alert } from 'react-native';

export const UDACICARDS_NOTIFICATION_KEY = "udacicards:5123";

export const GET_DECKS = "GET_DECKS";
export const GET_DECK_BY_ID = "GET_DECK_BY_ID";
export const SAVE_DECK_TITLE = "SAVE_DECK_TITLE";
export const DELETE_DECK = "DELETE_DECK";
export const ADD_CARD_TO_DECK = "ADD_CARD_TO_DECK";
export const DELETE_CARD = "DELETE_CARD";

export async function clearLocalNotification() {
    const result = await AsyncStorage.removeItem(NOTIFICATION_KEY);
    return Notifications.cancelAllScheduledNotificationsAsync(result);
}

function createNotification() {
    console.log("Point 5")
    return {
        title: "Attempt a quiz for today",
        body: "Don't forget to attempt atleast a quiz for today",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: "high",
            sticky: false,
            vibrate: true
        }
    };
}

export function setLocalNotification() {
    AsyncStorage.getItem(UDACICARDS_NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            console.log("Point 1")
            if (data === null) {
                Notifications.requestPermissionsAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
                    console.log("Point 2")
                    if (status === "granted") {
                        console.log("Point 3")
                        Notifications.cancelAllScheduledNotificationsAsync();
                        let today = new Date()
                        today.setDate(today.getDate)
                        today.setHours(16)
                        today.setMinutes(44)
                        console.log("Point 4")

                        Notifications.scheduleNotificationAsync({
                                content: {
                                    // createNotification
                                    title: "Bismark",
                                    body: "Am here worried for a solutn",
                                    priority: "high",
                                    vibrate: true
                                },
                                trigger: {
                                    channelId: UDACICARDS_NOTIFICATION_KEY,
                                    hour: today.getHours(),
                                    minute: today.getMinutes(),
                                    // repeats: true
                                },
                            }
                        )
                        console.log("Point 6")
                        AsyncStorage.setItem(UDACICARDS_NOTIFICATION_KEY, JSON.stringify(true))
                        console.log("Point 7")
                    }
                })
            }
        })
}

/**
 * Splits strings to get the first and the last words begening characters.
 * e.g. `Bismark Atta Frimpong` will return `BF` or `King` return `K`
 * @param {String} _title title of the deck
 * @returns a string of one or two letter
 */
export const getTitleInitials = (_title) => {
    const _newTitle = _title.trim().split(' ');
    const _initials = _newTitle.reduce((acc, curr, index) => {
        if (index === 0 || index === _newTitle.length - 1) {
            acc = `${acc}${curr.charAt(0).toUpperCase()}`;
        }
        return acc;
    }, '');
    return _initials;
}

/**
 * Maps through the `keys` of the `deck` object and gets the ojects
 * into an array form
 * @param {*} _decks deck object
 * @returns array of deck objects
 */
export const createArrayFromDeckListObject = (_decks) => {
    const _deckListToArray = Object.keys(_decks).map((data) =>
        _decks[data]
    )
    return _deckListToArray;
}

/**
 * Takes the input of `Yes` or `No` click from the user and return true if the
 * `Yes` button is clicked otherwise `False`
 * @param {String} _alertTitle the title to be shown on the alert
 * @param {String} _alertMessage the message to be displayed on the alert
 * @returns a boolean
 */
export const isAlertActionYesOrNo = (_alertTitle, _alertMessage) => {
    let isYesNo;
    console.log("BEFORE isYES ", isYesNo)
    Alert.alert(
        _alertTitle,
        _alertMessage,
        [
            {
                text: "No",
                onPress: () => isYesNo = false,
            },
            {
                text: "Yes",
                onPress: () => isYesNo = true
            }
        ]
    );
    return isYesNo;
}