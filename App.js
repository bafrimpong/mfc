import React, { Component } from 'react';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux'
import reducer from './src/redux/reducers/index';
import middleware from './src/redux/middleware';
import { StyleSheet } from 'react-native';
import AppNavigation from './src/components/navigation/AppNavigation';
import AppStatusBar from './src/components/navigation/AppStatusBar';
import { darkGreen, lightGreen, statusBarColor } from './src/utils/AppColors';
import AppHeader from './src/components/AppHeader';
import { setLocalNotification, UDACICARDS_NOTIFICATION_KEY } from './src/utils/generics';
import NotifyMe, { clearLocalNotification, getOrSetLocalNotificationPermissions, scheduleNotification, sendNotificationImmediately, setKasapaLocalNotification, TestRequest } from './src/utils/notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TriggerThirdForceNotifications } from './src/utils/ThirdForce';


class App extends Component {

  componentDidMount(){
    // getOrSetLocalNotificationPermissions()
    TriggerThirdForceNotifications()
    // setLocalNotification()
  }

  render() {
    // getOrSetLocalNotificationPermissions()
    return (
      <Provider store={createStore(reducer, middleware)}>
          {/* <AppStatusBar backgroundColor={statusBarColor} /> */}
          <AppHeader backTo='' title={"Udaci-Cards App"} />
          <AppNavigation />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;