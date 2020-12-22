export const initState = {
    FetchUserData: false,
    name: null,
    age: null,
    city: null,
    result: [],
    paymode: null,
    category: null,
    minrange: null,
    maxrange: null,
    about: null,
    achievements: [],
    experiences: [],
    instaconnected: false,
    instaimages: null,
    instausername: null,
    youtubeconnected: false,
    isloggedin: null,
    uploadeduser: null,
    profileimage: null,
    backgroundimage: null,
    type: null,    // wheater user is brand or influencer
    brandname: null,
    email: null,
    applink: null,
    website: null,
    brandprofileimage: null,
    FetchMyCampaigns: false,
    requestsent: [], // To show requests user has sent for post (applied) 
    AllBrandAccountData: [], // To fetch data of brand account on home page
    InfluencerChatData: [], // To fetch save the chatid after brand send message from sendmessage page (in order to direct open chatpage in search stack for brands)
    RequestsGot: [],  // Requests got to brand by influencer
    Chats: [], // Chats List Of Influencer and also of brand
    AllInfluencerData: null,
    CurrentChatRoomId: null
}

export const reducer = (state, action) => {

    switch (action.type) {
        case "FETCHUSERDATA":
            return {
                ...state,
                FetchUserData: action.payload
            }
        case "ADD_NAME":
            return {
                ...state,
                name: action.payload
            }

        case "ADD_AGE":
            return {
                ...state,
                age: action.payload
            }

        case "ADD_CITY":
            return {
                ...state,
                city: action.payload
            }

        case "ADD_RESULT":
            return {
                ...state,
                result: action.payload
            }

        case "ADD_MINRANGE":
            return {
                ...state,
                minrange: action.payload
            }

        case "ADD_MAXRANGE":
            return {
                ...state,
                maxrange: action.payload
            }

        case "ADD_PAYMODE":
            return {
                ...state,
                paymode: action.payload
            }
        case "ADD_CATEGORY":
            return {
                ...state,
                category: action.payload
            }
        case "ADD_ABOUT":
            return {
                ...state,
                about: action.payload
            }
        case "ADD_ACHIEVEMENTS":
            return {
                ...state,
                achievements: action.payload
            }
        case "ADD_EXPERIENCES":
            return {
                ...state,
                experiences: action.payload
            }
        case "ADD_INSTACONNECTED":
            return {
                ...state,
                instaconnected: action.payload
            }
        case "ADD_INSTAIMAGES":
            return {
                ...state,
                instaimages: action.payload
            }
        case "ADD_INSTAUSERNAME":
            return {
                ...state,
                instausername: action.payload
            }
        case "ADD_YOUTUBECONNECTED":
            return {
                ...state,
                youtubeconnected: action.payload
            }

        case "ADD_LOGGEDIN":
            return {
                ...state,
                isloggedin: action.payload
            }
        case "ADD_UPLOADEDUSER":
            return {
                ...state,
                uploadeduser: action.payload
            }
        case "ADD_PROFILEIMAGE":
            return {
                ...state,
                profileimage: action.payload
            }
        case "ADD_BACKGROUNDIMAGE":
            return {
                ...state,
                backgroundimage: action.payload
            }
        case "ADD_TYPE":
            return {
                ...state,
                type: action.payload
            }
        case "ADD_BRANDNAME":
            return {
                ...state,
                brandname: action.payload
            }
        case "ADD_EMAIL":
            return {
                ...state,
                email: action.payload
            }
        case "ADD_APPLINK":
            return {
                ...state,
                applink: action.payload
            }
        case "ADD_WEBSITE":
            return {
                ...state,
                website: action.payload
            }

        case "ADD_BRANDPROFILEIMAGE":
            return {
                ...state,
                brandprofileimage: action.payload
            }
        case "ADD_REQUESTSENT":
            return {
                ...state,
                requestsent: action.payload
            }
        case "ADD_ALLBRANDACCOUNTDATA":
            return {
                ...state,
                AllBrandAccountData: action.payload
            }
        case "ADD_INFLUENCERCHATDATA":
            return {
                ...state,
                InfluencerChatData: action.payload
            }
        case "ADD_REQUESTSGOT":
            return {
                ...state,
                RequestsGot: action.payload
            }
        case "ADD_CHATS":
            return {
                ...state,
                Chats: action.payload
            }
        case "ADD_ALLINFLUENCERDATA":
            return {
                ...state,
                AllInfluencerData: action.payload
            }
        case "ADD_CURRENTCHATROOMID":
            return {
                ...state,
                CurrentChatRoomId: action.payload
            }
        case "FETCH_MY_CAMPAIGNS":
            return {
                ...state,
                FetchMyCampaigns: action.payload
            }
        default:
            break;
    }
    return state
}