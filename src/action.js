import {calcBallAttribute} from './calcballattribute';
import {BALLWIDTH,BALLHEIGHT} from './mock-data'
const showMarble=(isShow)=>({
    type:'SHOW_MARBLE',
    isShow
})
const showCode=(isShow)=>({
    type:'SHOW_CODE',
    isShow
})
const startMarble=(needStart)=>({
    type:'START_MARBLE',
    needStart
})
const starResult=(needStart)=>({
    type:'START_RESULT',
    needStart
})

const marbleSetting=(linesNum,curOperatorText,minGapTime)=>({
    type:'MARBLE_SETTING',
    linesNum:linesNum,
    curOperatorText:curOperatorText,
    minGapTime:minGapTime
})


const createColorBall=(left)=>({
    type:'CREATE_COLORBALL',
    width:BALLWIDTH,
    height:BALLHEIGHT,
    left
})

const showColorBall=(id,value)=>{
  let attrObj=calcBallAttribute(value)
    return {
        type:'SHOW_COLORBALL',
        id:id,
        text:attrObj.text,
        data:attrObj.data,
        background:attrObj.background,
        color:attrObj.color,
        top:attrObj.top
    }
}
//const showAfterCreate=(id,value,left)=>(dispatch)=>{
//    dispatch(createColorBall(left));
//    dispatch(addColorBall(id,value))
//}


const addResult=(str)=>({
    type:'ADD_RESULT',
    str:str
})

const getSectionInfo=(operatorName,url)=>(dispatch,getState)=>{
    dispatch(fetchRequest);
    fetch(url)
        .then(data=>data.json())
        .then(data=>{
            dispatch(fetchReceived({[operatorName]:data}))
        })
}

const fetchRequest={
    type:'FETCH_REQUEST'
}

const fetchReceived=(data)=>({
        type:'FETCH_RECEIVED',
        data:data
})