
import React from 'react';
import {
  LogBox,
} from 'react-native';

import firebase from "@react-native-firebase/app"
import firestore from '@react-native-firebase/firestore';
import Tabbar from './Screens/Tabbar';
import AppStartStack from './Screens/AppStartStack';

LogBox.ignoreLogs(['VirtualizedLists should never','Each child','AsyncStorage has been extracted']); // Ignore log notification by message

const firebaseConfig = {
  apiKey: "AIzaSyDOd0TZn_R17bX9NFECVbsrtCREiebp6dc",
  authDomain: "influenza-5bf99.firebaseapp.com",
  databaseURL: "https://influenza-5bf99.firebaseio.com",
  projectId: "influenza-5bf99",
  storageBucket: "influenza-5bf99.appspot.com",
  messagingSenderId: "808729452255",
  appId: "1:808729452255:web:d7c9cf75dbd40a51c6136a",
  measurementId: "G-2TH9DE66ZT"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


const App = () => {


  return (
    <AppStartStack/>
  )
}


export default App;
