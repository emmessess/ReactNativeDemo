/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";

PushNotification.createChannel(
  {
    channelId: "medicine-reminder",
    channelName: "Medicine Reminder Notifications",
    importance: 4,
  },
  (created) => console.log(`createChannel returned '${created}'`)
);

AppRegistry.registerComponent(appName, () => App);
