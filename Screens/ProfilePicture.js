
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
    Image, AsyncStorage, ToastAndroid
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import Icons from "react-native-vector-icons/FontAwesome5"
import { Modal, ActivityIndicator } from "react-native-paper"
import ImagePicker from 'react-native-image-picker';
import { MyContext } from './AppStartStack';
import storage from '@react-native-firebase/storage';
import firestore from "@react-native-firebase/firestore"



const options = {
    title: 'Select Image',
    storageOptions: {
        skipBackup: true,
        path: 'images',

    },
    quality: 0.5,
};

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const ProfilePicture = ({ route, navigation }) => {

    const [visible, setvisible] = useState(false)
    const [visible2, setvisible2] = useState(false)
    const [selectimage, setselectimage] = useState(null)
    const [filename, setfilename] = useState("")
    const [loading, setloading] = useState(null)

    const { state, dispatch } = useContext(MyContext)
    const { profileimage } = state





    const launchgallery = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // alert(response.fileSize)
                const source = response.uri;
                setselectimage(source)
                setvisible2(true)
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                // setsource(source)
                setfilename(response.fileName)
                // alert(response.fileName)
            }
        });
    }





    const launchcamera = () => {
        ImagePicker.launchCamera(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // alert(response.fileSize)
                const source = response.uri;
                setselectimage(source)
                setvisible2(true)
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                // setsource(source)
                // setfilename(response.fileName)
                // alert(response.fileName)
            }
        });
    }


    const upload = async () => {
        setloading(true)
        const docid = await AsyncStorage.getItem("DocId")
        const ref = await firestore().collection("influencer").doc(docid)
        const reference = storage().ref(`/images/userprofileimage/${filename}`)

        reference.putFile(selectimage)
            .then((res) => {
                // console.log(res);
                // console.log(res.state);
                if (res.state == "success") {
                    ToastAndroid.show("Image Uploaded Successfully", ToastAndroid.SHORT)
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
                        const profileimageurl = url
                        ref.update({
                            profileimage: profileimageurl
                        }).then(async () => {
                            setloading(false)
                            // ToastAndroid.show("Data Updated successfully", ToastAndroid.SHORT)
                            // ToastAndroid.show("Image Uploaded Successfully", ToastAndroid.SHORT)

                            dispatch({ type: "ADD_PROFILEIMAGE", payload: profileimageurl })
                            setloading(false)
                            // navigation.goBack()

                        })

                    })

            })
            .catch((e) => {
                ToastAndroid.show("Failed to upload try again", ToastAndroid.SHORT)
                setloading(false)
            })

    }

    // seprate the image name from url to remove it from storage for further use
    const ImageNameFinder = (url) => {
        var x = url
        var y = x.split("%2F")
        var x = y[2]
        var y = x.split("?")
        // console.log(y[0]);
        return y[0]


    }





    const remove = async () => {
        const imagename = ImageNameFinder(profileimage)
        setvisible(false)
        setloading(true)
        const docid = await AsyncStorage.getItem("DocId")
        const ref = await firestore().collection("influencer").doc(docid)
        const reference = storage().ref(`/images/userprofileimage/${imagename}`)
        reference.delete().then(() => {
            ref.update({
                profileimage: firestore.FieldValue.delete()
            }).then(async () => {

                setloading(false)
                dispatch({ type: "ADD_PROFILEIMAGE", payload: null })
                ToastAndroid.show("Profile Photo removed successfully", ToastAndroid.SHORT)
                // navigation.goBack()

            })
        })
        .catch((e) => {
            ToastAndroid.show("Failed to remove try again", ToastAndroid.SHORT)
            setloading(false)
        })



    }


    return (
        <>
            <StatusBar barStyle={"light-content"} backgroundColor={"black"} />
            <SafeAreaView style={{ height: HEIGHT, backgroundColor: "white" }} >

                <View style={style.header} >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={style.back} >
                        <Ionicons color={"white"} size={28} name={"chevron-left"} />
                    </TouchableOpacity>
                    <View style={style.heading} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }} >Profile Photo</Text>
                    </View>
                    <TouchableOpacity onPress={() => { setvisible(true) }} style={style.chat} >
                        <Ionicons color={"white"} size={22} name={"edit-2"} />
                    </TouchableOpacity>
                </View>

                <View style={{ backgroundColor: "black", height: HEIGHT - 85 }}  >
                    {loading ?
                        <View style={{ width: "100%", height: "80%", alignItems: "center", justifyContent: "center" }} >
                            <ActivityIndicator color={"#007bff"} size={40} />
                        </View>
                        :
                        <View style={{ width: WiDTH, maxHeight: HEIGHT }} >
                            <Image style={{ width: "100%", height: "100%", resizeMode: "contain" }} source={{ uri: profileimage !== null ? profileimage : "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/82b8e9101650903.5f2369beab58a.jpg" }} />
                        </View>
                    }
                </View>







            </SafeAreaView>


            <Modal visible={visible} onDismiss={() => setvisible(false)}>
                <View style={{ width: WiDTH, height: HEIGHT }}>
                    <TouchableOpacity onPress={() => setvisible(false)} style={{ width: WiDTH, height: HEIGHT * 3 / 4 }}>

                    </TouchableOpacity>
                    <View style={{ width: WiDTH, height: HEIGHT / 4, backgroundColor: "white", position: "absolute", bottom: 0, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
                        <View style={{ width: "100%", height: "35%", justifyContent: "center" }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#2a3659", marginLeft: 20 }} >Profile Photo</Text>
                        </View>
                        <View style={{ width: "100%", height: "55%", justifyContent: "flex-start", flexDirection: "row" }}>

                            {profileimage == null ?
                                null
                                :

                                <TouchableOpacity activeOpacity={1} onPress={() => { remove() }}>
                                    <View style={{ height: 45, width: 45, backgroundColor: "#e7164c", borderRadius: 50, justifyContent: "center", alignItems: "center", marginLeft: 30 }}>
                                        <Icons size={18} color={"white"} name={"trash"} />
                                    </View>

                                    <View style={{ marginLeft: 25, height: 45, width: 60, alignItems: "center", marginTop: 5,left:-2.5 }}>
                                        <Text style={{ fontSize: 14, color: "grey" }}>Remove</Text>
                                        <Text style={{ fontSize: 14, color: "grey", top: -4 }}>photo</Text>
                                    </View>
                                </TouchableOpacity>
                            }


                            <TouchableOpacity activeOpacity={1} onPress={() => { launchgallery() }} >
                                <View style={{ height: 45, width: 45, backgroundColor: "#00ca95", borderRadius: 50, justifyContent: "center", alignItems: "center", marginLeft: 30 }}>
                                    <Icons size={20} color={"white"} name={"image"} />
                                </View>

                                <View style={{ marginLeft: 25, height: 45, width: 60, alignItems: "center", marginTop: 5,left:-2.5 }}>
                                    <Text style={{ fontSize: 14, color: "grey" }}>Gallery</Text>
                                    {/* <Text style={{ fontSize: 14, color: "grey", top: -4 }}>photo</Text> */}
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} onPress={() => { launchcamera() }}>
                                <View style={{ height: 45, width: 45, backgroundColor: "#4285f4", borderRadius: 50, justifyContent: "center", alignItems: "center", marginLeft: 30 }}>
                                    <Icons size={20} color={"white"} name={"camera"} />
                                </View>

                                <View style={{ marginLeft: 25, height: 45, width: 60, alignItems: "center", marginTop: 5,left:-2.5 }}>
                                    <Text style={{ fontSize: 14, color: "grey" }}>Camera</Text>
                                    {/* <Text style={{ fontSize: 14, color: "grey", top: -4 }}>photo</Text> */}
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>


            <Modal visible={visible2} onDismiss={() => setvisible2(false)} >
                <View style={{ width: WiDTH, height: "100%" }}>

                    <View style={style.header} >
                        <TouchableOpacity onPress={() => { setvisible2(false) }} style={style.back} >
                            <Ionicons color={"white"} size={28} name={"x"} />
                        </TouchableOpacity>
                        <View style={style.heading} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }} >Upload</Text>
                        </View>
                        <TouchableOpacity onPress={() => { setvisible(false), setvisible2(false), upload() }} style={style.chat} >
                            <Ionicons color={"white"} size={22} name={"check"} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={{ backgroundColor: "black" }} horizontal={true} pagingEnabled={true} decelerationRate={'fast'} scrollEventThrottle={16} snapToInterval={WiDTH}  >
                        <View style={{ width: WiDTH, maxHeight: HEIGHT }} >
                            <Image style={{ width: "100%", height: "100%", resizeMode: "contain" }} source={{ uri: selectimage }} />
                        </View>
                    </ScrollView>
                </View>
            </Modal>

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
        backgroundColor: "black",
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


export default ProfilePicture;
