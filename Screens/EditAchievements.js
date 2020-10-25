
import React, { useState, useEffect, useContext } from 'react';
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
    Picker, KeyboardAvoidingView, Keyboard

} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import firestore from "@react-native-firebase/firestore"
import { TextInput, DefaultTheme, Dialog, Paragraph, ActivityIndicator, Button } from "react-native-paper"
import { MyContext } from './AppStartStack';

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

var _ = require('underscore');

const EditAchievements = ({ navigation, route }) => {


    const { state, dispatch } = useContext(MyContext)
    const { achievements } = state
    // console.log(route.params.data)


    const [value, setvalue] = useState(route.params.data.title)
    const [value2, setvalue2] = useState(route.params.data.description)
    const [disable, setdisable] = useState(true)
    const [category, setcategory] = useState(route.params.data.category)
    const [otherinput, setotherinput] = useState(false)
    const [inputcategory, setinputcategory] = useState(route.params.data.othercategory)
    const [shiftview, setshiftview] = useState(false)
    const [loading, setloading] = useState(null)
    const [visible, setvisible] = useState(false)


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





    // Uploading data to cloud storage 

    const upload = async () => {


        if (!(/\S/.test(value))) {
            ToastAndroid.show("Please fill title", ToastAndroid.SHORT)
        } else if (category == "other") {
            if (!(/\S/.test(inputcategory))) {
                ToastAndroid.show("Please fill category", ToastAndroid.SHORT)
            } else {
                Keyboard.dismiss()
                const func = async () => {
                    setloading(true)
                    const docid = await AsyncStorage.getItem("DocId")
                    const ref = await firestore().collection("influencer").doc(docid)






                    const insidedata = { title: value.toLowerCase(), description: !value2 ? null : value2.toLowerCase(), category: category == "other" ? "other" : category, othercategory: category == "other" ? inputcategory : null }
                    // alert(insidedata)

                    ref.update({
                        achievements: firestore.FieldValue.arrayUnion(insidedata)
                    }).then(async () => {
                        ToastAndroid.show("Data Uploaded successfully", ToastAndroid.SHORT)

                        achievements.push(insidedata)
                        dispatch({ type: "ADD_ACHIEVEMENTS", payload: achievements })
                        setloading(false)
                        navigation.goBack()

                    })
                        .catch((e) => {
                            console.log("error to uplaod", e);
                            setloading(false)
                            ToastAndroid.show("Something went wrong", ToastAndroid.SHORT)
                        })









                }
                func()
            }
        } else {
            Keyboard.dismiss()
            const func = async () => {
                setloading(true)
                const docid = await AsyncStorage.getItem("DocId")
                const ref = await firestore().collection("influencer").doc(docid)






                const insidedata = { title: value.toLowerCase(), description: !value2 ? null : value2.toLowerCase(), category: category, othercategory: category == "other" ? inputcategory : null }
                // alert(insidedata)
                removeToUpdate()
                ref.update({
                    achievements: firestore.FieldValue.arrayUnion(insidedata)
                }).then(async () => {
                    ToastAndroid.show("Data Uploaded successfully", ToastAndroid.SHORT)

                    achievements.push(insidedata)
                    dispatch({ type: "ADD_ACHIEVEMENTS", payload: achievements })
                    setloading(false)
                    navigation.goBack()

                })
                    .catch((e) => {
                        console.log("error to uplaod", e);
                        setloading(false)
                        ToastAndroid.show("Something went wrong", ToastAndroid.SHORT)
                    })









            }
            func()

        }





    }

    useEffect(() => {
        if (category == "other") {
            setotherinput(true)
            setshiftview(true)
            Keyboard.dismiss()
        } else {
            setotherinput(false)
            setshiftview(false)
        }

    }, [category])



    const removeToUpdate = async () => {
        setvisible(false)
        const docid = await AsyncStorage.getItem("DocId")
        const ref = await firestore().collection("influencer").doc(docid)


        ref.update({
            achievements: firestore.FieldValue.arrayRemove(route.params.data)
        }).then(async () => {

            const array = _.without(achievements, route.params.data)
            // console.log(array);
            dispatch({ type: "ADD_ACHIEVEMENTS", payload: array })

        })

    }



    const remove = async () => {
        setvisible(false)
        const docid = await AsyncStorage.getItem("DocId")
        const ref = await firestore().collection("influencer").doc(docid)


        ref.update({
            achievements: firestore.FieldValue.arrayRemove(route.params.data)
        }).then(async () => {

            const array = _.without(achievements, route.params.data)
            // console.log(array);
            dispatch({ type: "ADD_ACHIEVEMENTS", payload: array })
            ToastAndroid.show("Achievement removed successfully", ToastAndroid.SHORT)
            navigation.goBack()

        })



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
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852" }} >Achievements</Text>
                    </View>
                    <TouchableOpacity onPress={() => { upload() }} style={style.chat} >
                        <View style={{ width: 50, height: 30, backgroundColor: "#007bff", right: 10, justifyContent: "center", alignItems: "center", borderRadius: 5, paddingBottom: 2 }} >
                            <Text style={{ color: "white", fontWeight: "100" }} >Save</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <KeyboardAvoidingView behavior={"position"} enabled={shiftview} >
                    <View style={{ width: "95%", marginTop: 40, justifyContent: "center", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, paddingVertical: 10 }} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginLeft: 15, marginBottom: 10 }}>Title</Text>

                        <View style={{ width: "95%", height: 50, alignSelf: "center", justifyContent: "center", borderRadius: 10, alignItems: "flex-start", paddingHorizontal: 10, marginBottom: 20 }} >
                            <TextInput label={"Title"}
                                placeholder={"Like Influencer of the year award etc."}
                                style={{ width: "100%", height: 50 }}
                                mode={"outlined"}
                                value={value}
                                onChangeText={(text) => { setvalue(text) }}
                                autoCapitalize={"words"}
                                theme={theme}
                            />
                        </View>
                    </View>




                    <View style={{ minHeight: 100, width: "95%", marginTop: 20, justifyContent: "center", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, paddingVertical: 10 }} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginLeft: 15, marginBottom: 10 }}>Description (Optional)</Text>

                        <View style={{ width: "95%", minHeight: 50, alignSelf: "center", justifyContent: "center", borderRadius: 10, alignItems: "flex-start", paddingHorizontal: 10, marginBottom: 20 }} >
                            <TextInput label={"Description"}
                                placeholder={"Give description about your achievement"}
                                style={{ width: "100%", minHeight: 50 }}
                                mode={"outlined"}
                                multiline={true}
                                maxLength={200}
                                value={value2}
                                onChangeText={(text) => { setvalue2(text) }}
                                autoCapitalize={"words"}
                                theme={theme}
                            />
                        </View>

                    </View>

                    <View style={{ minHeight: 100, width: "95%", marginTop: 20, justifyContent: "center", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, paddingVertical: 10 }} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginLeft: 15, marginBottom: 10 }}>Category</Text>

                        <View style={{ width: "95%", height: 50, overflow: "hidden", alignSelf: "center", justifyContent: "center", borderRadius: 10, alignItems: "flex-start", paddingHorizontal: 10, marginBottom: 20 }} >
                            <View style={{ width: "100%", height: 50, backgroundColor: "white", borderColor: "#1e87fd", borderWidth: 2, borderRadius: 10, justifyContent: "center" }} >
                                <Picker selectedValue={category} onValueChange={(value) => { setcategory(value) }} itemStyle={{ fontWeight: "bold", fontSize: 30 }} mode={"dropdown"} style={{ width: "100%", height: 50 }} >
                                    <Picker.Item label=" Award" value="award" />
                                    <Picker.Item label=" Youtube Views" value="youtube views" />
                                    <Picker.Item label=" Youtube Subscribers" value="youtube subscribers" />
                                    <Picker.Item label=" Instagram Followers" value="instagram followers" />
                                    <Picker.Item label=" Other" value="other" />
                                </Picker>
                            </View>
                        </View>

                        {otherinput ?
                            <View style={{ width: "95%", height: 50, alignSelf: "center", justifyContent: "center", borderRadius: 10, alignItems: "flex-start", paddingHorizontal: 10, marginBottom: 20 }} >
                                <TextInput label={"Other"}
                                    placeholder={"Please type your category"}
                                    style={{ width: "100%", height: 50 }}
                                    mode={"outlined"}
                                    multiline={true}
                                    maxLength={200}
                                    value={inputcategory}
                                    onChangeText={(text) => { setinputcategory(text) }}
                                    autoCapitalize={"words"}
                                    theme={theme}
                                    onFocus={() => { setshiftview(true) }}
                                />
                            </View>
                            :
                            null
                        }

                    </View>




                </KeyboardAvoidingView>


                <TouchableOpacity onPress={() => { setvisible(true) }} style={style.button1} >
                    <Text style={style.button1text} >Remove</Text>
                </TouchableOpacity>




            </SafeAreaView>

            <Dialog dismissable={false} visible={loading} >
                <Dialog.Content>
                    <View style={{ flexDirection: "row" }} >
                        <ActivityIndicator color={"#409cff"} size={20} style={{ marginRight: 20 }} />
                        <Paragraph>Uploading...</Paragraph>
                    </View>
                </Dialog.Content>
            </Dialog>

            <Dialog onDismiss={() => { setvisible(false) }} visible={visible} >
                <Dialog.Content>
                    <View style={{ flexDirection: "row" }} >
                        <Paragraph style={{ fontSize: 18 }}>Are you sure want to delete this achievements.</Paragraph>
                    </View>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button color={"black"} onPress={() => setvisible(false)}>Cancel</Button>
                    <Button color={"red"} onPress={() => { remove() }}>Yes</Button>
                </Dialog.Actions>
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
    button1: {
        width: WiDTH / 2.5,
        height: 45,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#de4229",
        borderWidth: 1.5,
        marginLeft: 10,
        alignSelf: "center",
        top: 30
    },

    button1text: {
        fontSize: 16,
        color: "#de4229",
        fontWeight: 'bold'
    },


})


export default EditAchievements;
