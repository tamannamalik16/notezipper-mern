import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/userConstants";

const initialUserState = {
    userInfo: null,
    loading: false,
    error: null,
    success: false,
};
export const userLoginReducer = (state = initialUserState, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return { loading: true };
            case USER_LOGIN_SUCCESS:
                return { loading: false, userInfo: action.payload};
                case USER_LOGIN_FAIL:
                    return { loading: false, error: action.payload };
                    case USER_LOGOUT:
                        return {};

        default:
            return state;

    }
};

export const userRegisterReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return {loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload , success:true};
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload, success: false };
        default:
            return state;
    }
};

export const userUpdateReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_UPDATE_REQUEST:
            return {loading: true };
        case USER_UPDATE_SUCCESS:
            return { loading: false, userInfo: action.payload , success:true};
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload, success: false };
        default:
            return state;
    }   
};


