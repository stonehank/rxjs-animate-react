const showMarble=(state=false,action)=>{
    switch(action.type){
        case('SHOW_MARBLE'):
            return action.isShow
        default:
            return state
    }
}
const showCode=(state=false,action)=>{
    switch(action.type){
        case('SHOW_CODE'):
            return action.isShow
        default:
            return state
    }
}
const startMarble=(state=false,action)=>{
    switch(action.type){
        case('START_MARBLE'):
            return action.needStart
        default:
            return state
    }
}
const startResult=(state=false,action)=> {
    switch (action.type) {
        case('START_RESULT'):
            return action.needStart
        default:
            return state
    }
}

const marbleSetting=(state={},action)=>{
    let {type,...obj}=action
    switch(type){
        case('MARBLE_SETTING'):
            return obj
        default:
            return state;
    }
}

const createAndShowColorBall=(state={},action)=>{
    let {type,...obj}=action
    switch(type){
        case('CREATE_COLORBALL'):
            return obj
        case('SHOW_COLORBALL'):
            return Object.assign({},obj,state)
        default:
            return state;
    }
}

const addResult=(state="",action)=>{
    switch(action.type){
        case('ADD_RESULT'):
            return state+action.str
        default:
            return state;
    }
}

const fetchStatus=(state=true,action)=>{
    switch(action.type){
        case('FETCH_REQUEST'):
            return true
        case('FETCH_RECEIVED'):
            return false
        default:
            return state;
    }
}