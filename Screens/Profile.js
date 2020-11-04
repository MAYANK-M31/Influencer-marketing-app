
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
  Image, FlatList, ImageBackground, ActivityIndicator, AsyncStorage,
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import axios from "axios"
import firestore from '@react-native-firebase/firestore';
import { TouchableRipple, Modal } from 'react-native-paper';
import { MyContext } from "../Screens/AppStartStack"

var abbreviate = require('number-abbreviate')


const images = [
  "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/82b8e9101650903.5f2369beab58a.jpg",
  "https://image.shutterstock.com/image-illustration/3d-illustration-abstract-background-connection-260nw-651685186.jpg"
]

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height
var abbreviate = require('number-abbreviate')

const Profile = ({ route, navigation }) => {
  const [followers, setfollowers] = useState(null)
  const [instaposts, setinstaposts] = useState(null)
  const [subs, setsubs] = useState(null)
  const [views, setviews] = useState(null)
  const [channelid, setchannelid] = useState(null)
  const [imagedata, setimagedata] = useState(images)
  const [instagram, setinstagram] = useState(true)
  const [loading, setloading] = useState(true)
  const [number, setnumber] = useState(null)
  const [switchtype, setswitchtype] = useState("instagram")
  const [see, setsee] = useState(null)
  const [achievesee, setachievesee] = useState(null)
  const [InitLoading, setInitLoading] = useState(true)
  


  const { state, dispatch } = useContext(MyContext)
  const { name, age, city, minrange, maxrange, category, paymode, result, about, achievements, experiences, instaconnected, instaimages, instausername, youtubeconnected, profileimage, backgroundimage } = state





  function animateValue(start, end, duration) {
    if (start === end) return;
    var range = end - start;
    var current = start;
    var increment = end > start ? 1 : +1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var timer = setInterval(function () {
      current += increment;

      if (current == end) {
        clearInterval(timer);
      }
      setnumber(current)
      return current

    }, stepTime);
  }


  useEffect(() => {


    const func = async () => {
      setInitLoading(true)
      const ref = await firestore().collection("influencer")
      const uid = await AsyncStorage.getItem("uid")
      // console.log(uid);

      ref.where("uid", "==", uid).get()
        .then(async function (querySnapshot) {

          await querySnapshot.forEach(async function (doc) {
            const docId = doc.id
            // alert(docId)
            await AsyncStorage.setItem("DocId", docId)
            // console.log(await AsyncStorage.getAllKeys());


          })


        })


    }
    func()
  }, [])


  useEffect(() => {
    setInitLoading(true)
    const func = async () => {
      const ref = await firestore().collection("influencer")
      const uid = await AsyncStorage.getItem("uid")
      // console.log(uid);


      ref.where("uid", "==", uid).get()
        .then(function (querySnapshot) {

          querySnapshot.forEach(async function (doc) {
            // console.log(doc.data());
            dispatch({ type: "ADD_NAME", payload: doc.data().name })
            dispatch({ type: "ADD_RESULT", payload: doc.data() })
            dispatch({ type: "ADD_AGE", payload: doc.data().age })
            dispatch({ type: "ADD_MINRANGE", payload: doc.data().minrange })
            dispatch({ type: "ADD_MAXRANGE", payload: doc.data().maxrange })
            dispatch({ type: "ADD_CITY", payload: doc.data().city })
            dispatch({ type: "ADD_CATEGORY", payload: doc.data().category })
            dispatch({ type: "ADD_PAYMODE", payload: doc.data().paymode })

            if (doc.data()) {
              setInitLoading(false)
            }


            // ADD Profile picture  if exist to state 

            if (doc.data().profileimage !== undefined) {
              dispatch({ type: "ADD_PROFILEIMAGE", payload: doc.data().profileimage })
            }

            // ADD Background picture  if exist to state 

            if (doc.data().backgroundimage !== undefined) {
              dispatch({ type: "ADD_BACKGROUNDIMAGE", payload: doc.data().backgroundimage })
            }



            if (doc.data().youtubedata !== undefined) {
              // alert(doc.data().youtubedata.items[0].statistics.subscriberCount)
              setsubs(doc.data().youtubedata.items[0].statistics.subscriberCount)
              setchannelid(doc.data().youtubedata.items[0].id)
              dispatch({ type: "ADD_YOUTUBECONNECTED", payload: true })
              // setyoutubeconnected(true)

              // About Column Logic
              if (doc.data().about !== undefined) {
                dispatch({ type: "ADD_ABOUT", payload: doc.data().about })
              } else {
                dispatch({ type: "ADD_ABOUT", payload: null })
              }

              // Achievements Column Logic
              if (doc.data().achievements !== undefined) {
                dispatch({ type: "ADD_ACHIEVEMENTS", payload: doc.data().achievements })
              } else {
                dispatch({ type: "ADD_ACHIEVEMENTS", payload: [] })
              }

              // experiences Column Logic
              if (doc.data().experiences !== undefined) {
                dispatch({ type: "ADD_EXPERIENCES", payload: doc.data().experiences })
              } else {
                dispatch({ type: "ADD_EXPERIENCES", payload: [] })


              }


            }

            if (doc.data().instadata !== undefined) {
              // alert(doc.data().instadata.data[0].username)
              dispatch({ type: "ADD_INSTACONNECTED", payload: true })

              var filtered = doc.data().instadata.data.filter(function (item) {
                return item.media_type !== "VIDEO";
              });

              dispatch({ type: "ADD_INSTAIMAGES", payload: filtered })
              // setinstaimages(filtered)

              dispatch({ type: "ADD_INSTAUSERNAME", payload: doc.data().instadata.data[0].username })
              // setinstausername(doc.data().instadata.data[0].username)
              setloading(true)

              const myfunc = async () => {
                animateValue(0, 50, 10000)
                await axios.get(`https://www.instagram.com/${doc.data().instadata.data[0].username}/?__a=1`).then((res) => {
                  setfollowers(res.data.graphql.user.edge_followed_by.count)
                  setloading(false)
                  // console.log(res.data.graphql.user.edge_followed_by.count);
                  // console.log(JSON.parse(props.instausername).data.length);

                  setinstaposts(doc.data().instadata.data.length)
                })
              }
              myfunc()
            }





          });



        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });

    }
    func()

  }, [])







  const switchfunc = (item) => {
    setswitchtype(item)
  }

  const seemore = (index) => {
    setsee(index)
    // setseeless(true)
  }

  const seemoreachieve = (index) => {
    setachievesee(index)
    // setseeless(true)
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
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852" }} >Profile</Text>
          </View>
          <TouchableOpacity onPress={() => { navigation.navigate("Settings") }} style={style.chat} >
            <Ionicons color={"#404852"} size={22} name={"settings"} />
          </TouchableOpacity>
        </View>


        <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16} contentContainerStyle={{ paddingBottom: 100 }} >
          <TouchableOpacity onPress={() => { navigation.navigate("ProfileBackground") }} activeOpacity={1}>
            <ImageBackground style={{ width: WiDTH * 0.95, height: 160, alignSelf: "center", backgroundColor: "#e6fff6", top: 10, borderTopRightRadius: 10, borderTopLeftRadius: 10, alignItems: "flex-end", justifyContent: "flex-end", overflow: "hidden" }} source={{ uri: backgroundimage !== null ? backgroundimage : images[1] }} >
              <TouchableOpacity  onPress={() => { navigation.navigate("ProfileBackground") }} style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center", marginBottom: 5, marginRight: 5 }} >
                <Ionicons color={"white"} size={22} name={"edit-2"} />
              </TouchableOpacity>
            </ImageBackground>
          </TouchableOpacity>
          <View style={style.topprofile} >
            <View style={{ borderRadius: 30, height: 150, width: 150, overflow: "hidden", elevation: 5, zIndex: 10, borderWidth: 3, borderColor: "white" }}>
              <TouchableOpacity onPress={() => { navigation.navigate("ProfilePicture") }} activeOpacity={1}>
                <ImageBackground style={{ width: "100%", height: "100%", backgroundColor: "#e6fff6", alignItems: "flex-end", justifyContent: "flex-end" }} source={{ uri: profileimage == null ?  images[0] : profileimage }} >
                  <TouchableOpacity onPress={() => {  navigation.navigate("ProfilePicture") }} style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center", marginBottom: 5, marginRight: 5 }} >
                    <Ionicons color={"white"} size={22} name={"edit-2"} />
                  </TouchableOpacity>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>


          <View style={style.cardbottom} >
            <Text style={style.name} >{name}</Text>
            <Text style={style.category} >Founder -  <Image style={{ width: 15, height: 14, marginRight: 5 }} source={require("../Icons/youtube.png")} /> Ranker Jee</Text>
            <Text style={style.category} >{category}</Text>
          </View>


          <View style={style.container} >
            {instaconnected ?
              <>
                <View style={style.left} >
                  {loading ?
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#007bff", textTransform: "uppercase" }} > {number}K</Text>
                    :
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#007bff", textTransform: "uppercase" }} >{abbreviate(followers)}</Text>
                  }

                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }} >
                    <Image style={{ width: 15, height: 14, marginRight: 5 }} source={require("../Icons/instagram.png")} />
                    <Text style={{ fontSize: 14, fontWeight: "normal", color: "#9bb0bf" }} >Followers</Text>
                  </View>
                </View>

              </>

              :
              null
            }

            {result.instadata && result.youtubedata ?
              <View style={{ height: 25, width: 1, backgroundColor: "silver" }} >

              </View>
              :
              null
            }

            {youtubeconnected ?

              <>
                <View style={style.middle} >
                  <Text style={{ fontSize: 18, fontWeight: "bold", color: "#007bff", textTransform: "uppercase" }} >{abbreviate(subs)}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }} >
                    <Image style={{ width: 15, height: 14, marginRight: 5 }} source={require("../Icons/youtube.png")} />
                    <Text style={{ fontSize: 14, fontWeight: "normal", color: "#9bb0bf" }} >Subscribers</Text>
                  </View>


                </View>

              </>
              :
              null
            }

          </View>

          <View style={style.buttondiv} >

            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate("EditProfileStack", { screen: "EditProfile", params: { budget: [minrange, maxrange], city: city, paymode: paymode, age: age, name: name, category: category, instaconnected: instaconnected, youtubeconnected: youtubeconnected, about: about } })} style={style.button2} >
              <Text style={style.button2text} >Edit Profile</Text>
              <Ionicons style={{ marginLeft: 10 }} color={"white"} size={18} name={"edit"} />
            </TouchableOpacity>

          </View>


          <View style={style.about} >
            <View style={style.aboutdiv}>
              <Text style={{ fontSize: 14, fontWeight: "bold", color: "#3c4852", textTransform: "capitalize" }}>{minrange}-{maxrange}K</Text>
              <Text style={{ fontSize: 13, fontWeight: "bold", color: "#9bb0bf" }}>Budget</Text>
            </View>
            <View style={style.aboutdiv}>
              <Text style={{ fontSize: 14, fontWeight: "bold", color: "#3c4852", textTransform: "capitalize" }}>{city}</Text>
              <Text style={{ fontSize: 13, fontWeight: "bold", color: "#9bb0bf" }}>City</Text>
            </View>
            <View style={style.aboutdiv}>
              {paymode == "both" ?
                <>
                  <Text style={{ fontSize: 14, fontWeight: "bold", color: "#3c4852", textTransform: "capitalize" }}>Barter</Text>
                  <Text style={{ fontSize: 13, fontWeight: "bold", color: "#9bb0bf" }}>/Pay</Text>
                </>
                :
                <>
                  <Text style={{ fontSize: 14, fontWeight: "bold", color: "#3c4852", textTransform: "capitalize", textTransform: "capitalize" }}>{paymode}</Text>
                  <Text style={{ fontSize: 13, fontWeight: "bold", color: "#9bb0bf" }}>Paymode</Text>
                </>
              }

            </View>
            <View style={style.aboutdiv}>
              <Text style={{ fontSize: 14, fontWeight: "bold", color: "#3c4852", textTransform: "capitalize" }}>{age}</Text>
              <Text style={{ fontSize: 13, fontWeight: "bold", color: "#9bb0bf" }}>Age</Text>
            </View>
          </View>



          {/*----------------- About Column------------------- */}

          {about ?

            <View style={{ minHeight: 10, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, padding: 15 }} >
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >About</Text>
              <Text style={{ fontSize: 14, fontWeight: "100", color: "#404852", textTransform: "capitalize" }}>{about}</Text>
            </View>

            :
            <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

              <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                <View style={{ flexDirection: "row" }} >
                  <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >About</Text>
                  <Image style={{ height: 20, width: 20, marginLeft: 5, top: 2 }} source={require("../Icons/information.png")} />
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate("AddAbout") }} >
                  <Text style={{ fontSize: 15, fontWeight: "normal", color: "#007bff", alignSelf: "flex-start", marginBottom: 5 }} >Add</Text>
                </TouchableOpacity>

              </View>

              <TouchableOpacity activeOpacity={1} onPress={() => { navigation.navigate("AddAbout") }} style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff", alignItems: "center", justifyContent: "center" }} >
                  <Ionicons name={"plus"} size={25} color={"#007bff"} />
                </View>
                <View style={{ width: "85%", marginTop: 5 }} >
                  <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Write something about yourself</Text>
                </View>
              </TouchableOpacity>


            </View>

          }

          {/*----------------- About Column------------------- */}




          {/*----------------- Achievements Column------------------- */}

          {achievements.length > 0 ?


            <View style={{ minHeight: 100, width: "95%", backgroundColor: "white", alignSelf: "center", borderRadius: 10, marginTop: 10, padding: 15 }} >
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 15 }} >Achievements</Text>

              {achievements.map((items, index) =>
                <View>
                  {index == 0 ?
                    null
                    :
                    <View style={{ width: "95%", height: 1, backgroundColor: "#f0f2f5", marginTop: 10, marginBottom: 10, alignSelf: "center" }}></View>
                  }
                  <View style={{ width: "90%", flexDirection: "row", alignItems: "center" }} >

                    <View style={{ height: "100%", width: 40, paddingTop: 5 }} >
                      <View style={{ height: 40, width: 40, backgroundColor: "#f0f2f5", borderRadius: 50, justifyContent: "center", alignItems: "center" }} >
                        {items.category == "award" ?
                          <Ionicons name={"award"} size={25} />
                          : null
                        }
                        {items.category == "youtube views" ?
                          <Ionicons name={"video"} size={25} />
                          : null
                        }
                        {items.category == "youtube subscibers" ?
                          <Ionicons name={"youtube"} size={25} />
                          : null
                        }
                        {items.category == "instagram followers" ?
                          <Ionicons name={"instagram"} size={25} />
                          : null
                        }
                        {items.category == "other" ?
                          <Ionicons name={"flag"} size={25} />
                          :
                          null
                        }

                      </View>
                    </View>
                    <View style={{ width: "100%" }}>
                      <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }} >
                        <View style={{ width: items.description == null ? "100%" : items.description.length > 80 ? "75%" : "100%" }}>
                          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#404852", marginLeft: 20, textTransform: "capitalize" }} >{items.title}</Text>
                        </View>
                        {items.description !== null ?
                          <View style={{ width: "25%", alignItems: "flex-end", justifyContent: "flex-start" }}>
                            {items.description.length > 80 ?
                              <View >

                                {index == achievesee ?
                                  <TouchableOpacity activeOpacity={1} onPress={() => { seemoreachieve(130) }} style={{ flexDirection: "row", height: 18, width: "100%", alignItems: "flex-end", justifyContent: "flex-end" }}>
                                    <Text style={{ fontSize: 13, fontWeight: "100", color: "#007bff" }}>See less</Text>
                                    <Ionicons color={"#007bff"} size={15} name={"chevron-up"} style={{ alignSelf: "center" }} />
                                  </TouchableOpacity>
                                  :
                                  <TouchableOpacity activeOpacity={1} onPress={() => { seemoreachieve(index) }} style={{ flexDirection: "row", height: 18, width: "100%", alignItems: "flex-end", justifyContent: "flex-end" }}>
                                    <Text style={{ fontSize: 13, fontWeight: "100", color: "#007bff" }}>See more</Text>
                                    <Ionicons color={"#007bff"} size={15} name={"chevron-down"} style={{ alignSelf: "center" }} />
                                  </TouchableOpacity>


                                }
                              </View>
                              : null
                            }

                          </View>
                          :
                          null
                        }

                      </View>

                      {items.description !== null ?
                        <View>
                          {index == achievesee ?

                            <Text numberOfLines={index == achievesee ? 500 : 2} style={{ fontSize: 13, fontWeight: "100", color: "#404852", marginLeft: 20, textTransform: "capitalize" }} >{items.description}</Text>
                            :
                            <Text numberOfLines={2} style={{ fontSize: 13, fontWeight: "100", color: "#404852", marginLeft: 20, textTransform: "capitalize" }} >{items.description}</Text>
                          }
                        </View>
                        :
                        null
                      }


                    </View>
                  </View>



                </View>

              )}


              {/* Add More Achievements */}

              <TouchableOpacity onPress={() => { navigation.navigate("AddAchievements") }} >
                <View style={{ width: "95%", height: 1, backgroundColor: "#f0f2f5", marginTop: 15, marginBottom: 15, alignSelf: "center" }}></View>
                <View style={{ width: "90%", flexDirection: "row", alignItems: "center" }} >
                  <View style={{ height: 40, width: 40, backgroundColor: "#e6f1ff", borderRadius: 50, justifyContent: "center", alignItems: "center" }} >
                    <Ionicons name={"plus"} size={25} color={"#007bff"} />
                  </View>
                  <Text style={{ fontSize: 16, fontWeight: "bold", color: "#404852", marginLeft: 20, textTransform: "capitalize" }} >Add More About Your Achievements </Text>
                </View>
              </TouchableOpacity>




            </View>
            :
            <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

              <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                <View style={{ flexDirection: "row" }} >
                  <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Achievements</Text>
                  <Image style={{ height: 22, width: 22, marginLeft: 5 }} source={require("../Icons/trophy.png")} />
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate("AddAchievements") }}>
                  <Text style={{ fontSize: 15, fontWeight: "normal", color: "#007bff", alignSelf: "flex-start", marginBottom: 5 }} >Add</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => { navigation.navigate("AddAchievements") }} style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff", alignItems: "center", justifyContent: "center" }} >
                  <Ionicons name={"plus"} size={25} color={"#007bff"} />
                </View>
                <View style={{ width: "85%", marginTop: 5 }} >
                  <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Add about your achievements</Text>
                </View>
              </TouchableOpacity>


            </View>
          }



          {/*----------------- Experiences Column------------------- */}

          {experiences.length > 0 ?
            <View style={{ minHeight: 100, width: "95%", backgroundColor: "white", alignSelf: "center", borderRadius: 10, marginTop: 10, padding: 15 }} >
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 15 }} >Experiences</Text>

              {experiences.map((item, index) =>
                <View>
                  {index == 0 ?
                    null
                    :
                    <View style={{ width: "95%", height: 1, backgroundColor: "#f0f2f5", marginTop: 10, marginBottom: 10, alignSelf: "center" }}></View>
                  }

                  <View style={{ width: "90%", flexDirection: "row", alignItems: "center" }} >
                    <View style={{ height: "100%", width: 40, paddingTop: 5 }} >
                      <View style={{ height: 40, width: 40, backgroundColor: "#f0f2f5", borderRadius: 2, justifyContent: "center", alignItems: "center", overflow: 'hidden' }} >
                        <Image style={{ width: "100%", height: "100%" }} source={{ uri: item.url }} />
                      </View>
                    </View>
                    <View style={{ width: "100%" }}>
                      <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }} >
                        <View style={{ width: item.description.length > 80 ? "75%" : "100%" }}>
                          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#404852", marginLeft: 20, textTransform: "capitalize" }} >{item.companyname}</Text>
                        </View>
                        <View style={{ width: "25%", alignItems: "flex-end", justifyContent: "flex-start" }}>
                          {item.description.length > 80 ?
                            <View>
                              {index == see ?
                                <TouchableOpacity activeOpacity={1} onPress={() => { seemore(130) }} style={{ flexDirection: "row", height: 18, width: "100%", alignItems: "flex-end", justifyContent: "flex-end" }}>
                                  <Text style={{ fontSize: 13, fontWeight: "100", color: "#007bff" }}>See less</Text>
                                  <Ionicons color={"#007bff"} size={15} name={"chevron-up"} style={{ alignSelf: "center" }} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity activeOpacity={1} onPress={() => { setsee(index) }} style={{ flexDirection: "row", height: 18, width: "100%", alignItems: "flex-end", justifyContent: "flex-end" }}>
                                  <Text style={{ fontSize: 13, fontWeight: "100", color: "#007bff" }}>See more</Text>
                                  <Ionicons color={"#007bff"} size={15} name={"chevron-down"} style={{ alignSelf: "center" }} />
                                </TouchableOpacity>
                              }
                            </View>
                            :
                            null
                          }

                        </View>
                      </View>
                      {index == see ?
                        <Text numberOfLines={index == see ? 500 : 2} style={{ fontSize: 13, fontWeight: "100", color: "#404852", marginLeft: 20, textTransform: "capitalize" }} >{item.description}</Text>
                        :
                        <Text numberOfLines={2} style={{ fontSize: 13, fontWeight: "100", color: "#404852", marginLeft: 20, textTransform: "capitalize" }} >{item.description}</Text>
                      }

                    </View>

                  </View>


                </View>
              )}

              {/* Add More Experience */}

              <View>
                <View style={{ width: "95%", height: 1, backgroundColor: "#f0f2f5", marginTop: 15, marginBottom: 15, alignSelf: "center" }}></View>
                <TouchableOpacity onPress={() => { navigation.navigate("AddExperience") }}  >
                  <View style={{ width: "90%", flexDirection: "row", alignItems: "center" }} >
                    <View style={{ height: 40, width: 40, backgroundColor: "#e6f1ff", borderRadius: 5, justifyContent: "center", alignItems: "center" }} >
                      <Ionicons name={"plus"} size={25} color={"#007bff"} />
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#404852", marginLeft: 20, textTransform: "capitalize" }} >Add more about your experience </Text>
                  </View>
                </TouchableOpacity>
              </View>




            </View>
            :
            <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

              <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                <View style={{ flexDirection: "row" }} >
                  <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Experiences</Text>
                  <Image style={{ height: 22, width: 22, marginLeft: 5 }} source={require("../Icons/briefcase.png")} />
                </View>

                <TouchableOpacity onPress={() => { navigation.navigate("AddExperience") }}>
                  <Text style={{ fontSize: 15, fontWeight: "normal", color: "#007bff", alignSelf: "flex-start", marginBottom: 5 }} >Add</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => { navigation.navigate("AddExperience") }} style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff", alignItems: "center", justifyContent: "center" }} >
                  <Ionicons name={"plus"} size={25} color={"#007bff"} />
                </View>
                <View style={{ width: "85%", marginTop: 5 }} >
                  <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Add about your achievements</Text>
                </View>
              </TouchableOpacity>


            </View>
          }

          {/* ___________________LINKS BOX _________________________________ */}

          <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingVertical: 15, alignItems: "center", justifyContent: "center" }} >

            {instaconnected ?
              <TouchableOpacity onPress={() => { navigation.navigate("Browser", { link: "https://www.instagram.com/" + `${instausername}` }) }} style={style.linkcard} >
                <Image style={{ width: 25, height: 25, marginRight: 5 }} source={require("../Icons/instagram.png")} />
                <Text style={{ fontSize: 15, fontWeight: "bold", color: "#404852" }} >Instagram</Text>
                <Ionicons color={"#404852"} style={{ position: "absolute", right: 20 }} size={20} name={"external-link"} />
              </TouchableOpacity>
              :
              null
            }
            {youtubeconnected ?
              <TouchableOpacity onPress={() => { navigation.navigate("Browser", { link: "https://www.youtube.com/channel/" + `${channelid}` }) }} style={style.linkcard} >
                <Image style={{ width: 25, height: 25, marginRight: 5 }} source={require("../Icons/youtube.png")} />
                <Text style={{ fontSize: 15, fontWeight: "bold", color: "#404852" }} >YouTube</Text>
                <Ionicons color={"#404852"} style={{ position: "absolute", right: 20 }} size={20} name={"external-link"} />
              </TouchableOpacity>
              : null
            }

          </View>











          {/* __________________IMAGES & VIDEOS _________________________________________ */}

          <View style={style.gallery} >
            {instausername ?
              <TouchableOpacity activeOpacity={1} onPress={() => { setinstagram(true), switchfunc("instagram") }} style={style.galleryleft} >
                <Ionicons style={{ width: 25, height: 25, marginRight: 5 }} color={switchtype == "instagram" ? "#0296f6" : "#9e9e9e"} size={25} name={"instagram"} />
              </TouchableOpacity>
              :
              null
            }
            {subs || views ?
              <TouchableOpacity activeOpacity={1} onPress={() => { setinstagram(false), switchfunc("youtube") }} style={style.galleryright}>
                <Ionicons style={{ width: 25, height: 25, marginRight: 5 }} color={switchtype == "youtube" ? "#ff0000" : "#9e9e9e"} size={25} name={"youtube"} />
              </TouchableOpacity>
              :
              null
            }
          </View>

          {instagram ?
            <FlatList
              data={instaimages}
              style={{ left: -4 / 6 }}
              renderItem={({ item }) => (

                <TouchableOpacity onPress={() => navigation.navigate("Gallery", { image: JSON.stringify(instaimages), uri: item.media_url })}
                  style={{
                    height: WiDTH / 3,
                    width: WiDTH / 3,
                    flexDirection: 'column',
                    margin: 1,
                    backgroundColor: "#d9d9d9"
                  }}>

                  <Image style={{ width: "100%", height: "100%" }} source={{ uri: item.media_url }} />

                </TouchableOpacity>
              )}
              //Setting the number of column
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
            />
            :
            <View>

              {imagedata.map((item) =>
                <View style={{
                  width: WiDTH, paddingHorizontal: 10, justifyContent: "center", alignItems: "center", marginBottom: 10, overflow: "hidden"
                }} >
                  <ImageBackground blurRadius={1.5} style={{
                    height: 250,
                    width: "100%", justifyContent: "center", alignItems: "center", borderRadius: 10, overflow: "hidden"
                  }} source={{ uri: item }}  >
                    <Image style={{ width: 50, height: 50, marginRight: 5 }} source={require("../Icons/youtube.png")} />
                  </ImageBackground>

                </View>
              )}


            </View>



          }
        </ScrollView>


      </SafeAreaView>
      <Modal visible={InitLoading}   >

        <View style={{ width: WiDTH, height: HEIGHT, backgroundColor: "white", justifyContent: "center", alignItems: "center" }} >
          <ActivityIndicator size={50} color={"#007bff"} />
          {/* <Text style={{ fontSize: 13, color: "#414d57", marginTop: 5, marginLeft: 5 }}>Loading...</Text> */}
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
  topprofile: {
    width: WiDTH,
    height: 180,
    marginTop: -250 / 3,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: WiDTH,
    height: WiDTH / 2,
  },
  insidecard: {
    width: WiDTH,
    height: "60%",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 0,
  },
  cardbottom: {
    width: "100%",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#414d57",
    textTransform: "capitalize"

  },
  category: {
    fontSize: 13,
    fontWeight: "100",
    color: "#9bb0bf",
    textTransform: "capitalize"
  },
  container: {
    width: WiDTH,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  left: {
    width: WiDTH / 3,
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  middle: {
    width: WiDTH / 3,
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  right: {
    width: WiDTH / 3,
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  linkcard: {
    width: WiDTH - WiDTH * 0.1,
    height: 50,
    elevation: 0,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 5,
    borderRadius: 10,
    borderColor: "#007bff",
    borderWidth: 1.5
  },
  about: {
    width: WiDTH,
    height: 100,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  aboutdiv: {
    width: WiDTH / 5,
    height: WiDTH / 5,
    backgroundColor: "white",
    elevation: 3,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#409cff",
    borderWidth: 1.5
  },
  buttondiv: {
    width: "100%",
    alignItems: "center",
    marginTop: 15,
    alignItems: "center",
  },
  button2: {
    width: WiDTH * 0.88,
    height: 40,
    backgroundColor: "#007bff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },

  button2text: {
    fontSize: 15,
    color: "white",
    fontWeight: 'bold'
  },
  gallery: {
    width: WiDTH,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    // borderTopWidth: 1,
    // borderTopColor: "#d9d9d9",
    justifyContent: "center",
  },
  galleryleft: {
    width: "50%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

  },
  galleryright: {
    width: "50%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

  }

})


export default Profile
