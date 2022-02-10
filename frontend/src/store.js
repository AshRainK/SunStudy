import { createStore } from "redux";

export default createStore((state, action) => {
    if(state === undefined){
        return {user: null};
    }

    if(action.type === "LOGIN"){
        return { ...state, user: action.user};
    }

    if(state === "LOGOUT"){
        return {...state, user: null};
    }

    if(state === "USER_UPDATED"){
        return {...state, user: action.user};
    }

    if(state === "USER_DELETE"){
        return {...state, user: null};
    }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
