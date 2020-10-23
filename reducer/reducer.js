export const initState = {
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
    uploadeduser: null

}

export const reducer = (state, action) => {

    switch (action.type) {
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



        default:
            break;
    }
    return state
}