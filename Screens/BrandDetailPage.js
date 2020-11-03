
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
    const [brandname, setbrandname] = useState("")
    const [email, setemail] = useState("")
    const [city, setcity] = useState("")
    const [website, setwebsite] = useState("")
    const [applink, setapplink] = useState("")
    const [brandcategory, setbrandcategory] = useState("")

    const [disable, setdisable] = useState(true)

    const submit = () => {
        if (!/[^\s]/.test(name) == true || !/[^\s]/.test(brandname) == true || !/[^\s]/.test(email) == true || !/[^\s]/.test(city) == true) {
            ToastAndroid.show("Please Fill Details", ToastAndroid.SHORT)
        } else {
            if (route.params.category == "other") {
                if (brandcategory == null) {
                    ToastAndroid.show("Please Fill Brand Category", ToastAndroid.SHORT)
                } else {
                    navigation.navigate("BrandSocialMediaPage", {
                        name: name,
                        brandname: brandname,
                        email: email,
                        city: city,
                        website: website,
                        applink: applink,
                        category: route.params.category == "other" ? brandcategory : route.params.category
                    })
                }
            } else {
                navigation.navigate("BrandSocialMediaPage", {
                    name: name,
                    brandname: brandname,
                    email: email,
                    city: city,
                    website: website,
                    applink: applink,
                    category: route.params.category == "other" ? brandcategory : route.params.category
                })
            }

        }
        // navigation.navigate("BrandSocialMediaPage")
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
                    <View style={{ width: "86%", height: "100%", justifyContent: "center" }}>
                        <Text style={{ alignSelf: "center", fontSize: 22, fontWeight: "bold", color: "#404852", alignItems: "center", top: -2 }} >Please Fill Your Detail</Text>
                    </View>

                </View>

                {/* <View style={style.heading} >
                    <Text style={{ alignSelf: "center", fontSize: 32, fontWeight: "bold", color: "#404852" }} >Please Fill Your Detail</Text>
                </View> */}

                <ScrollView keyboardShouldPersistTaps={"handled"} contentContainerStyle={{
                    paddingTop: route.params.category == "other" ? 10 : 40
                    , paddingBottom: 50
                }} style={{ width: "100%", paddingHorizontal: 20, height: HEIGHT * 0.5 }}>
                    <View style={{ zIndex: 10 }} >

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
                            value={brandname}
                            onChangeText={(brandname) => setbrandname(brandname)}
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
                            value={website}
                            onChangeText={(website) => setwebsite(website)}
                            style={{ height: 50, marginTop: 10 }} mode={"outlined"}
                            underlineColor={"red"}
                            theme={theme}
                            label="Website(Optional)"
                            placeholder={"Eg. www.xyz.com"}

                        />

                        <TextInput
                            value={applink}
                            onChangeText={(applink) => setapplink(applink)}
                            style={{ height: 50, marginTop: 10 }} mode={"outlined"}
                            underlineColor={"red"}
                            theme={theme}
                            label="App Link(Optional)"
                            placeholder={"Eg. https://play.google.com?id=com.xyz"}

                        />
                        {route.params.category == "other" ?
                            <TextInput
                                value={brandcategory}
                                onChangeText={(brandcategory) => setbrandcategory(brandcategory)}
                                style={{ height: 50, marginTop: 10 }} mode={"outlined"}
                                underlineColor={"red"}
                                theme={theme}
                                label="Brand Category"


                            />
                            :
                            null
                        }


                    </View>
                </ScrollView>


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
        height: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    heading: {
        top: 50,
        left: 15,
        position: "absolute",
    }



})


export default BrandDetailPage;
