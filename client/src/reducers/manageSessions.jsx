const initialState=[];

export const manageSessions=(state=initialState, action)=>{
    if(action.type==="sessions"){
        console.log(action.payload);
        return action.payload;
    }
    else{
        return state;
    }
};