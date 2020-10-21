
import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    ToastAndroid,
    AsyncStorage,
    Picker,
    Image,
    ImageBackground

} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import firestore from "@react-native-firebase/firestore"
import { TextInput, DefaultTheme, TouchableRipple, Modal, Dialog, Paragraph, ActivityIndicator } from "react-native-paper"
import ImagePicker from 'react-native-image-picker';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height


const options = {
    title: 'Select Image',
    storageOptions: {
        skipBackup: true,
        path: 'images',

    },
    quality: 0.6,
};



const AddExperience = ({ navigation, route }) => {

    const [value, setvalue] = useState("")
    const [value2, setvalue2] = useState("")
    const [disable, setdisable] = useState(true)
    const [source, setsource] = useState("")
    const [filename, setfilename] = useState("")
    const [loading, setloading] = useState(null)

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


    useEffect(() => {

        if (value.length >= 80) {
            setdisable(false)
        } else {
            setdisable(true)
        }
    }, [value.length])


    const save = () => {
        if (value.length <= 80) {
            ToastAndroid.show("Please write minimum 80 words", ToastAndroid.LONG)
        } else {

            const func = async () => {

                const docid = await AsyncStorage.getItem("DocId")
                const ref = await firestore().collection("influencer").doc(docid)
                ref.update({
                    about: value.toLowerCase()
                }).then(async () => {
                    ToastAndroid.show("Updated", ToastAndroid.SHORT)
                    navigation.goBack()
                    // await AsyncStorage.setItem("editabout", value)
                })




            }
            func()


        }
    }


    //Selecting images from phone storage

    const imagepicker = () => {
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // alert(response.fileSize)
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                setsource(source)
                setfilename(response.fileName)
                alert(response.fileName)
            }
        });
    }


    // Uploading images to cloud storage 

    const upload = async () => {
        if (!(/\S/.test(value)) || !(/\S/.test(value2))) {
            ToastAndroid.show("Please fill all details", ToastAndroid.SHORT)
        } else if (!source) {
            ToastAndroid.show("Please add logo of company", ToastAndroid.SHORT)
        } else {



            const func = async () => {

                const docid = await AsyncStorage.getItem("DocId")
                const ref = await firestore().collection("influencer").doc(docid)
                const reference = storage().ref(`/images/companieslogos/${filename}`)


                setloading(true)
                
                reference.putFile(source.uri)
                    .then((res) => {
                        // console.log(res);
                        // console.log(res.state);
                        if (res.state == "success") {
                            ToastAndroid.show("Image Uploaded Successfully", ToastAndroid.LONG)
                        } else if (res.state == "running") {
                            ToastAndroid.show("uploading", ToastAndroid.LONG)
                        } else if (res.state == "error") {
                            ToastAndroid.show("Failed to upload Try again", ToastAndroid.LONG)
                            setloading(false)
                        }

                        const imageref = storage().ref(res.metadata.fullPath)
                        imageref
                            .getDownloadURL()
                            .then((url) => {
                                // console.log(url);
                                const insidedata = { companyname: value.toLowerCase(), description: value2.toLowerCase(), url: url }
                                ref.update({
                                    experiences: firestore.FieldValue.arrayUnion(insidedata)
                                }).then(async () => {
                                    ToastAndroid.show("Data Uploaded successfully", ToastAndroid.SHORT)
                                    navigation.goBack()
                                    setloading(false)
                                })

                            })

                    })
                    .catch((e) => {
                        console.log("error to uplaod", e);
                        setloading(false)
                    })







            }
            func()
        }



    }



    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={{ height: HEIGHT, backgroundColor: "white" }} >

                <View style={style.header} >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={style.back} >
                        <Ionicons style={{ marginRight: 10 }} color={"#404852"} size={30} name={"chevron-left"} />
                    </TouchableOpacity>
                    <View style={style.heading} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852" }} >Experience</Text>
                    </View>
                    <TouchableOpacity onPress={() => { upload() }} style={style.chat} >
                        <View style={{ width: 50, height: 30, backgroundColor: disable ? "#007bffCC" : "#007bff", right: 10, justifyContent: "center", alignItems: "center", borderRadius: 5, paddingBottom: 2 }} >
                            <Text style={{ color: "white", fontWeight: "100" }} >Add</Text>
                        </View>
                    </TouchableOpacity>
                </View>


                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    <View style={{ minHeight: 100, width: "95%", marginTop: 40, justifyContent: "center", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, paddingVertical: 10 }} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginLeft: 15, marginBottom: 10 }}>Company / Organization</Text>

                        <View style={{ width: "95%", height: 50, alignSelf: "center", justifyContent: "center", borderRadius: 10, alignItems: "flex-start", paddingHorizontal: 10, marginBottom: 20 }} >
                            <TextInput label={"Company Name"}
                                placeholder={"Company or Organization name"}
                                style={{ width: "100%", height: 50 }}
                                mode={"outlined"}
                                maxLength={200}
                                value={value}
                                onChangeText={(text) => { setvalue(text) }}
                                autoCapitalize={"words"}
                                theme={theme}
                            />
                        </View>
                    </View>




                    <View style={{ minHeight: 100, width: "95%", marginTop: 20, justifyContent: "center", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, paddingVertical: 10 }} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginLeft: 15, marginBottom: 10 }}>Work Description </Text>

                        <View style={{ width: "95%", minHeight: 50, alignSelf: "center", borderRadius: 10, alignItems: "flex-start", paddingHorizontal: 10, marginBottom: 20 }} >
                            <TextInput label={"Description"}
                                placeholder={"Write about your work or role"}
                                style={{ width: "100%", minHeight: 50 }}
                                mode={"outlined"}
                                maxLength={200}
                                value={value2}
                                onChangeText={(text) => { setvalue2(text) }}
                                autoCapitalize={"words"}
                                theme={theme}
                                multiline={true}
                            />
                        </View>

                    </View>



                    <View style={{ minHeight: 100, width: "95%", marginTop: 20, justifyContent: "center", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, paddingVertical: 10 }} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginLeft: 15, marginBottom: 10 }}>Upload Organization Logo</Text>

                        <View style={{ width: "95%", minHeight: 50, overflow: "hidden", paddingTop: 10, alignSelf: "center", justifyContent: "center", borderRadius: 10, alignItems: "flex-start", paddingHorizontal: 10, marginBottom: 10 }} >
                            {source ?
                                <TouchableOpacity activeOpacity={0.9} onPress={() => { navigation.navigate("ImageReview", { uri: source.uri }) }} style={{ width: 80, height: 80, backgroundColor: "white", borderColor: "#1e87fd", borderWidth: 2, borderRadius: 5, justifyContent: "center", alignItems: "center" }}>
                                    <TouchableOpacity activeOpacity={0.9} onPress={() => { setsource(null) }} style={{ width: 40, height: 40, position: "absolute", zIndex: 1, right: -20, top: -20, justifyContent: "center", alignItems: "center" }} >
                                        <View style={{ width: 20, height: 20, elevation: 1, backgroundColor: "white", borderRadius: 100, justifyContent: "center", alignItems: "center" }}>
                                            <Ionicons style={{ borderRadius: 100, backgroundColor: "white" }} color={"#1e87fd"} size={20} name={"x-circle"} />
                                        </View>
                                    </TouchableOpacity>

                                    <ImageBackground style={{ width: "100%", height: "100%" }} resizeMode={"cover"} source={source} >
                                        <View style={{ backgroundColor: "rgba(0, 0, 0, .32)", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                                            <Ionicons name={"eye"} color={"white"} size={25} />
                                        </View>

                                    </ImageBackground>
                                </TouchableOpacity>

                                :
                                <TouchableRipple onPress={() => { imagepicker() }} rippleColor="rgba(0, 0, 0, .32)" style={{ width: 80, height: 80, backgroundColor: "white", borderColor: "#1e87fd", borderWidth: 2, borderRadius: 5, justifyContent: "center", alignItems: "center", overflow: "hidden" }} >
                                    <Ionicons name={"image"} size={50} style={{ alignSelf: "center" }} color={"#1e87fdCC"} />
                                </TouchableRipple>
                            }


                        </View>

                    </View>




                </ScrollView>


            </SafeAreaView>



            <Dialog dismissable={false} visible={loading} >
                <Dialog.Content>
                    <View style={{ flexDirection: "row" }} >
                        <ActivityIndicator color={"#409cff"} size={20} style={{ marginRight: 20 }} />
                        <Paragraph>Uploading...</Paragraph>
                    </View>
                </Dialog.Content>
            </Dialog>




        </>

    )


}


const style = StyleSheet.create({
    header: {
        height: 50,
        width: WiDTH,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        elevation: 1
    },
    back: {
        height: "100%",
        width: WiDTH / 7,
        justifyContent: "center",
        alignItems: "center"
    },
    heading: {
        height: "100%",
        width: WiDTH / 2,
        justifyContent: "center",
        alignItems: "center"
    },
    chat: {
        height: "100%",
        width: WiDTH / 7,
        justifyContent: "center",
        alignItems: "center"
    },


})


export default AddExperience;
