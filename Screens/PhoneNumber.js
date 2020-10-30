
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions,
    Button,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,AsyncStorage,ToastAndroid,
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import auth from '@react-native-firebase/auth';



const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const PhoneNumber = ({ navigation }) => {
    const [loading, setloading] = useState(false);
    const [number, setnumber] = useState('');

    // useEffect(()=>{
    //     const func =async()=>{
    //         const a = await AsyncStorage.getItem("type")
    //         console.log(a);

            
    //     }
    //     func()
    // },[])

    const signInWithPhoneNumber = (phoneNumber) => {
        
        if(number.match(/^[0-9]+$/) && number.length == 10){
            setloading(true)
          
                auth().signInWithPhoneNumber(phoneNumber).then((res) => {
                    setloading(false)
                    // console.log(res);
                    navigation.navigate("OTP", { data: res })
                    // console.log("phonepage", res);
                    ToastAndroid.show("OTP Sent", ToastAndroid.SHORT)
                    // alert("otp sent")
                    
        
                })
            
        }else{
            ToastAndroid.show("Please enter valid number",ToastAndroid.LONG
            )
            setloading(false)
        }
       
      








    }


    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={style.container}>

                <View style={style.header} >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={style.back} >
                        <Ionicons color={"black"} size={28} name={"arrow-left"} />
                    </TouchableOpacity>
                </View>

                <View style={{ backgroundColor: "white", height: HEIGHT / 5, width: "100%", justifyContent: "center", alignItems: "center" }} >
                    <Text style={{ alignSelf: "center", fontSize: 35, fontWeight: "bold", color: "#192537" }} >𝐈𝐍𝐅𝐋𝐔𝐄𝐍𝐙𝐀</Text>
                </View>


                <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: "#404852", left: 30, top: 225, position: "absolute" }} >Enter Your Mobile Number</Text>

                <View style={{ height: 50, width: "85%", flexDirection: "row", alignItems: "center", justifyContent: "center", borderBottomWidth: 2, borderBottomColor: "#192537", position: "absolute", top: 250 }}>
                    <View style={{ width: "20%", height: "100%", backgroundColor: "white", justifyContent: "center", alignItems: "center" }} >
                        <Text style={{ fontSize: 18, fontWeight: "700", color: "#192537" }} >(IN) +91</Text>
                    </View>
                    <View style={{ width: "80%", height: "100%", backgroundColor: "white", justifyContent: "center" }} >
                        <TextInput value={number} onChangeText={text => setnumber(text)} autoCompleteType={"off"} keyboardType={"phone-pad"} maxLength={10} placeholder={"10 Digits Mobile Number"} style={{ fontSize: 18, fontWeight: "700" }} />
                    </View>
                </View>


                {loading ?
                    <View  style={{
                        height: 55, width: "85%", backgroundColor: "#1e87fd"
                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, position: "absolute", bottom: 50
                    }} >
                        <View style={{ height: 52, width: 52, borderRadius: 100, justifyContent: "center", alignItems: "center", backgroundColor: "white", left: 0, position: "absolute" }} >
                            <Ionicons name={"arrow-right"} color={"black"} size={25} />
                        </View>
                       <ActivityIndicator size={20} color={"white"} />
                    </View>

                    :

                    <TouchableOpacity onPress={() => { signInWithPhoneNumber("+91" + `${number}`) }} style={{
                        height: 55, width: "85%", backgroundColor: "#1e87fd"
                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, position: "absolute", bottom: 50
                    }} >
                        <View style={{ height: 52, width: 52, borderRadius: 100, justifyContent: "center", alignItems: "center", backgroundColor: "white", left: 0, position: "absolute" }} >
                            <Ionicons name={"arrow-right"} color={"black"} size={25} />
                        </View>
                        <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: "white" }} >Get OTP</Text>
                    </TouchableOpacity>

                }





            </SafeAreaView>
        </>

    )


}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center"
    },
    header: {
        height: 50,
        width: WiDTH,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
    },
    back: {
        height: "100%",
        width: WiDTH / 7,
        justifyContent: "center",
        alignItems: "center"
    },



})


export default PhoneNumber;
