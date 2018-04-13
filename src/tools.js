import {Data,notFoundData,deepList,shallowList} from './mock-data'

const LINETOP=30
/**
 * 模拟500毫秒延迟
 * @param operatorName
 * @returns {Promise}
 */
export function fetchData(operatorName){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            let findData=Data.find(obj=>obj.name===operatorName)
            if(!findData){return resolve(notFoundData)}
            return resolve(findData)
        },500)
    })

}

/**
 * 模拟200毫秒延迟
 */
export function fetchNav(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            return resolve({shallowList,deepList})
        },200)
    })
}






/*菜单方法*/
export const sortMethod=(sort,navArr)=>{
    let needSortArr=navArr.slice(),
        numSortFunc=(a,b)=>{
        return b[sort]-a[sort]
    },
        stringSortFunc=(a,b)=>{
            return b[sort]<a[sort]
        },
        sortArr=null;
    if(needSortArr[0]){
        if(typeof needSortArr[0][sort]==='number'){
            sortArr=needSortArr.sort(numSortFunc)
        }else if(typeof needSortArr[0][sort]==='string'){
            sortArr=needSortArr.sort(stringSortFunc)
        }else{
            console.error('navArr的'+sort+'属性格式不对，确保为string或者是num')
        }
    }else{
        sortArr=needSortArr;
    }
       return sortArr
}

/*对code方法*/

export function code2Obj(code){
    var curFuncStr=code+'',
        rawCodeStr=curFuncStr.replace(/;\s/g,';;').replace(/\B\s/g,''),
        rawArr=rawCodeStr.split(/\/\/cut\s*/),
        arr=rawArr[1]?rawArr[1].split(/;;/g):rawArr[0]==='无数据'?[]:rawArr,
        str=rawArr[1]?rawArr[1].replace(/;;/g,';\n'):rawArr[0]==='无数据'?'':rawArr;
    return {str,arr}
};
export function unique(arr){
    var unqiue=[]
    for(var i=0,len=arr.length;i<len;i++){
        if(arr.indexOf(arr[i])===i){
            unqiue.push(arr[i])
        }
    }
    return unqiue
}


function clearWhich(unSub){
    if(!unSub){return}
    unSub.unsubscribe? unSub.unsubscribe(): clearTimeout(unSub)

}
export function clearFunc(unSubObj){
        for(let i in unSubObj){
            clearWhich(unSubObj[i])
        }
}

///**
// * 返回值为true 则未订阅
// * 返回值为false 则已订阅
// * @param unSubObj
// * @returns {*}
// */
//export function checkIsUnSub(unSubObj){
//    var obj={}
//        for(let i in unSubObj){
//            if(unSubObj[i]){
//                if(unSubObj[i].isStopped!==unSubObj[i].closed){
//                    console.error('isStopped和closed属性不一致，检查unSub当前状态')
//                }
//                //setTimeout(()=>{obj[i]=unSubObj[i].isStopped},0)
//                obj[i]=unSubObj[i].closed
//                //console.log(window.i=obj[i],i)
//            }
//        }
//    //console.log(obj)
//    return obj
//}


export function calcColorBallNewPosition(line,whichLine,v,curTimeGap){
    let newObj;
    let rightWhichLine=(+whichLine>0 && +whichLine<=line);
    let lastLine=whichLine==='last';
    let errorOrComplete=(v==='error'|| v==='complete');

    if(rightWhichLine){
        newObj = Object.assign(getArgument(v,curTimeGap), {top: whichLine * LINETOP})
    }else if(!rightWhichLine && !errorOrComplete &&!lastLine){
        newObj=getArgument(v,curTimeGap)
    }else{
        newObj = Object.assign(getArgument(v,curTimeGap), {top: line * LINETOP + 73})
    }
    return newObj
}

function getArgument(v,curTimeGap){
    let obj={};
    let ts=Object.prototype.toString
    let distanceEachSec=50;
    let left=curTimeGap/1000*distanceEachSec;
    if(v==="complete")
    {obj.data=v;obj.text='com';obj.background='#008f0f';obj.left=left+20;obj.color='lightgreen';obj.fontWeight='bold';obj.letterSpacing='-1.5px';}
    else if(v==="error")
    {obj.data=v;obj.text='err';obj.background='red';obj.left=left+20;obj.color='#fff';obj.fontWeight='bold';}
    else if(typeof v==='number')
    {obj.data=v;obj.text=v;obj.background='blue';obj.left=left;obj.top=LINETOP*2;obj.color='#fff';}
    else if(typeof v==='string')
    {obj.data=v;obj.text=v;obj.background='green';obj.left=left;obj.top=LINETOP*2;obj.color='#000';}
    else if(typeof v==='object' && ts.call(v).indexOf("Event")!==-1)
    {obj.data=v;obj.text='ev';obj.background='yellow';obj.left=left;obj.top=LINETOP;obj.color='#000';}
    else if(typeof v==='object' && ts.call(v)==='[object Object]')
    {obj.data=v;obj.text='obj';obj.background='purple';obj.left=left;obj.top=LINETOP;obj.color='#fff';}
    else if(typeof v==='object' && ts.call(v)==='[object Array]')
    {obj.data=v;obj.text='obj';obj.background='orange';obj.left=left;obj.top=LINETOP;obj.color='#fff';}
    return obj
}

export function calcCodeStrArrPlusMinus(code,prevCodeArr){
    const codeObj=code2Obj(code),
        str=codeObj.str,
        arr=codeObj.arr,
        curLen=codeObj.arr.length,
        preLen=prevCodeArr.length,
        minus=unique(arr.concat(prevCodeArr)).slice(curLen),
        plus=unique(prevCodeArr.concat(arr)).slice(preLen);
    return {str,arr,minus,plus}
}

export function setSearchList(v,deepList){
    var arr=[];
    var regExp='^'+v+'.*';
        deepList.forEach(e=> {
            if(e.name.match(new RegExp(regExp,'i'))){
                arr.push(e.name)
            }
        })
    return arr;
}

export function checkDidAllunSub(unSubMarble,unSubResult){
    let flagMarble=true;
    let flagResult=true;
    for(let i in unSubMarble){
        flagMarble &=unSubMarble[i].isStopped
        if(flagMarble===0){
            break;
        }
    }
    for(let i in unSubResult){
        flagResult &=unSubResult[i].isStopped
        if(flagResult===0){
            break;
        }
    }
    return flagMarble && flagResult
}