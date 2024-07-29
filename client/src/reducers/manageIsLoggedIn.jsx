const initialState=false;

export const manageIsLoggedIn=(state=initialState, action)=>{
    if(action.type==="isLoggedIn"){
        return action.payload;
    }
    else{
        return state;
    }
};