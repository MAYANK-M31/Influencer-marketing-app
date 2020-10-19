
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, Image } from 'react-native';
import InstagramLogin from 'react-native-instagram-login';
import CookieManager from '@react-native-community/cookies';
import axios from "axios";

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const Profile = () => {


  const [token, settoken] = useState()
  const [instadata, setinstadata] = useState([])
  const [result, setresult] = useState(false)

  const setIgToken = async (datas) => {
    setresult(false)
    await axios.get("https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp&access_token=" + `${datas.access_token}`)
      .then((res) => {
       
        setinstadata(res)
        // console.log(instadata.data);
        setresult(true)
      })
    console.log('data', datas)
    settoken(datas.access_token)
  }

  // console.log(instadata.data.data);

  const onClear = () => {
    CookieManager.clearAll(true)
      .then((res) => {
        settoken(null)
        setresult(false)
      });
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => instagramLogin.show()}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Login now</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, { marginTop: 10, backgroundColor: 'green' }]}
        onPress={() => onClear()}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Logout</Text>
      </TouchableOpacity>
      <Text style={{ margin: 10 }}>Token: {token}</Text>

      <InstagramLogin
        ref={ref => (instagramLogin = ref)}
        appId="441868563443736"
        appSecret='a04a79f825f35458456f049b802c7f3b'
        redirectUrl='https://www.google.com/'
        scopes={['user_profile', 'user_media']}
        onLoginSuccess={setIgToken}
        onLoginFailure={(data) => console.log(data)}
      />

      {result ?
        <FlatList
          data={instadata.data.data}
          renderItem={({ item }) => (
            <View
              style={{
                height: WiDTH / 3,
                width: WiDTH / 3,
                flexDirection: 'column',
                margin: 1,
                backgroundColor: "#d9d9d9"
              }}>
              <Image style={{ width: "100%", height: "100%" }} source={{ uri: item.media_url }} />

            </View>
          )}
          //Setting the number of column
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />

        :
        null
      }




    </View>
  );

}


const styles = StyleSheet.create({
  btn: {
    borderRadius: 5,
    backgroundColor: 'orange',
    height: 30,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default Profile;
