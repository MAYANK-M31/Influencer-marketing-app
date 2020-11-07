
import React, { useContext, useEffect, useState } from "react"
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack"
import BrandPostCampDetail from "./BrandPostCampDetail";
import BrandSocialConnect from "./BrandSocialConnect";
import BrandCampUpload from "./BrandCampUpload";
import { MyContext } from "./AppStartStack";
import BrandPostedCamp from "./BrandPostedCamp";
import InsideBrandPostCamp from "./InsideBrandPostCamp";
import Loading from "./Loading";
import firestore from "@react-native-firebase/firestore"
import { AsyncStorage } from "react-native";
import ImageReview from "./ImageReview";
import ImageReviewScroll from "./ImageReviewScroll";

const Stack = createStackNavigator();

const BrandPostCampStack = () => {

    const [loading, setloading] = useState(true)

    const { state, dispatch } = useContext(MyContext)
    const { campaignposts, campaignpostedagain } = state;

    var array = []
    useEffect(() => {
        setloading(true)
        const func = async () => {
            const uid = await AsyncStorage.getItem("uid")


            const ref = await firestore().collection("brandpost")

            ref.where("uid", "==", uid).get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                    
                            array.push(doc.data())
                            setloading(false)
                     
                       


                    });
setloading(false)
                   
                    // console.log(array[1].instadata.data[0].username)

                    dispatch({ type: "ADD_CAMPAIGNPOSTS", payload: array })
                    dispatch({ type: "ADD_CAMPAIGNPOSTEDAGAIN", payload: true })
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                    setloading(false)
                });

        }
        func()



    }, [])



    return (

        <Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} >
            {
                !loading ?

                    campaignposts.length <= 0 ?
                        <>
                            <Stack.Screen name="BrandPostCampDetail" component={BrandPostCampDetail} options={{ headerShown: false }} />
                            <Stack.Screen name="BrandSocialConnect" component={BrandSocialConnect} options={{ headerShown: false }} />
                            <Stack.Screen name="BrandCampUpload" component={BrandCampUpload} options={{ headerShown: false }} />
                            <Stack.Screen name="ImageReviewScroll" component={ImageReviewScroll} options={{ headerShown: false }} />
                        </>
                        :
                        <>
                            {campaignpostedagain == false ?
                                <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
                                :
                                <Stack.Screen name="InsideBrandPostCamp" component={InsideBrandPostCamp} options={{ headerShown: false }} />
                            }


                        </>
                    :
                    <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
            }


        </Stack.Navigator>

    );
}

export default BrandPostCampStack;