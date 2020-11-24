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



const Requests = ({ navigation }) => {

    const { dispatch, state } = useContext(MyContext)
    const { requestsent } = state;
    const [data, setdata] = useState(requestsent)

    useEffect(() => {
        setdata(requestsent)
        const myfunc = async () => {

            const uid = await AsyncStorage.getItem("uid")
            const type = await AsyncStorage.getItem("type")
          

            if (type == "influencer") {
                const ref = await firestore().collection("influencer").where("uid","==",uid)
                ref.get().then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        if(doc.data().requestssent){
                            dispatch({type:"ADD_REQUESTSENT",payload:doc.data().requestssent}) 
                        }else{
                            dispatch({type:"ADD_REQUESTSENT",payload:[]}) 
                        }
                        // console.log(doc.data().requestssent)
                    
                        
                    })
           
                   
                })
            } else {

            }
        }
        myfunc()
    }, [])
    
    
    return (
        <FlatList
            data={requestsent}
            contentContainerStyle={{ paddingBottom: 50 }}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => (
                <View style={{ width: "100%", height: 65, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, justifyContent: "space-around", marginTop: 10 }} >
                    <View style={{ width: WiDTH * 0.15, height: WiDTH * 0.15, borderRadius: 100, backgroundColor: "#f0f2f5", overflow: "hidden" }} >
                        <Image style={{ width: "100%", height: "100%" }} source={{ uri: item.profileimage ? item.profileimage : images[0] }} />
                    </View>
                    <View style={{ width: WiDTH * 0.50, height: "100%", backgroundColor: "#f0f2f500", justifyContent: "center", alignSelf: "flex-end", borderBottomWidth: 0.6, borderBottomColor: "#f0f2f5" }} >
                        <Text numberOfLines={1} style={{ fontWeight: "bold", color: "#2a3659", fontSize: 17, top: -5 ,textTransform:"capitalize"}} >{item.campaigntitle}</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            {/* <View style={{ width: 15, height: 15, borderRadius: 100, backgroundColor: "#007bff", justifyContent: "center", alignItems: "center", marginRight: 5 }}>
                           <Text style={{ fontWeight: "bold", color: "white", fontSize: 10 }} >1</Text>
                             </View> */}
                            <Text style={{ fontWeight: "100", color: "#a0b3c3", fontSize: 14 }} >{ !item.accepted ?"Your request is sent":"Your request is accepted"}</Text>
                        </View>
                    </View>
                    <View style={{ width: WiDTH * 0.25, height: "100%", backgroundColor: "#f0f2f500", justifyContent: "center", alignSelf: "flex-end", borderBottomWidth: 0.6, borderBottomColor: "#f0f2f5" }} >
                        <View style={{ width: 80, height: 30, backgroundColor: "white", borderWidth: 1, alignSelf: "center", borderColor:item.accepted ? "#e7164c": "#409cff", borderRadius: 5, justifyContent: "center", alignItems: "center" }}>
                            <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center",justifyContent:"center" }}>
                                <Text style={{ color:item.accepted ? "#e7164c": "#409cff" }}>{ item.accepted ? " Chat now":"Sent"} </Text>
                                { item.accepted ?
                                null
                                :
                                <Ionicons size={15} color={"#409cff"} name={"check"} />
            }
                            </View>
                        </View>

                    </View>
                </View>
            )}
        />

    )
}



export default Requests