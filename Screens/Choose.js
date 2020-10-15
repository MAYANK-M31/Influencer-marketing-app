
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
    AsyncStorage
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"



const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const Choose = ({navigation}) => {


   const  choose=async(item)=>{
    navigation.navigate("PhoneNumber")
    await AsyncStorage.setItem("type",item)
   }



    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={style.container}>

                <View style={style.header} >
                    <Text style={{ alignSelf: "center", fontSize: 42, fontWeight: "bold",color:"#404852" }} >Are you Influencer</Text>
                    <Text style={{ alignSelf: "flex-start", fontSize: 42, fontWeight: "bold",color:"#404852" }} >or Brand ?</Text>
                </View>

                <TouchableOpacity onPress={()=>choose("influencer")} style={{ height: 60, width: 200, backgroundColor: "#1e87fd", alignItems: "center", justifyContent: "center", borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, marginBottom: 20 }} >
                    <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: "white" }} >I'm a Influencer</Text>
                </TouchableOpacity>

                <TouchableOpacity  onPress={()=>choose("brand")} style={{ height: 60, width: 200, backgroundColor: "white", alignItems: "center", justifyContent: "center", borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50 }} >
                    <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: "#404852" }} >I'm a Brand</Text>
                </TouchableOpacity>




            </SafeAreaView>
        </>

    )


}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        top: 10,
        left:15,
        position: "absolute",
    }



})


export default Choose;
