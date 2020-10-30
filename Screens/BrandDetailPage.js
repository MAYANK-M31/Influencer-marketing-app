
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    AsyncStorage,
    Image, ToastAndroid, BackHandler,
} from 'react-native';
import { TextInput, DefaultTheme } from "react-native-paper"
import Ionicons from "react-native-vector-icons/Feather"



const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const BrandDetailPage = ({ navigation, route }) => {

    const [name, setname] = useState("")
    const [age, setage] = useState("")
    const [email, setemail] = useState("")
    const [city, setcity] = useState("")

    const [disable, setdisable] = useState(true)

    const submit = () => {
        // if (name == "" || age == "" || email == "" || city == "") {
        //     ToastAndroid.show("Please Fill Details", ToastAndroid.SHORT)
        //     // alert("please fill detail")
        // }else{
        //     navigation.navigate("ProfileFourthPage",{name:name,age:age,email:email,city:city,category:route.params.category})
        // }
        navigation.navigate("BrandSocialMediaPage")
    }




    const theme = {
        ...DefaultTheme,
        roundness: 8,
        colors: {
            ...DefaultTheme.colors,
            primary: '#1e87fd',
            accent: '#f1c40f',
            background: "white",
            underlineColor: "transparent"

        },
    };




    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={style.container}>


                <View style={style.header} >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={style.back} >
                        <Ionicons color={"black"} size={28} name={"arrow-left"} />
                    </TouchableOpacity>
                    <View style={{width:"86%",height:"100%",justifyContent:"center"}}>
                    <Text style={{ alignSelf: "center", fontSize: 22, fontWeight: "bold", color: "#404852",alignItems:"center",top:-2 }} >Please Fill Your Detail</Text>
                    </View>
                  
                </View>

                {/* <View style={style.heading} >
                    <Text style={{ alignSelf: "center", fontSize: 32, fontWeight: "bold", color: "#404852" }} >Please Fill Your Detail</Text>
                </View> */}

                <View style={{ width: "100%", paddingHorizontal: 20, position: "absolute", top: 80 }} >

                    <TextInput
                        value={name}
                        onChangeText={(name) => setname(name)}
                        style={{ height: 50 }}
                        mode={"outlined"}
                        underlineColor={"red"}
                        theme={theme}
                        label="Full Name"

                    />

                    <TextInput
                        // value={age}
                        // onChangeText={(age)=>setage(age)}
                        style={{ height: 50, marginTop: 10 }} mode={"outlined"}
                        underlineColor={"red"}
                        theme={theme}
                        label="Brand Name"

                    />

                    <TextInput
                        value={email}
                        onChangeText={(email) => setemail(email)}
                        style={{ height: 50, marginTop: 10 }} mode={"outlined"}
                        underlineColor={"red"}
                        theme={theme}
                        label="Email"

                    />

                    <TextInput
                        value={city}
                        onChangeText={(city) => setcity(city)}
                        style={{ height: 50, marginTop: 10 }} mode={"outlined"}
                        underlineColor={"red"}
                        theme={theme}
                        label="City"

                    />

                    <TextInput

                        style={{ height: 50, marginTop: 10 }} mode={"outlined"}
                        underlineColor={"red"}
                        theme={theme}
                        label="Website(Optional)"
                        placeholder={"Eg. www.xyz.com"}

                    />

                    <TextInput

                        style={{ height: 50, marginTop: 10 }} mode={"outlined"}
                        underlineColor={"red"}
                        theme={theme}
                        label="App Link(Optional)"
                        placeholder={"Eg. https://play.google.com?id=com.xyz"}

                    />

                </View>



                <TouchableOpacity onPress={() => { submit() }} style={{
                    height: 55, width: "85%", backgroundColor: "#1e87fd"
                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, position: "absolute", top: HEIGHT - 85
                }} >
                    <View style={{ height: 52, width: 52, borderRadius: 100, justifyContent: "center", alignItems: "center", backgroundColor: "white", left: 0, position: "absolute" }} >
                        <Ionicons name={"arrow-right"} color={"black"} size={25} />
                    </View>
                    <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: "white" }} >Next</Text>
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
        alignItems: "center",
        width: "100%"
    },
    header: {
        top: 10,
        left: 15,
        position: "absolute",
        flexDirection:"row"
    },
    heading: {
        top: 50,
        left: 15,
        position: "absolute",
    }



})


export default BrandDetailPage;
