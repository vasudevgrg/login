export const showPopup=(payload)=>{
    return{
        type:'showPopup',
        payload:payload
    }
};

export const hidePopup=()=>{
    return{
        type:'hidePopup'
    }
};

export const isLoggedIn=(payload)=>{
    return{
        type:'isLoggedIn',
        payload:payload
    }
}

export const sessions=(payload)=>{
    return{
        type:'sessions',
        payload:payload
    }
}