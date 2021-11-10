import React, { useEffect } from "react"
import { StyleSheet, View, Button } from "react-native"
import * as Notifications from "expo-notifications"
import * as Permissions from "expo-permissions"
import { Alert } from "react-native"

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
    channelId: 'default',
    hour: 21,
    minute: 8,
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

export const  TriggerThirdForceNotifications = async () => {
  ThirdForcePermissions();

  await Notifications.scheduleNotificationAsync({
    content: notificationContent,
    trigger: notificationTrigger,
    
  })
}