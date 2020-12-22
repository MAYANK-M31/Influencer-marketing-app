
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
    Slider,
    ToastAndroid, ImageBackground, Keyboard
} from 'react-native';
import { TextInput, DefaultTheme, Modal, TouchableRipple, Dialog, Paragraph, ActivityIndicator, Button } from "react-native-paper"
import Ionicons from "react-native-vector-icons/Feather"
import Icons from "react-native-vector-icons/FontAwesome5"
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { FlatList } from 'react-native-gesture-handler';

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height


var _ = require('underscore');


const options = {
    title: 'Select Image',
    storageOptions: {
        skipBackup: true,
        path: 'images',

    },
    quality: 0.6,
};

const images = [
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/82b8e9101650903.5f2369beab58a.jpg",
    "https://image.shutterstock.com/image-illustration/3d-illustration-abstract-background-connection-260nw-651685186.jpg"
]


const BrandPostCampDetail = ({ navigation, route }) => {


    const [value1, setvalue1] = useState(20)
    const [value2, setvalue2] = useState(50)
    const [title, settitle] = useState("")
    const [description, setdescription] = useState("")
    const [paymode, setpaymode] = useState(null)
    const [platform, setplatform] = useState(null)
    const [youtubesubs, setyoutubesubs] = useState(null)
    const [instafollowers, setinstafollowers] = useState(null)
    const [disable, setdisable] = useState(true)
    const [minage, setminage] = useState(18)
    const [maxage, setmaxage] = useState(30)
    const [category, setcategory] = useState(null)
    const [modalvisible, setmodalvisible] = useState(false)
    const [categorychoosen, setcategorychoosen] = useState(false)
    const [othercategory, setothercategory] = useState("")
    const [targetaudience, settargetaudience] = useState(null)
    const [targetregion, settargetregion] = useState(null)
    const [source, setsource] = useState([])
    const [visibleselectimage, setvisibleselectimage] = useState(false)
    const [profilesource, setprofilesource] = useState(null)
    const [backgroundsource, setbackgroundsource] = useState(null)
    const [forprofile, setforprofile] = useState(false)
    const [visibleselectimagelogo, setvisibleselectimagelogo] = useState(false)
    const [sourceupdated, setsourceupdated] = useState(false)


    const [date, setDate] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [datechanged, setdatechanged] = useState(false)
    const [date2changed, setdate2changed] = useState(null)

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        if (event.type == "set") {
            setdatechanged(true)
        }

    };

    const onChange2 = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow2(Platform.OS === 'ios');
        setDate2(currentDate);
        if (event.type == "set") {
            setdate2changed(true)
        }



    };


    //_____________ For profile picture and background(START)________________-

    const launchgallerylogo = () => {
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
                if (forprofile == true) {
                    setvisibleselectimagelogo(false)
                    setprofilesource({ uri: response.uri, filename: response.fileName })
                } else if (forprofile == false) {
                    setvisibleselectimagelogo(false)
                    setbackgroundsource({ uri: response.uri, filename: response.fileName })
                }

            }
        });
    }


    const launchcameralogo = () => {
        ImagePicker.launchCamera(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                if (forprofile == true) {
                    setvisibleselectimagelogo(false)
                    setprofilesource({ uri: response.uri, filename: response.fileName })
                } else if (forprofile == false) {
                    setvisibleselectimagelogo(false)
                    setbackgroundsource({ uri: response.uri, filename: response.fileName })
                }
            }
        });
    }

    //+_________________ For Profile Logo and Background (END)_______________


    // _________For Extra picture upload(START)____________

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

                setvisibleselectimage(false)
                source.push({ uri: response.uri, filename: response.fileName })

                // const source = response.uri;

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                setsourceupdated(false)
                setsource(source)
                setsourceupdated(true)
                // console.log(source);
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
                setvisibleselectimage(false)
                source.push({ uri: response.uri, filename: response.fileName })
                // const source = response.uri;

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                setsourceupdated(false)
                setsource(source)
                setsourceupdated(true)
                // console.log(source);

                // console.log(source);
                // alert(response.fileName)
            }
        });
    }

    // ___________________For Extra picture upload (END)______________

    const removeimage = (item) => {
        var newArray = _.without(source, _.findWhere(source, item));
        setsource(newArray)
    }



    const selectcategory = async (item) => {
        Keyboard.dismiss()
        setcategory(item)
        setcategorychoosen(true)
    }

    const selectaudience = async (item) => {
        Keyboard.dismiss()
        settargetaudience(item)
    }

    const selectregion = async (item) => {
        Keyboard.dismiss()
        settargetregion(item)
    }


    const select = async (item) => {
        Keyboard.dismiss()
        setpaymode(item)
        setdisable(false)
    }

    const select2 = async (item) => {
        Keyboard.dismiss()
        setplatform(item)
        setdisable(false)
    }

    const select3 = async (item) => {
        Keyboard.dismiss()
        setyoutubesubs(item)
        setdisable(false)
    }

    const select4 = async (item) => {
        Keyboard.dismiss()
        setinstafollowers(item)
        setdisable(false)
    }




    // !/[^\s]/.test(title) == true  TO PREVENT USER FOR ENTERINGING ONLY SPACES

    const submit = () => {
        if (!/[^\s]/.test(title) == true || !/[^\s]/.test(description) == true || platform == null || paymode == null || datechanged == false || date2changed == false) {
            if (platform == null) {
                ToastAndroid.show("Please Select Campaign Platform", ToastAndroid.SHORT)
            } else if (!/[^\s]/.test(title) == true || !/[^\s]/.test(description) == true) {
                ToastAndroid.show("Please Fill Campaign Title And Detail", ToastAndroid.SHORT)
            } else if (paymode == null) {
                ToastAndroid.show("Please Select Paymode", ToastAndroid.SHORT)
            } else if (datechanged == false || date2changed == false) {
                ToastAndroid.show("Please Select Campaign Date", ToastAndroid.SHORT)
            }

        } else {
            if (platform == "youtube") {
                if (youtubesubs == null) {
                    ToastAndroid.show("Please Select YouTube Subscriber Range", ToastAndroid.SHORT)
                } else {
                    if (category == null) {
                        ToastAndroid.show("Please Select Category", ToastAndroid.SHORT)
                    } else if (targetaudience == null) {
                        ToastAndroid.show("Please Select Target Audience", ToastAndroid.SHORT)
                    } else if (targetregion == null) {
                        ToastAndroid.show("Please Select Target Region", ToastAndroid.SHORT)
                    } else if (category == "other" && !/[^\s]/.test(othercategory) == true) {

                        ToastAndroid.show("Please Fill Brand Category", ToastAndroid.SHORT)

                    } else {
                        navigation.navigate("BrandSocialConnect", {
                            campaigntitle: title,
                            campaigndescription: description,
                            paymode: paymode,
                            platform: platform,
                            youtubesubs: youtubesubs,
                            instafollowers: instafollowers,
                            minrange: value1,
                            maxrange: value2,
                            minage: minage,
                            maxage: maxage,
                            brandpostcategory: category,
                            brandotherpostcategory: category == "other" ? othercategory : null,
                            targetaudience: targetaudience,
                            targetregion: targetregion,
                            campaignStartDate: date.toDateString(),
                            campaignEndDate: date2.toDateString(),
                            profileimage: profilesource,
                            backgroundimage: backgroundsource,
                            extraimages: source
                        })
                    }

                }
            } else if (platform == "instagram") {
                if (instafollowers == null) {
                    ToastAndroid.show("Please Select Instagram Followers Range", ToastAndroid.SHORT)
                } else {
                    if (category == null) {

                        ToastAndroid.show("Please Select Category", ToastAndroid.SHORT)
                    } else if (targetaudience == null) {
                        ToastAndroid.show("Please Select Target Audience", ToastAndroid.SHORT)
                    } else if (targetregion == null) {
                        ToastAndroid.show("Please Select Target Region", ToastAndroid.SHORT)
                    } else if (category == "other" && !/[^\s]/.test(othercategory) == true) {

                        ToastAndroid.show("Please Fill Brand Category", ToastAndroid.SHORT)

                    } else {
                        navigation.navigate("BrandSocialConnect", {

                            campaigntitle: title,
                            campaigndescription: description,
                            paymode: paymode,
                            platform: platform,
                            youtubesubs: youtubesubs,
                            instafollowers: instafollowers,
                            minrange: value1,
                            maxrange: value2,
                            minage: minage,
                            maxage: maxage,
                            brandpostcategory: category,
                            brandotherpostcategory: category == "other" ? othercategory : null,
                            targetaudience: targetaudience,
                            targetregion: targetregion,
                            campaignStartDate: date.toDateString(),
                            campaignEndDate: date2.toDateString(),
                            profileimage: profilesource,
                            backgroundimage: backgroundsource,
                            extraimages: source
                        })
                    }
                }
            } else if (platform == "both") {
                if (instafollowers == null || youtubesubs == null) {
                    ToastAndroid.show("Please Select Instagram Followers and Youtube Subscriber Range", ToastAndroid.SHORT)
                } else {
                    if (category == null) {
                        ToastAndroid.show("Please Select Category", ToastAndroid.SHORT)
                    } else if (targetaudience == null) {
                        ToastAndroid.show("Please Select Target Audience", ToastAndroid.SHORT)
                    } else if (targetregion == null) {
                        ToastAndroid.show("Please Select Target Region", ToastAndroid.SHORT)
                    } else if (category == "other" && !/[^\s]/.test(othercategory) == true) {

                        ToastAndroid.show("Please Fill Brand Category", ToastAndroid.SHORT)

                    } else {
                        navigation.navigate("BrandSocialConnect", {

                            campaigntitle: title,
                            campaigndescription: description,
                            paymode: paymode,
                            platform: platform,
                            youtubesubs: youtubesubs,
                            instafollowers: instafollowers,
                            minrange: value1,
                            maxrange: value2,
                            minage: minage,
                            maxage: maxage,
                            brandpostcategory: category,
                            brandotherpostcategory: category == "other" ? othercategory : null,
                            targetaudience: targetaudience,
                            targetregion: targetregion,
                            campaignStartDate: date.toDateString(),
                            campaignEndDate: date2.toDateString(),
                            profileimage: profilesource,
                            backgroundimage: backgroundsource,
                            extraimages: source
                        })
                    }
                }

            }
        }



    }

    // ___________________Skip Posting Data___________________



    const theme = {
        ...DefaultTheme,
        roundness: 8,
        colors: {
            ...DefaultTheme.colors,
            primary: '#1e87fd',
            accent: 'white',
            background: "white",
            underlineColor: "transparent"

        },
    };



    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={style.container}>


                <View style={style.header} >
                    <View style={style.back} >
                        <TouchableRipple onPress={() => navigation.goBack()} borderless={true} rippleColor={"rbg(0,0,0,0.32)"} style={{ width: 35, height: 35, borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                            <Ionicons color={"black"} size={28} name={"chevron-left"} />
                        </TouchableRipple>
                    </View>
                    <TouchableOpacity onPress={() => { submit() }} style={{ height: 30, width: 60, borderRadius: 50, backgroundColor: "#1e87fd", justifyContent: "center", alignItems: "center", position: "absolute", right: 15 }}>
                        <Text style={{ color: "white", fontWeight: "100", alignSelf: "center" }} >Next</Text>
                    </TouchableOpacity>

                </View>

                <ScrollView keyboardShouldPersistTaps={"always"} style={{ width: "100%", height: HEIGHT }} contentContainerStyle={{ paddingBottom: 160 }} >
                    <View style={style.heading} >
                        <Text style={{ alignSelf: "flex-start", fontSize: 35, fontWeight: "bold", color: "#404852" }} >Post about your brand</Text>
                        <Text style={{ alignSelf: "flex-start", fontSize: 35, fontWeight: "bold", color: "#404852", top: -8 }} >Campaign</Text>
                    </View>

                    <TouchableOpacity onPress={() => { setvisibleselectimagelogo(true), setforprofile(false), Keyboard.dismiss() }} activeOpacity={1}>
                        <ImageBackground style={{ width: WiDTH * 0.95, height: 160, alignSelf: "center", backgroundColor: "#f0f2f5", top: 10, borderTopRightRadius: 10, borderTopLeftRadius: 10, alignItems: "flex-end", justifyContent: "flex-end", overflow: "hidden" }} source={{ uri: backgroundsource ? backgroundsource.uri : images[1] }}  >

                            <TouchableOpacity onPress={() => { setvisibleselectimagelogo(true), setforprofile(false), Keyboard.dismiss() }} style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center", marginBottom: 5, marginRight: 5 }} >
                                <Ionicons color={"white"} size={22} name={"plus-circle"} />
                            </TouchableOpacity>
                        </ImageBackground>
                    </TouchableOpacity>

                    <View style={style.topprofile} >
                        <View style={{ borderRadius: 30, height: 150, width: 150, overflow: "hidden", elevation: 5, zIndex: 10, borderWidth: 3, borderColor: profilesource ? "white" : "#007bff" }}>
                            <TouchableOpacity onPress={() => { setvisibleselectimagelogo(true), setforprofile(true), Keyboard.dismiss() }} activeOpacity={1}>

                                <ImageBackground style={{ width: "100%", height: "100%", backgroundColor: "#f0f2f5", alignItems: "flex-end", justifyContent: "flex-end" }} source={{ uri: profilesource ? profilesource.uri : images[0] }} >
                                    {profilesource ?
                                        null
                                        :
                                        <View style={{ width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.32)", position: "absolute", justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 40, alignSelf: "center" }}>Logo</Text>
                                        </View>
                                    }
                                    <TouchableOpacity onPress={() => { setvisibleselectimagelogo(true), setforprofile(true), Keyboard.dismiss() }} style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center", marginBottom: 5, marginRight: 5 }} >
                                        <Ionicons color={"white"} size={22} name={"plus-circle"} />
                                    </TouchableOpacity>

                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TextInput
                        value={title}
                        onChangeText={(text) => { settitle(text) }}
                        style={{ height: 50, width: "90%", backgroundColor: "white", alignSelf: "center", fontSize: 18, marginTop: 20 }}
                        mode={"outlined"}
                        underlineColor={"grey"}
                        theme={theme}
                        label="Campign Title"


                    />

                    <TextInput
                        value={description}
                        onChangeText={(text) => { setdescription(text) }}
                        style={{ maxHeight: 300, width: "90%", backgroundColor: "white", alignSelf: "center", fontSize: 18, marginTop: 20 }}
                        mode={"outlined"}
                        underlineColor={"grey"}
                        theme={theme}
                        multiline={true}
                        label="Campign Description"


                    />

                    {/* <View style={{ height: 2, width: "60%", backgroundColor: "#f2f2f2",marginVertical:30,alignSelf:"center" }} >

                    </View> */}



                    <View style={{
                        flexWrap: "wrap", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginTop: 30

                    }} >
                        <Text style={{ alignSelf: "flex-start", fontSize: 28, fontWeight: "bold", color: "#404852" }} >Select Campaign Platform</Text>
                        <TouchableOpacity activeOpacity={1} onPress={() => { select2("instagram"), setinstafollowers(null) }} style={{
                            height: 55, width: "40%", backgroundColor: platform == "instagram" ? "#1e87fd" : "white"
                            , alignItems: "center", flexDirection: "row", justifyContent: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 10,
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: platform == "instagram" ? "white" : "#1e87fd" }} >Instagram</Text>
                            {platform == "instagram" ?
                                <Ionicons style={{ right: 6, position: "absolute" }} name={'check'} color={"white"} size={20} />
                                : null
                            }

                        </TouchableOpacity>

                        <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: "#1e87fd" }} >OR</Text>
                        <TouchableOpacity activeOpacity={1} onPress={() => { select2("youtube"), setyoutubesubs(null) }} style={{
                            height: 55, width: "40%", backgroundColor: platform == "youtube" ? "#1e87fd" : "white"
                            , alignItems: "center", flexDirection: "row", justifyContent: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 10,
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: platform == "youtube" ? "white" : "#1e87fd" }} >YouTube</Text>
                            {platform == "youtube" ?
                                <Ionicons style={{ right: 8, position: "absolute" }} name={'check'} color={"white"} size={20} />
                                : null
                            }
                        </TouchableOpacity>



                        <TouchableOpacity activeOpacity={1} onPress={() => {
                            select2("both"), setyoutubesubs(null), setinstafollowers(null
                            )
                        }} style={{
                            height: 55, width: "92%", backgroundColor: "#1e87fd"
                            , alignItems: "center", flexDirection: "row", justifyContent: "center", alignSelf: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 10,
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: "white" }} >Both</Text>
                            {platform == "both" ?
                                <Ionicons style={{ right: 15, position: "absolute" }} name={'check'} color={"white"} size={20} />
                                : null
                            }
                        </TouchableOpacity>

                    </View>


                    {/* _____________________YOUTUBE SUBSCRIBER RANGE SELECTOR ____________________*/}

                    {platform == "youtube" ?
                        <View>
                            <Text style={{ alignSelf: "flex-start", fontSize: 28, fontWeight: "bold", color: "#404852", marginTop: 20, left: 20 }} >Subscriber Range</Text>
                            <View style={{ flexWrap: "wrap", width: "100%", flexDirection: "row", paddingHorizontal: 20, alignItems: "center" }} >

                                <TouchableOpacity activeOpacity={1} onPress={() => select3("1K-10K")} style={{
                                    height: 45, width: "30%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: youtubesubs == "1K-10K" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "1K-10K" ? "white" : "#1e87fd" }} >1K-10K</Text>
                                </TouchableOpacity>

                                <TouchableOpacity activeOpacity={1} onPress={() => select3("10K-50K")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: youtubesubs == "10K-50K" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "10K-50K" ? "white" : "#1e87fd" }} >10K-50K</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select3("50K-100K")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: youtubesubs == "50K-100K" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "50K-100K" ? "white" : "#1e87fd" }} >50K-100K</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select3("100K-500K")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: youtubesubs == "100K-500K" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "100K-500K" ? "white" : "#1e87fd" }} >100K-500K</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select3("500K-1M")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: youtubesubs == "500K-1M" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "500K-1M" ? "white" : "#1e87fd" }} >500K-1M</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select3("1M-5M")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: youtubesubs == "1M-5M" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "1M-5M" ? "white" : "#1e87fd" }} >1M-5M</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select3("5M-10M")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: youtubesubs == "5M-10M" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "5M-10M" ? "white" : "#1e87fd" }} >5M-10M</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select3("10M-20M")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: youtubesubs == "10M-20M" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "10M-20M" ? "white" : "#1e87fd" }} >10M-20M</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select3("20M+")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: youtubesubs == "20M+" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "20M+" ? "white" : "#1e87fd" }} >20M+</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                        :
                        null
                    }


                    {/* ______________________INSTAGRAM FOLLOWERS____________________ */}

                    {platform == "instagram" ?
                        <View>
                            <Text style={{ alignSelf: "flex-start", fontSize: 28, fontWeight: "bold", color: "#404852", marginTop: 20, left: 20 }} >Followers Range</Text>
                            <View style={{ flexWrap: "wrap", width: "100%", flexDirection: "row", paddingHorizontal: 20, alignItems: "center" }} >

                                <TouchableOpacity activeOpacity={1} onPress={() => select4("1K-10K")} style={{
                                    height: 45, width: "30%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: instafollowers == "1K-10K" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "1K-10K" ? "white" : "#1e87fd" }} >1K-10K</Text>
                                </TouchableOpacity>

                                <TouchableOpacity activeOpacity={1} onPress={() => select4("10K-50K")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: instafollowers == "10K-50K" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "10K-50K" ? "white" : "#1e87fd" }} >10K-50K</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select4("50K-100K")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: instafollowers == "50K-100K" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "50K-100K" ? "white" : "#1e87fd" }} >50K-100K</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select4("100K-500K")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: instafollowers == "100K-500K" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "100K-500K" ? "white" : "#1e87fd" }} >100K-500K</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select4("500K-1M")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: instafollowers == "500K-1M" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "500K-1M" ? "white" : "#1e87fd" }} >500K-1M</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select4("1M-5M")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: instafollowers == "1M-5M" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "1M-5M" ? "white" : "#1e87fd" }} >1M-5M</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select4("5M-10M")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: instafollowers == "5M-10M" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "5M-10M" ? "white" : "#1e87fd" }} >5M-10M</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select4("10M-20M")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: instafollowers == "10M-20M" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "10M-20M" ? "white" : "#1e87fd" }} >10M-20M</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select4("20M+")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: instafollowers == "20M+" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "20M+" ? "white" : "#1e87fd" }} >20M+</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                        :
                        null
                    }

                    {/* _______________________________BOTH PLATFORM SUBSCRIBER AND FOLLOWERS SELECTOR_____________________________ */}

                    {platform == "both" ?
                        <View>
                            <View>
                                <Text style={{ alignSelf: "flex-start", fontSize: 28, fontWeight: "bold", color: "#404852", marginTop: 20, left: 20 }} >Followers Range</Text>
                                <View style={{ flexWrap: "wrap", width: "100%", flexDirection: "row", paddingHorizontal: 20, alignItems: "center" }} >

                                    <TouchableOpacity activeOpacity={1} onPress={() => select4("1K-10K")} style={{
                                        height: 45, width: "30%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: instafollowers == "1K-10K" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "1K-10K" ? "white" : "#1e87fd" }} >1K-10K</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity activeOpacity={1} onPress={() => select4("10K-50K")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: instafollowers == "10K-50K" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "10K-50K" ? "white" : "#1e87fd" }} >10K-50K</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select4("50K-100K")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: instafollowers == "50K-100K" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "50K-100K" ? "white" : "#1e87fd" }} >50K-100K</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select4("100K-500K")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: instafollowers == "100K-500K" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "100K-500K" ? "white" : "#1e87fd" }} >100K-500K</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select4("500K-1M")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: instafollowers == "500K-1M" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "500K-1M" ? "white" : "#1e87fd" }} >500K-1M</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select4("1M-5M")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: instafollowers == "1M-5M" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "1M-5M" ? "white" : "#1e87fd" }} >1M-5M</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select4("5M-10M")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: instafollowers == "5M-10M" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "5M-10M" ? "white" : "#1e87fd" }} >5M-10M</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select4("10M-20M")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: instafollowers == "10M-20M" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "10M-20M" ? "white" : "#1e87fd" }} >10M-20M</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select4("20M+")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: instafollowers == "20M+" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "20M+" ? "white" : "#1e87fd" }} >20M+</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>


                            <View>
                                <Text style={{ alignSelf: "flex-start", fontSize: 28, fontWeight: "bold", color: "#404852", marginTop: 20, left: 20 }} >Subscriber Range</Text>
                                <View style={{ flexWrap: "wrap", width: "100%", flexDirection: "row", paddingHorizontal: 20, alignItems: "center" }} >

                                    <TouchableOpacity activeOpacity={1} onPress={() => select3("1K-10K")} style={{
                                        height: 45, width: "30%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: youtubesubs == "1K-10K" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "1K-10K" ? "white" : "#1e87fd" }} >1K-10K</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity activeOpacity={1} onPress={() => select3("10K-50K")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: youtubesubs == "10K-50K" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "10K-50K" ? "white" : "#1e87fd" }} >10K-50K</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select3("50K-100K")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: youtubesubs == "50K-100K" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "50K-100K" ? "white" : "#1e87fd" }} >50K-100K</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select3("100K-500K")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: youtubesubs == "100K-500K" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "100K-500K" ? "white" : "#1e87fd" }} >100K-500K</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select3("500K-1M")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: youtubesubs == "500K-1M" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "500K-1M" ? "white" : "#1e87fd" }} >500K-1M</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select3("1M-5M")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: youtubesubs == "1M-5M" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "1M-5M" ? "white" : "#1e87fd" }} >1M-5M</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select3("5M-10M")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: youtubesubs == "5M-10M" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "5M-10M" ? "white" : "#1e87fd" }} >5M-10M</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select3("10M-20M")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: youtubesubs == "10M-20M" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "10M-20M" ? "white" : "#1e87fd" }} >10M-20M</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select3("20M+")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: youtubesubs == "20M+" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "20M+" ? "white" : "#1e87fd" }} >20M+</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>

                        :
                        null
                    }




                    <View style={{ flexWrap: "wrap", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginTop: 30 }} >
                        <Text style={{ alignSelf: "flex-start", fontSize: 28, fontWeight: "bold", color: "#404852" }} >Select Paymode</Text>
                        <TouchableOpacity activeOpacity={1} onPress={() => select("barter")} style={{
                            height: 55, width: "40%", backgroundColor: paymode == "barter" ? "#1e87fd" : "white"
                            , alignItems: "center", flexDirection: "row", justifyContent: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 10,
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: paymode == "barter" ? "white" : "#1e87fd" }} >Barter</Text>
                            {paymode == "barter" ?
                                <Ionicons style={{ right: 15, position: "absolute" }} name={'check'} color={"white"} size={20} />
                                : null
                            }

                        </TouchableOpacity>

                        <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: "#1e87fd" }} >OR</Text>
                        <TouchableOpacity activeOpacity={1} onPress={() => select("pay")} style={{
                            height: 55, width: "40%", backgroundColor: paymode == "pay" ? "#1e87fd" : "white"
                            , alignItems: "center", flexDirection: "row", justifyContent: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 10,
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: paymode == "pay" ? "white" : "#1e87fd" }} >Pay</Text>
                            {paymode == "pay" ?
                                <Ionicons style={{ right: 15, position: "absolute" }} name={'check'} color={"white"} size={20} />
                                : null
                            }
                        </TouchableOpacity>



                        <TouchableOpacity activeOpacity={1} onPress={() => select("both")} style={{
                            height: 55, width: "94%", backgroundColor: "#1e87fd"
                            , alignItems: "center", flexDirection: "row", justifyContent: "center", alignSelf: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 10,
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: "white" }} >Any of both</Text>
                            {paymode == "both" ?
                                <Ionicons style={{ right: 15, position: "absolute" }} name={'check'} color={"white"} size={20} />
                                : null
                            }
                        </TouchableOpacity>

                    </View>



                    <View style={{ height: 2, width: "60%", backgroundColor: "#f2f2f2", alignSelf: "center", marginVertical: 20 }} >

                    </View>


                    <View style={{ width: "90%", minHeight: 100, alignSelf: "center", marginBottom: 30 }} >
                        <Text style={{ alignSelf: "flex-start", fontSize: 28, fontWeight: "bold", color: "#404852" }} >Budget Range</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View>
                                <View style={{ height: 60, width: 60, borderColor: "#1e87fd", borderWidth: 1.5, alignItems: "center", justifyContent: "center", borderRadius: 50, top: 25 }} >
                                    <Text style={{ color: "#1e87fd", fontWeight: "bold" }} >{value1}K</Text>
                                </View>
                                <Text style={{ color: "#9e9e9e", fontWeight: "100", top: 30, alignSelf: "center" }} >Min</Text>
                            </View>

                            <View style={{ height: 60, width: "60%", borderColor: "#1e87fd", borderWidth: 1.5, alignItems: "center", justifyContent: "center", borderRadius: 10, top: 25 }} >
                                {/* <Slider thumbTintColor={"#1e87fd"} minimumTrackTintColor={"#1e87fd"} style={{ width: "100%" }} /> */}
                                <MultiSlider
                                    values={[value1, value2]}
                                    onValuesChange={([value1, value2]) => { setvalue1(value1), setvalue2(value2) }}

                                    allowOverlap={false}
                                    sliderLength={WiDTH - 220}
                                    selectedStyle={{ backgroundColor: "#1e87fd" }}
                                    markerStyle={{ backgroundColor: "#1e87fd" }}
                                    min={1}
                                    max={100}
                                    step={1}
                                />
                            </View>


                            <View>
                                <View style={{ height: 60, width: 60, borderColor: "#1e87fd", borderWidth: 1.5, alignItems: "center", justifyContent: "center", borderRadius: 50, top: 25 }} >
                                    <Text style={{ color: "#1e87fd", fontWeight: "bold" }} >{value2}K</Text>
                                </View>
                                <Text style={{ color: "#9e9e9e", fontWeight: "100", top: 30, alignSelf: "center" }} >Max</Text>
                            </View>
                        </View>

                    </View>


                    <View style={{ height: 2, width: "60%", backgroundColor: "#f2f2f2", alignSelf: "center", marginVertical: 20 }} >

                    </View>


                    <View style={{ width: "90%", minHeight: 100, alignSelf: "center" }} >
                        <Text style={{ alignSelf: "flex-start", fontSize: 28, fontWeight: "bold", color: "#404852" }} >Influencer Age</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View>
                                <View style={{ height: 60, width: 60, borderColor: "#1e87fd", borderWidth: 1.5, alignItems: "center", justifyContent: "center", borderRadius: 50, top: 25 }} >
                                    <Text style={{ color: "#1e87fd", fontWeight: "bold" }} >{minage}yr</Text>
                                </View>
                                <Text style={{ color: "#9e9e9e", fontWeight: "100", top: 30, alignSelf: "center" }} >Min</Text>
                            </View>

                            <View style={{ height: 60, width: "60%", borderColor: "#1e87fd", borderWidth: 1.5, alignItems: "center", justifyContent: "center", borderRadius: 10, top: 25 }} >
                                {/* <Slider thumbTintColor={"#1e87fd"} minimumTrackTintColor={"#1e87fd"} style={{ width: "100%" }} /> */}
                                <MultiSlider
                                    values={[minage, maxage]}
                                    onValuesChange={([minage, maxage]) => { setminage(minage), setmaxage(maxage) }}

                                    allowOverlap={false}
                                    sliderLength={WiDTH - 220}
                                    selectedStyle={{ backgroundColor: "#1e87fd" }}
                                    markerStyle={{ backgroundColor: "#1e87fd" }}
                                    min={1}
                                    max={60}
                                    step={1}
                                />
                            </View>


                            <View>
                                <View style={{ height: 60, width: 60, borderColor: "#1e87fd", borderWidth: 1.5, alignItems: "center", justifyContent: "center", borderRadius: 50, top: 25 }} >
                                    <Text style={{ color: "#1e87fd", fontWeight: "bold" }} >{maxage}yr</Text>
                                </View>
                                <Text style={{ color: "#9e9e9e", fontWeight: "100", top: 30, alignSelf: "center" }} >Max</Text>
                            </View>
                        </View>

                    </View>

                    <View style={{ height: 2, width: "60%", backgroundColor: "#f2f2f2", alignSelf: "center", marginVertical: 20, marginTop: 50 }} >

                    </View>

                    <View  >
                        <Text style={{ alignSelf: "flex-start", fontSize: 28, fontWeight: "bold", color: "#404852", left: 20 }} >Brand Category</Text>
                        <TouchableOpacity onPress={() => setmodalvisible(true)} style={{
                            height: 55, width: "94%", backgroundColor: categorychoosen ? "#1e87fd" : "white"
                            , alignItems: "center", flexDirection: "row", justifyContent: "center", alignSelf: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, marginTop: 20
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 17, fontWeight: "bold", color: categorychoosen ? "white" : "#1e87fd", textTransform: "capitalize" }} >{categorychoosen ? `${category}` : "Choose Brand Category"}</Text>
                            {categorychoosen ?
                                <Ionicons style={{ right: 15, position: "absolute" }} name={'check'} color={"white"} size={20} />
                                : null
                            }
                        </TouchableOpacity>
                        {category == "other" ?
                            <TextInput
                                value={othercategory}
                                onChangeText={(text) => { setothercategory(text) }}
                                style={{ height: 50, width: "90%", backgroundColor: "white", alignSelf: "center", fontSize: 18, marginTop: 20 }}
                                mode={"outlined"}
                                underlineColor={"grey"}
                                theme={theme}
                                label="Other Category"


                            />
                            :
                            null
                        }

                    </View>


                    <View style={{ height: 2, width: "60%", backgroundColor: "#f2f2f2", alignSelf: "center", marginVertical: 20, marginTop: 30 }} ></View>

                    {/*__________________ Traget Audience ___________________________*/}

                    <View style={{ maxHeight: 170 }} >
                        <Text style={{ alignSelf: "flex-start", fontSize: 28, fontWeight: "bold", color: "#404852", left: 20 }} >Target Audience</Text>

                        <View style={{ flexWrap: "wrap", width: "100%", flexDirection: "row", alignItems: "center", height: "100%", padding: 5, paddingLeft: 20, marginTop: 10 }} >

                            <TouchableOpacity activeOpacity={1} onPress={() => { selectaudience("14-18") }} style={{
                                height: 45, width: "45%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                backgroundColor: targetaudience == "14-18" ? "#1e87fd" : "white"
                            }} >
                                <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: targetaudience == "14-18" ? "white" : "#1e87fd" }} >14-18 years</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} onPress={() => { selectaudience("18-24") }} style={{
                                height: 45, width: "45%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                backgroundColor: targetaudience == "18-24" ? "#1e87fd" : "white"
                            }} >
                                <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: targetaudience == "18-24" ? "white" : "#1e87fd" }} >18-24 years</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} onPress={() => { selectaudience("24-35") }} style={{
                                height: 45, width: "45%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                backgroundColor: targetaudience == "24-35" ? "#1e87fd" : "white"
                            }} >
                                <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: targetaudience == "24-35" ? "white" : "#1e87fd" }} >24-35 years</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} onPress={() => { selectaudience("35+") }} style={{
                                height: 45, width: "45%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                backgroundColor: targetaudience == "35+" ? "#1e87fd" : "white"
                            }} >
                                <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: targetaudience == "35+" ? "white" : "#1e87fd" }} >35 years+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ height: 2, width: "60%", backgroundColor: "#f2f2f2", alignSelf: "center", marginVertical: 20 }} ></View>

                    {/*__________________ Traget Audience ___________________________*/}

                    <View style={{ height: 220 }} >
                        <Text style={{ alignSelf: "flex-start", fontSize: 28, fontWeight: "bold", color: "#404852", left: 20 }} >Target Region</Text>

                        <View style={{ flexWrap: "wrap", width: "100%", flexDirection: "row", alignItems: "center", height: "100%", padding: 5, paddingLeft: 20, marginTop: 10 }} >

                            <TouchableOpacity activeOpacity={1} onPress={() => { settargetregion("north india") }} style={{
                                height: 45, width: "45%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                backgroundColor: targetregion == "north india" ? "#1e87fd" : "white"
                            }} >
                                <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: targetregion == "north india" ? "white" : "#1e87fd" }} >North India</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} onPress={() => { settargetregion("west india") }} style={{
                                height: 45, width: "45%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                backgroundColor: targetregion == "west india" ? "#1e87fd" : "white"
                            }} >
                                <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: targetregion == "west india" ? "white" : "#1e87fd" }} >West India</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} onPress={() => { settargetregion("east india") }} style={{
                                height: 45, width: "45%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                backgroundColor: targetregion == "east india" ? "#1e87fd" : "white"
                            }} >
                                <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: targetregion == "east india" ? "white" : "#1e87fd" }} >East India</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} onPress={() => { settargetregion("south india") }} style={{
                                height: 45, width: "45%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                backgroundColor: targetregion == "south india" ? "#1e87fd" : "white"
                            }} >
                                <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: targetregion == "south india" ? "white" : "#1e87fd" }} >South India</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={() => { settargetregion("all india") }} style={{
                                height: 45, width: "45%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                backgroundColor: targetregion == "all india" ? "#1e87fd" : "white"
                            }} >
                                <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: targetregion == "all india" ? "white" : "#1e87fd" }} >All India</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ height: 2, width: "60%", backgroundColor: "#f2f2f2", alignSelf: "center", marginVertical: 20 }} ></View>

                    {/*__________________ Campaign Date ___________________________*/}

                    <View style={{ minHeight: 50 }} >
                        <Text style={{ alignSelf: "flex-start", fontSize: 28, fontWeight: "bold", color: "#404852", left: 20 }} >Campaign Date</Text>

                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", paddingHorizontal: 10, marginTop: 15 }}>
                            <TouchableOpacity activeOpacity={1} onPress={() => { setShow(true) }} style={{
                                height: 45, width: "38%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                backgroundColor: "white"
                            }} >
                                <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: "#1e87fd" }} >{datechanged ? date.toDateString().split(" ")[2] + "th" + " " + date.toDateString().split(" ")[1] + " " + date.toDateString().split(" ")[3] : "Start Date"}</Text>
                            </TouchableOpacity>

                            <View style={{ width: "10%", height: 2, backgroundColor: "#1e87fd44", borderRadius: 100 }} ></View>

                            <TouchableOpacity activeOpacity={1} onPress={() => { setShow2(true) }} style={{
                                height: 45, width: "38%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                backgroundColor: "white"
                            }} >
                                <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: "#1e87fd" }} >{date2changed ? date2.toDateString().split(" ")[2] + "th" + " " + date2.toDateString().split(" ")[1] + " " + date2.toDateString().split(" ")[3] : "End Date"}</Text>
                            </TouchableOpacity>
                        </View>
                        {show ?
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                                minimumDate={new Date()}
                                maximumDate={date2changed ? date2 : new Date(2100,12)}
                            />
                            :
                            null
                        }

                        {show2 ?
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date2}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange2}
                                minimumDate={date}
                                
                            />
                            :
                            null
                        }

                    </View>


                    {/* Image upload for campaign */}

                    <View style={{ minHeight: 100, width: "95%", marginTop: 20, justifyContent: "center", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, paddingVertical: 10 }} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginLeft: 15, marginBottom: 10 }}>Upload Campaign Images</Text>

                        <View style={{ flexWrap: "wrap", flexDirection: "row", width: "100%", minHeight: 50, paddingHorizontal: 6 }}>


                            {source.length > 0 ?
                                <>
                                    {sourceupdated ?
                                    <>
                                        {
                                            source.map((item) =>
                                                <TouchableOpacity activeOpacity={0.9} onPress={() => { navigation.navigate("ImageReviewScroll", { items: source,item:item }) }} style={{ width: 80, height: 80, margin: 5, backgroundColor: "white", borderColor: "#1e87fd", borderWidth: 2, borderRadius: 5, justifyContent: "center", alignItems: "center" }}>
                                                    <TouchableOpacity activeOpacity={0.9} onPress={() => { removeimage(item) }} style={{ width: 40, height: 40, position: "absolute", zIndex: 1, right: -20, top: -20, justifyContent: "center", alignItems: "center" }} >
                                                        <View style={{ width: 20, height: 20, elevation: 1, backgroundColor: "white", borderRadius: 100, justifyContent: "center", alignItems: "center" }}>
                                                            <Ionicons style={{ borderRadius: 100, backgroundColor: "white" }} color={"#1e87fd"} size={20} name={"x-circle"} />
                                                        </View>
                                                    </TouchableOpacity>


                                                    <ImageBackground style={{ width: "100%", height: "100%" }} resizeMode={"cover"} source={{ uri: item.uri }} >
                                                        <View style={{ backgroundColor: "rgba(0, 0, 0, .32)", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                                                            <Ionicons name={"eye"} color={"white"} size={25} />
                                                        </View>

                                                    </ImageBackground>




                                                </TouchableOpacity>
                                            )
                                        }
                                        </>
                                        :
                                        <>
                                        {
                                            source.map((item) =>
                                                <TouchableOpacity activeOpacity={0.9} onPress={() => { navigation.navigate("ImageReviewScroll", { items: source,item:item }) }} style={{ width: 80, height: 80, margin: 5, backgroundColor: "white", borderColor: "#1e87fd", borderWidth: 2, borderRadius: 5, justifyContent: "center", alignItems: "center" }}>
                                                    <TouchableOpacity activeOpacity={0.9} onPress={() => { removeimage(item) }} style={{ width: 40, height: 40, position: "absolute", zIndex: 1, right: -20, top: -20, justifyContent: "center", alignItems: "center" }} >
                                                        <View style={{ width: 20, height: 20, elevation: 1, backgroundColor: "white", borderRadius: 100, justifyContent: "center", alignItems: "center" }}>
                                                            <Ionicons style={{ borderRadius: 100, backgroundColor: "white" }} color={"#1e87fd"} size={20} name={"x-circle"} />
                                                        </View>
                                                    </TouchableOpacity>


                                                    <ImageBackground style={{ width: "100%", height: "100%" }} resizeMode={"cover"} source={{ uri: item.uri }} >
                                                        <View style={{ backgroundColor: "rgba(0, 0, 0, .32)", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                                                            <Ionicons name={"eye"} color={"white"} size={25} />
                                                        </View>

                                                    </ImageBackground>




                                                </TouchableOpacity>
                                            )
                                        }
                                        </>
                                    }


                                    <View style={{ width: 80, height: 80, margin: 5, backgroundColor: "white", borderColor: "#1e87fd", borderWidth: 2, borderRadius: 5, justifyContent: "center", alignItems: "center" }}>

                                        <TouchableRipple borderless={true} onPress={() => { setvisibleselectimage(true) }} rippleColor="rgba(0, 0, 0, .32)" style={{ width: 80, height: 80, margin: 5, backgroundColor: "white", borderColor: "#1e87fd", borderWidth: 2, borderRadius: 5, justifyContent: "center", alignItems: "center", overflow: "hidden" }} >
                                            <Ionicons name={"image"} size={50} style={{ alignSelf: "center" }} color={"#1e87fdCC"} />
                                        </TouchableRipple>
                                    </View>
                                </>
                                :
                                <View style={{ width: 80, height: 80, margin: 5, backgroundColor: "white", borderColor: "#1e87fd", borderWidth: 2, borderRadius: 5, justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
                                    <TouchableRipple borderless={true} onPress={() => { setvisibleselectimage(true) }} rippleColor="rgba(0, 0, 0, .32)" style={{ width: 80, height: 80, margin: 5, backgroundColor: "white", borderColor: "#1e87fd", borderWidth: 2, borderRadius: 5, justifyContent: "center", alignItems: "center", overflow: "hidden" }} >
                                        <Ionicons name={"image"} size={50} style={{ alignSelf: "center" }} color={"#1e87fdCC"} />
                                    </TouchableRipple>
                                </View>
                            }








                        </View>

                    </View>




                </ScrollView>



            </SafeAreaView>

            <Modal visible={modalvisible} onDismiss={() => setmodalvisible(false)} dismissable={true}   >
                <View style={{ backgroundColor: "white", width: WiDTH * 0.8, height: HEIGHT * 0.44, borderRadius: 10, alignSelf: "center" }}>
                    <View style={{ flexWrap: "wrap", width: "100%", flexDirection: "row", alignItems: "center", height: "100%", padding: 5 }} >

                        <TouchableOpacity activeOpacity={1} onPress={() => { selectcategory("entertainment"), setmodalvisible(false) }} style={{
                            height: 35, width: "35%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                            backgroundColor: category == "entertainment" ? "#1e87fd" : "white"
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 13, fontWeight: "bold", color: category == "entertainment" ? "white" : "#1e87fd" }} >Entertainment</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} onPress={() => { selectcategory("shopping"), setmodalvisible(false) }} style={{
                            height: 35, width: "25%"
                            , alignItems: "center", flexDirection: "row", justifyContent: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                            backgroundColor: category == "shopping" ? "#1e87fd" : "white"
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 13, fontWeight: "bold", color: category == "shopping" ? "white" : "#1e87fd" }} >Shopping</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} onPress={() => { selectcategory("finance"), setmodalvisible(false) }} style={{
                            height: 35, width: "30%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                            backgroundColor: category == "finance" ? "#1e87fd" : "white"
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 13, fontWeight: "bold", color: category == "finance" ? "white" : "#1e87fd" }} >Finance</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} onPress={() => { selectcategory("food & beverages"), setmodalvisible(false) }} style={{
                            height: 35, width: "50%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 52, margin: 5,
                            backgroundColor: category == "food" ? "#1e87fd" : "white"
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 13, fontWeight: "bold", color: category == "food" ? "white" : "#1e87fd" }} >Food & Beverages</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} onPress={() => { selectcategory("beauty & fashion"), setmodalvisible(false) }} style={{
                            height: 35, width: "43%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 52, margin: 5,
                            backgroundColor: category == "beauty" ? "#1e87fd" : "white"
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 13, fontWeight: "bold", color: category == "beauty" ? "white" : "#1e87fd" }} >Beauty & Fashion</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} onPress={() => { selectcategory("fitness"), setmodalvisible(false) }} style={{
                            height: 35, width: "30%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 52, margin: 5,
                            backgroundColor: category == "fitness" ? "#1e87fd" : "white"
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 13, fontWeight: "bold", color: category == "fitness" ? "white" : "#1e87fd" }} >Fitness</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} onPress={() => { selectcategory("apps"), setmodalvisible(false) }} style={{
                            height: 35, width: "20%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 52, margin: 5,
                            backgroundColor: category == "apps" ? "#1e87fd" : "white"
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 13, fontWeight: "bold", color: category == "apps" ? "white" : "#1e87fd" }} >Apps</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} onPress={() => { selectcategory("hospitality"), setmodalvisible(false) }} style={{
                            height: 35, width: "39%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 52, margin: 5,
                            backgroundColor: category == "hospitality" ? "#1e87fd" : "white"
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 13, fontWeight: "bold", color: category == "hospitality" ? "white" : "#1e87fd" }} >Hospitality</Text>
                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={1} onPress={() => { selectcategory("education"), setmodalvisible(false) }} style={{
                            height: 35, width: "50%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 52, margin: 5,
                            backgroundColor: category == "education" ? "#1e87fd" : "white"
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 13, fontWeight: "bold", color: category == "education" ? "white" : "#1e87fd" }} >Education</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} onPress={() => { selectcategory("business"), setmodalvisible(false) }} style={{
                            height: 35, width: "42%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 52, margin: 5,
                            backgroundColor: category == "business" ? "#1e87fd" : "white"
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 13, fontWeight: "bold", color: category == "business" ? "white" : "#1e87fd" }} >Business</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} onPress={() => { selectcategory("travel"), setmodalvisible(false) }} style={{
                            height: 35, width: "43%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 52, margin: 5,
                            backgroundColor: category == "travel" ? "#1e87fd" : "white"
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 13, fontWeight: "bold", color: category == "travel" ? "white" : "#1e87fd" }} >Travel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} onPress={() => { selectcategory("technology"), setmodalvisible(false) }} style={{
                            height: 35, width: "50%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 52, margin: 5,
                            backgroundColor: category == "technology" ? "#1e87fd" : "white"
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 13, fontWeight: "bold", color: category == "technology" ? "white" : "#1e87fd" }} >Technology</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} onPress={() => { selectcategory("consumer goods"), setmodalvisible(false) }} style={{
                            height: 35, width: "52%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                            backgroundColor: category == "consumer goods" ? "#1e87fd" : "white"
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 13, fontWeight: "bold", color: category == "consumer goods" ? "white" : "#1e87fd" }} >Consumer Goods</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} onPress={() => { selectcategory("service"), setmodalvisible(false) }} style={{
                            height: 35, width: "40%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                            backgroundColor: category == "service" ? "#1e87fd" : "white"
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 13, fontWeight: "bold", color: category == "service" ? "white" : "#1e87fd" }} >Service</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} onPress={() => { selectcategory("other"), setmodalvisible(false) }} style={{
                            height: 35, width: "97%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 5,
                            backgroundColor: category == "other" ? "#1e87fd" : "white"
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 13, fontWeight: "bold", color: category == "other" ? "white" : "#1e87fd" }} >Other</Text>
                        </TouchableOpacity>


                    </View>
                </View>
            </Modal>


            <Modal visible={visibleselectimage} dismissable={true} onDismiss={() => setvisibleselectimage(false)}>
                <View style={{ width: WiDTH, height: HEIGHT }}>
                    <TouchableOpacity onPress={() => setvisibleselectimage(false)} style={{ width: WiDTH, height: HEIGHT * 3 / 4 }}>

                    </TouchableOpacity>
                    <View style={{ width: WiDTH, height: HEIGHT / 4, backgroundColor: "white", position: "absolute", bottom: 0, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
                        <View style={{ width: "100%", height: "35%", justifyContent: "center" }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#2a3659", marginLeft: 20 }} >Choose Given options</Text>
                        </View>
                        <View style={{ width: "100%", height: "55%", justifyContent: "flex-start", flexDirection: "row" }}>




                            <TouchableOpacity activeOpacity={1} onPress={() => { launchgallery() }} >
                                <View style={{ height: 45, width: 45, backgroundColor: "#00ca95", borderRadius: 50, justifyContent: "center", alignItems: "center", marginLeft: 30 }}>
                                    <Icons size={20} color={"white"} name={"image"} />
                                </View>

                                <View style={{ marginLeft: 25, height: 45, width: 60, alignItems: "center", marginTop: 5, left: -2.5 }}>
                                    <Text style={{ fontSize: 14, color: "grey" }}>Gallery</Text>
                                    {/* <Text style={{ fontSize: 14, color: "grey", top: -4 }}>photo</Text> */}
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} onPress={() => { launchcamera() }}>
                                <View style={{ height: 45, width: 45, backgroundColor: "#4285f4", borderRadius: 50, justifyContent: "center", alignItems: "center", marginLeft: 30 }}>
                                    <Icons size={20} color={"white"} name={"camera"} />
                                </View>

                                <View style={{ marginLeft: 25, height: 45, width: 60, alignItems: "center", marginTop: 5, left: -2.5 }}>
                                    <Text style={{ fontSize: 14, color: "grey" }}>Camera</Text>
                                    {/* <Text style={{ fontSize: 14, color: "grey", top: -4 }}>photo</Text> */}
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={visibleselectimagelogo} dismissable={true} onDismiss={() => setvisibleselectimagelogo(false)}>
                <View style={{ width: WiDTH, height: HEIGHT }}>
                    <TouchableOpacity onPress={() => setvisibleselectimagelogo(false)} style={{ width: WiDTH, height: HEIGHT * 3 / 4 }}>

                    </TouchableOpacity>
                    <View style={{ width: WiDTH, height: HEIGHT / 4, backgroundColor: "white", position: "absolute", bottom: 0, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
                        <View style={{ width: "100%", height: "35%", justifyContent: "center" }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#2a3659", marginLeft: 20 }} >{forprofile ? "Profile Logo" : "Background Image"}</Text>
                        </View>
                        <View style={{ width: "100%", height: "55%", justifyContent: "flex-start", flexDirection: "row" }}>



                            <>
                                {backgroundsource != null && forprofile == false ?

                                    <TouchableOpacity activeOpacity={1} onPress={() => { setbackgroundsource(null), setvisibleselectimagelogo(false) }}>
                                        <View style={{ height: 45, width: 45, backgroundColor: "#e7164c", borderRadius: 50, justifyContent: "center", alignItems: "center", marginLeft: 30 }}>
                                            <Icons size={18} color={"white"} name={"trash"} />
                                        </View>

                                        <View style={{ marginLeft: 25, height: 45, width: 60, alignItems: "center", marginTop: 5 }}>
                                            <Text style={{ fontSize: 14, color: "grey" }}>Remove</Text>
                                            <Text style={{ fontSize: 14, color: "grey", top: -4 }}>photo</Text>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    null
                                }
                            </>

                            <>
                                {profilesource != null && forprofile == true ?

                                    <TouchableOpacity activeOpacity={1} onPress={() => { setprofilesource(null), setvisibleselectimagelogo(false) }}>
                                        <View style={{ height: 45, width: 45, backgroundColor: "#e7164c", borderRadius: 50, justifyContent: "center", alignItems: "center", marginLeft: 30 }}>
                                            <Icons size={18} color={"white"} name={"trash"} />
                                        </View>

                                        <View style={{ marginLeft: 25, height: 45, width: 60, alignItems: "center", marginTop: 5 }}>
                                            <Text style={{ fontSize: 14, color: "grey" }}>Remove</Text>
                                            <Text style={{ fontSize: 14, color: "grey", top: -4 }}>photo</Text>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    null
                                }
                            </>





                            <TouchableOpacity activeOpacity={1} onPress={() => { launchgallerylogo() }} >
                                <View style={{ height: 45, width: 45, backgroundColor: "#00ca95", borderRadius: 50, justifyContent: "center", alignItems: "center", marginLeft: 30 }}>
                                    <Icons size={20} color={"white"} name={"image"} />
                                </View>

                                <View style={{ marginLeft: 25, height: 45, width: 60, alignItems: "center", marginTop: 5, left: -2.5 }}>
                                    <Text style={{ fontSize: 14, color: "grey" }}>Gallery</Text>
                                    {/* <Text style={{ fontSize: 14, color: "grey", top: -4 }}>photo</Text> */}
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} onPress={() => { launchcameralogo() }}>
                                <View style={{ height: 45, width: 45, backgroundColor: "#4285f4", borderRadius: 50, justifyContent: "center", alignItems: "center", marginLeft: 30 }}>
                                    <Icons size={20} color={"white"} name={"camera"} />
                                </View>

                                <View style={{ marginLeft: 25, height: 45, width: 60, alignItems: "center", marginTop: 5, left: -2.5 }}>
                                    <Text style={{ fontSize: 14, color: "grey" }}>Camera</Text>
                                    {/* <Text style={{ fontSize: 14, color: "grey", top: -4 }}>photo</Text> */}
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>

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
        width: "100%",
        justifyContent: "center"

    },
    back: {
        left: 8,
    },
    heading: {
        width: WiDTH,
        justifyContent: "center",
        paddingLeft: 15,

    },
    topprofile: {
        width: WiDTH,
        height: 180,
        marginTop: -250 / 3,
        justifyContent: "center",
        alignItems: "center",
    },



})


export default BrandPostCampDetail;
