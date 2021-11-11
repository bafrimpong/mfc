import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Notifications from "expo-notifications"
import * as Permissions from "expo-permissions"
import { UDACICARDS_NOTIFICATION_KEY } from "./generics"

// Show notifications when the app is in the foreground
export const runNotificationInTheForeground = () => {
    Notifications.setNotificationHandler({
        handleNotification: async () => {
            return {
                shouldShowAlert: true,
            }
        },
    });
}

export const clearLocalNotification = () => {
    return AsyncStorage.removeItem(UDACICARDS_NOTIFICATION_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync()
    )
}

const scheduleLocationNotification = () => {
    Notifications.scheduleNotificationAsync({
        content: {
            title: "Attempt a quiz for today",
            body: "👋 Don't forget to attempt atleast a quiz for today",
            priority: "high",
            sticky: false,
            vibrate: true,
            sound: true,
        },
        trigger: { 
            seconds: 5 
        }
    })
}


export const getOrSetLocalNotificationPermissions = () => {
    // 1. get the local starge key with AsyncStorage
    AsyncStorage.getItem(UDACICARDS_NOTIFICATION_KEY)
        .then(JSON.parse) // pass results to json
        .then((data) => {

            // check if _data is null measning user has not
            if (data === null) {
                // a. request a permission from the user
                Notifications.requestPermissionsAsync(Permissions.NOTIFICATIONS)
                    .then((status) => {
                        // if permission is already granted then
                        if (status.status === "granted") {
                            // b. cancel all notifications
                            Notifications.cancelAllScheduledNotificationsAsync()

                            // c. schedule a notification
                            scheduleLocationNotification()

                            // 2. set the notification key in local storage with AsyncStorage
                            AsyncStorage.setItem(UDACICARDS_NOTIFICATION_KEY, JSON.stringify(true));

                        } else {
                            Notifications.requestPermissionsAsync(Permissions.NOTIFICATIONS)
                        }
                    })
            }
        })
}
