import React, { useEffect } from "react"
import { StyleSheet, View, Button } from "react-native"
import * as Notifications from "expo-notifications"
import * as Permissions from "expo-permissions"
import { Alert } from "react-native"
import { UDACICARDS_NOTIFICATION_KEY } from "./generics"

const notificationContent = {
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
}

const notificationTrigger = {
  trigger: {
    hour: 5,
    minute: 56,
    repeats: true
  }
}

// Show notifications when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
    }
  },
})

export const ThirdForcePermissions = () => {
  Notifications.getPermissionsAsync(Permissions.NOTIFICATIONS)
    .then((state) => {
      if (state.status !== "granted") {
        alert("Notifications permissions not granted")
        return Notifications.requestPermissionsAsync(Permissions.NOTIFICATIONS)
      } else {
        //call the method to update
      }
    })
}

export const  TriggerThirdForceNotifications = () => {
  ThirdForcePermissions();

  Notifications.scheduleNotificationAsync({
    content: {
      title: "Attempt a quiz for today",
      body: "Don't forget to attempt atleast a quiz for today",
      priority: "high",
      sticky: false,
      vibrate: true,
      sound: true,
    },
    trigger: {
      seconds: 5
      // hour: 6,
      // minute: 19
    }
  })
}