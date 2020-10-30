
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  Button
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import axios from "axios";

GoogleSignin.configure({
  webClientId: '808729452255-1eq8j4n13aprkh4hs9vg3paeh2c99jur',
  scopes: ["https://www.googleapis.com/auth/youtube.readonly"]
});

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const Jobs = () => {

  return (
   <Text>jib</Text>
   
)


}


const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    top: 0,
    height: 45,
    width: "100%",
    justifyContent: "center",
  }



})


export default Jobs;
