import React, { useState, useCallback, useEffect, useContext } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    Image, FlatList, ImageBackground, ActivityIndicator, AsyncStorage,
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import axios from "axios"
import firestore from '@react-native-firebase/firestore';
import { MyContext } from './AppStartStack';

const images = [
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/82b8e9101650903.5f2369beab58a.jpg"

]

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height



 export const ChatsHeader = ({ navigation }) => {

    const { dispatch, state } = useContext(MyContext)
    const { requestsent } = state;
    // const [data, setdata] = useState(requestsent)

    // useEffect(() => {
    //     setdata(requestsent)
    //     const myfunc = async () => {

    //         const uid = await AsyncStorage.getItem("uid")
    //         const type = await AsyncStorage.getItem("type")


    //         if (type == "influencer") {
    //             const ref = await firestore().collection("influencer").where("uid","==",uid)
    //             ref.get().then(function (querySnapshot) {
    //                 querySnapshot.forEach(function (doc) {
    //                     if(doc.data().requestssent){
    //                         dispatch({type:"ADD_REQUESTSENT",payload:doc.data().requestssent}) 
    //                     }else{
    //                         dispatch({type:"ADD_REQUESTSENT",payload:[]}) 
    //                     }
    //                     // console.log(doc.data().requestssent)


    //                 })


    //             })
    //         } else {

    //         }
    //     }
    //     myfunc()
    // }, [])


    return (
        <View style={{ flexDirection: "row" }} >
            <Text style={{ color: "#007bff", fontWeight: "bold", fontSize: 15 }} >Chats</Text>
            <View style={{ height: 13, width: 13, backgroundColor: "#00ca95", justifyContent: "center", alignItems: "center", borderRadius: 50, left: 5, top: 0 }}>
                {/* <Text style={{color:"white",fontSize:10,fontWeight:"bold"}}>2</Text> */}
            </View>
        </View>
    )
}

export const Requestheader = () => {
    return (
        <View style={{ flexDirection: "row" }} >
            <Text style={{ color: "#007bff", fontWeight: "bold", fontSize: 15 }} >Requests</Text>
            <View style={{ height: 13, width: 13, backgroundColor: "#00ca95", justifyContent: "center", alignItems: "center", borderRadius: 50, left: 5, top: 0 }}>
                {/* <Text style={{color:"white",fontSize:10,fontWeight:"bold"}}>2</Text> */}
            </View>
        </View>
    )
}


