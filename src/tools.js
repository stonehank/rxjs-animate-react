import {Data,notFoundData,deepList,shallowList,EACHLINEGAP,distanceEachSec} from './mock-data'
// import {uniqWith,uniq} from 'lodash'
const uniq=require('lodash/uniq')
const uniqWith=require('lodash/uniqWith')

export function checkScreen(){
    let smallScreen;
    window.outerWidth>=1024 ?
        smallScreen=false :
        smallScreen=true;
    return smallScreen;
}


export function checkIsPhone(){
    return /Android|Windows Phone|webOS|iPhone|iPod|BlackBerry|AppleWebKit.*Mobile|.*Mobile/i
            .test(navigator.userAgent)
        || /SymbianOS|MeeGo|MIDP|NOKIA|SAMSUNG|LG|NEC|TCL|UCBrowser|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/
            .test(navigator.userAgent)
}


/**
 * 能取消的fetch（promise）
 * let enhanceFetch=cancelableFetch(fetch);
 * enhanceFetch.promise().then(data=>{....}).catch()
 * enhanceFetch.cancel()
 * @param promise
 * @returns {{promise: enhancePromise, cancel: cancel}}
 */

function cancelableFetch(promise){
    let shouldCancel=false;
    let enhancePromise=(args)=>{
        //防止cancel一次后变量永远都是true
        shouldCancel=false;
        return new Promise((resolve,reject)=>{
        promise.call(this,args).then((data)=>{
            shouldCancel?reject('hasCanceled'):resolve(data)
        }).catch(err=>{
            shouldCancel?reject('hasCanceled'):resolve(err)
        })
    })}
    return{
        promise:enhancePromise,
        cancel:()=>{shouldCancel=true}
    }
}




/**
 * 模拟500毫秒延迟
 * @param operatorName
 * @returns {Promise}
 */
export function _fetchData(operatorName){
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
export  function _fetchNav(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            return resolve({shallowList,deepList})
        },200)
    })
}


export const fetchData=cancelableFetch(_fetchData)
export const fetchNav=cancelableFetch(_fetchNav)


/**
 * 分割'/aaa/bbb'为[aaa,bbb]
 * 参数i选择对应index的值
 */
export function getPath(pathname,i,getAllBehind){
    let rgx=/\/([^/])*/g;
    let resultArr=decodeURI(pathname).match(rgx);
    let len=resultArr.length;
    let allBehind='';
    for(let j=i+1;j<len;j++){
        allBehind+=resultArr[j]
    }
    let path=getAllBehind?allBehind:resultArr[i];
    return path?path.substr(1):'';
}


function checkType(obj){
    let os=Object.prototype.toString;
    if(os.call(obj)==='[object Object]'){return 'object'}
    if(os.call(obj)==='[object Array]'){return 'array'}
    return 'other';
}
function newObjAdd(newObj,path,value){
    if(path.length===1){
        newObj[path[0]]=value
    }else{
        newObj[path[0]]=deepSet({},path.slice(1),value,true)
    }
}
/**
 * 有则改，无则加（immutable）
 * @param obj:*
 * @param path:[]
 * @param value:*
 * @param objIsNewObj:boolean
 * @returns {*}
 */
export function deepSet(obj,path,value,objIsNewObj){
    if(path.length<1){
        return value;
    }
    let newObj;
    if(objIsNewObj){
        newObj=obj;
        newObjAdd(newObj,path,value)
    }else{
        const keys=Object.keys(obj),type=checkType(obj);
        if(type==='array'){
            newObj=[]
        }else if(type==='object'){
            newObj={}
        }else{
            return value
        }
        if(keys.length>0) {
            keys.forEach(key=>{
                if(key==path[0]){
                    newObj[path[0]]=deepSet(obj[key],path.slice(1),value)
                }else{
                    newObj[key]=obj[key]
                }
            });
            if(obj[path[0]]===undefined){
                newObjAdd(newObj,path,value)
            }
        }else{
            newObjAdd(newObj,path,value)
        }
    }
    return newObj
}

export function shallowEqual(obj1,obj2){
    for(let key in obj1){
        if(obj1.hasOwnProperty(key)){
            if(obj1[key]!==obj2[key]){
                return false;
            }
        }
    }
    return true;
}

/**
 * 深比较
 * @param obj1
 * @param obj2
 * @returns {boolean}
 */
export function deepEqual(obj1,obj2){
    let os=Object.prototype.toString,result=true;
    for(let key in obj1){
        if(obj1.hasOwnProperty(key)){
            if(os.call(obj1[key])==='[object Array]' && os.call(obj2[key])==='[object Array]'){
                if(obj1[key].length!==obj2[key].length){ return false}
                result=deepEqual(obj1[key],obj2[key])
            }else if(os.call(obj1[key])==='[object Object]' && os.call(obj2[key])==='[object Object]'){
                if(Object.keys(obj1[key]).length!==Object.keys(obj2[key]).length){ return false}
                result=deepEqual(obj1[key],obj2[key])
            }else if(typeof obj1[key]==='function' && typeof obj2[key]==='function'){
                if(obj1[key].toString()!==obj2[key].toString()){
                    return false
                }
            }else if(Number.isNaN(obj1[key]) && Number.isNaN(obj2[key])){
                result=true;
            }else if(obj1[key]!==obj2[key]){
                return false;
            }
            if(!result){
                return false;
            }
        }
    }
    return true
}

/*菜单方法*/
export const sortMethod=(sort,navArr)=>{
    let needSortArr=navArr.slice(),
        numSortFunc=(a,b)=>{
        return b[sort]-a[sort]
    },
        stringSortFunc=(a,b)=>{
            if(b[sort]<a[sort]){
                return 1
            }else if (b[sort]>a[sort]){
                return -1
            }else{
                return 0
            }
        },
        sortArr=null;
    if(needSortArr[0]){
        if(typeof needSortArr[0][sort]==='number'){
            //console.time(1)
            sortArr=needSortArr.sort(numSortFunc)
            //quickSort(needSortArr,numSortFunc)
            //sortArr=needSortArr
            //console.timeEnd(1)
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



function clearWhich(unSub){
    if(!unSub){return}
    unSub.unsubscribe? unSub.unsubscribe(): clearTimeout(unSub)

}
export function clearFunc(unSubObj){
        for(let i in unSubObj){
            clearWhich(unSubObj[i])
        }
}



export function calcColorBallNewPosition(line,whichLine,v,curTimeGap,isSmallScreen){
    let newObj;
    const numberWhichLine=parseInt(whichLine,10)
    let rightWhichLine=(numberWhichLine>0 && numberWhichLine<line);
    let lastLine=(whichLine==='last'|| numberWhichLine===line);
    let errorOrComplete=(v==='error'|| v==='complete');
    if(rightWhichLine){
        newObj = Object.assign(getArgument(v,curTimeGap,isSmallScreen), {top: numberWhichLine * EACHLINEGAP})
    }else if(!rightWhichLine && !errorOrComplete && !lastLine){
        newObj = getArgument(v,curTimeGap,isSmallScreen)
    }else{
        newObj = Object.assign(getArgument(v,curTimeGap,isSmallScreen), {top: line * EACHLINEGAP + 63})
    }
    return newObj
}

function getArgument(v,curTimeGap,isSmallScreen){
    // console.time(1)
    let obj={};
    let os=Object.prototype.toString
    let left=curTimeGap/1000*(isSmallScreen ? distanceEachSec*0.6 : distanceEachSec);
    if(v==="complete") {
        obj={
            data:v,
            text:'com',
            left:left+20,
        }
        // obj.data=v;obj.text='com';obj.left=left+20;
    } else if(v==="error") {
        obj={
            data:v,
            text:'err',
            left:left+20,
        }
        // obj.data=v;obj.text='err';obj.left=left+20;
    } else if(typeof v==='number') {
        obj={
            data:v,
            text:v,
            background:'blue',
            left:left,
            top:EACHLINEGAP*2,
            color:'#fff'
        }
        // obj.data=v;obj.text=v;obj.background='blue';obj.left=left;obj.top=EACHLINEGAP*2;obj.color='#fff';
    } else if(typeof v==='string') {
        obj={
            data:v,
            text:v,
            background:'green',
            left:left,
            top:EACHLINEGAP*2,
            color:'#000'
        }
        // obj.data=v;obj.text=v;obj.background='green';obj.left=left;obj.top=EACHLINEGAP*2;obj.color='#000';
    } else if(typeof v==='object' && os.call(v).indexOf("Event")!==-1) {
        obj={
            data:v,
            text:'ev',
            background:'yellow',
            left:left,
            top:EACHLINEGAP,
            color:'#000'
        }
        // obj.data=v;obj.text='ev';obj.background='yellow';obj.left=left;obj.top=EACHLINEGAP;obj.color='#000';
    } else if(typeof v==='object' && os.call(v)==='[object Object]') {
        obj={
            data:v,
            text:'obj',
            background:'purple',
            left:left,
            top:EACHLINEGAP,
            color:'#fff'
        }
        // obj.data=v;obj.text='obj';obj.background='purple';obj.left=left;obj.top=EACHLINEGAP;obj.color='#fff';
    } else if(typeof v==='object' && os.call(v)==='[object Array]') {
        obj={
            data:v,
            text:'arr',
            background:'orange',
            left:left,
            top:EACHLINEGAP,
            color:'#fff'
        }
        // obj.data=v;obj.text='arr';obj.background='orange';obj.left=left;obj.top=EACHLINEGAP;obj.color='#fff';
    }
    // console.timeEnd(1)
    return obj
}
/*对code方法*/

/**
 * 根据 ; 分割
 * ; 后面可以跟 至少一个换行|任意空位符+Rx起头的变量名|任意\w后面接着(符号
 */
export function code2Obj(code){
    //console.time(1)
    var curFuncStr=code+'',
        rawArr=curFuncStr.split(/\s+\/\/editArea\s+/),
        rawCodeStr=rawArr[1] ?
            rawArr[1].replace(/;(\n+|\s*Rx[^.;=(),+\s]+|\s*\w+\$?\s*=[^)]*\()/g,";;$1")
                .replace(/\B\s\B/g,'')
                .replace(/({.*);;(.*})/g,'$1;$2') :
            null,
        arr=rawCodeStr?rawCodeStr.split(/;;/g):rawArr[0]==='无数据'?[]:rawArr,
        str=rawCodeStr?rawCodeStr.replace(/;;(\n?)/g,'$1'==='\n'?';':';\n'):rawArr[0]==='无数据'?'':rawArr[0];
    //console.log(rawCodeStr)
    //console.timeEnd(1)
    return {str,arr}
};
// function unique(arr){
//    var unqiue=[]
//    for(var i=0,len=arr.length;i<len;i++){
//        if(arr.indexOf(arr[i])===i){
//            unqiue.push(arr[i])
//        }
//    }
//    return unqiue
//}


//todo lodash 优化
export function calcCodeStrArrPlusMinus(code,prevCodeArr){
    const codeObj=code2Obj(code),
        str=codeObj.str,
        arr=codeObj.arr,
        curLen=codeObj.arr.length,
        preLen=prevCodeArr.length,
        minus=uniq(arr.concat(prevCodeArr)).slice(curLen),
        plus=uniq(prevCodeArr.concat(arr)).slice(preLen);
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

/**
 * true &=true      //1
 * true &=false     //0
 * true &=undefined //0
 * true &=null      //0
 */
export function checkDidAllunSub(unSubMarble,unSubResult){
    //console.time(1)
    let flagMarble=true;
    let flagResult=true;
    for(let i in unSubMarble){
        if(unSubMarble[i].isStopped!==undefined){
            flagMarble &=unSubMarble[i].isStopped
            if(flagMarble===0){
                break;
            }
        }
    }
    for(let i in unSubResult){
        if(unSubResult[i].isStopped!==undefined){
            flagResult &=unSubResult[i].isStopped
            if(flagResult===0){
                break;
            }
        }
    }
    //console.timeEnd(1)
    return flagMarble && flagResult
}

export function subscriberToSimpleObj(unSubObj){
    let obj={};
    Object.keys(unSubObj).forEach(e=>{
        if(unSubObj[e]){
            obj[e]={};
            obj[e].status=unSubObj[e].status;
            obj[e].isStopped=unSubObj[e].isStopped;
        }
    })
    return obj;
}





export function changeStatus(status,force){
    if(force || !this.isStopped){
        this.status=status
    }
}

/**
 * allShow为true时，先删除所有subscribe，再订阅存在的Rx变量
 * @param code
 * @param allShow
 * @returns {{showInWhereArr: *, newCode: *}}
 */
export function getSubPositionFromCode(code,allShow){
    let finalCode=code, reCalc=false;

    function calcResultArr(){
        let resultArr=[];
        const codeArea=finalCode.split(/\s+\/\/editArea\s+/);
        const editArea=codeArea[1]||'';
        const variables=uniq(editArea.match(/Rx[^.;=(),+\s]+\b/g)) || [];
        if(allShow && !reCalc){
            const subscribeArea=codeArea[2]||'';
            finalCode=finalCode.replace(subscribeArea,'');
        }
        reCalc=false;
        variables.forEach((e,i)=>{
            let obj={};
            const subArr=finalCode.match(new RegExp('(mar|res)Sub.'+e+'[^.]+'+'.subscribe.*','g')) ||[];
            const subStr=subArr.join('');
            const matchArr=subStr.match(/^(?:mar|res)Sub.(Rx[^.;=(),+\s]+\b)\s*=.*?showInMar\s*,?\s*'?(\d|last)?'?/) || [];
            obj.name=matchArr[1] || e;
            obj.showInMar=subStr.indexOf('showInMar')!==-1;
            obj.showInRes=subStr.indexOf('showInRes')!==-1;
            obj.line=allShow?i+1:matchArr[2]||1;
            if((!obj.showInMar ) && allShow){
                finalCode=addSubscribe(finalCode,obj.name,obj.line,'showInMar')
                if(obj.line===variables.length){
                    finalCode=addSubscribe(finalCode,obj.name,null,'showInRes')
                }
                reCalc=true
            }
            resultArr.push(obj)
        });
        if(reCalc){
            resultArr=calcResultArr()
        }
//console.log(resultArr)
        return resultArr
    }
    //console.time(1)
    return  {
        showInWhereArr:uniqWith(calcResultArr(code), (a,b)=>{
            if(a.name===b.name){
                a.showInRes=b.showInRes=a.showInRes||b.showInRes;
                a.showInMar=b.showInMar=a.showInMar || b.showInMar;
                a.line=b.line=a.line||b.line
            }
            return a.name===b.name
        }),
        newCode:finalCode
    };
    //console.timeEnd(1)
    //return a
}
export function delSubscribe(code,name,key){
    let regExp;
    regExp=new RegExp(`${key==='showInMar'?'marSub':'resSub'}.${name}.*?subscribe.*?${key}.*?;\n`)
    return code.replace(regExp,'')
}
export function addSubscribe(code,name,line,key){
    let newCode=code;
    switch(key){
        case 'showInMar':
            newCode+=`marSub.${name}=${name}.subscribe(NEC(showInMar,'${line}'));\n`
            break;
        case 'showInRes':
            newCode+=`resSub.${name}=${name}.subscribe(NEC(showInRes));\n`
            break;
        default:
            return;
    }
    return newCode
}

export function changeLine(code,name,newLine){
    let regExp;
    regExp=new RegExp(`(marSub.${name}.*?subscribe.*?showInMar.*?)([0-9]|last)(.*?;)`)
    return code.replace(regExp,'$1'+newLine+'$3')
}