
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
import { TextInput } from 'react-native-gesture-handler';
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
  const [stats, setstats] = useState([])

  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential

    return auth().signInWithCredential(googleCredential);
  }

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setloggedIn(false);
      setuserInfo([]);
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentUser = async () => {
    await GoogleSignin.getTokens().then((res) => {
      console.log(res.accessToken);
      axios.get("https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true&key=AIzaSyB0teIk0vu9KpyKgSXPK4WZnOqqb9aQI0Q&access_token=" + res.accessToken).then((res) => {
        // console.log(res.data.items[0].statistics);
        setstats(res.data.items[0].statistics)
      })

    })
  };





  return (
    <>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <SafeAreaView style={style.container}>

        <View style={style.header} >
          <Text style={style.headingtext} >Jobs</Text>
        </View>

        <Button
          title="Google Sign-In"
          onPress={() => onGoogleButtonPress().then(() => alert('Signed in with Google!'))}
        />

        <Button
          title="Google Sign-Out"
          onPress={() => signOut().then(() => alert('Signed Out'))}
        />

        <Button
          title="Access Token"
          onPress={() => getCurrentUser()}
        />

        <Text style={{fontSize:30,alignSelf:"center"}} >Subscribers:{stats.subscriberCount}</Text>
        <Text style={{fontSize:30,alignSelf:"center"}} >Views:{stats.videoCount}</Text>



      </SafeAreaView>
    </>

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
