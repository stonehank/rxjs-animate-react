import {Data,notFoundData,deepList,shallowList} from './mock-data'
//import Rx from 'rxjs/Rx';
import {uniqWith,uniq} from 'lodash'
const LINETOP=30


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


function clearWhich(unSub){
    if(!unSub){return}
    unSub.unsubscribe? unSub.unsubscribe(): clearTimeout(unSub)

}
export function clearFunc(unSubObj){
        for(let i in unSubObj){
            clearWhich(unSubObj[i])
        }
}



export function calcColorBallNewPosition(line,whichLine,v,curTimeGap){
    let newObj;
    const numberWhichLine=parseInt(whichLine,10)
    let rightWhichLine=(numberWhichLine>0 && numberWhichLine<line);
    let lastLine=(whichLine==='last'|| numberWhichLine===line);
    let errorOrComplete=(v==='error'|| v==='complete');
    if(rightWhichLine){
        newObj = Object.assign(getArgument(v,curTimeGap), {top: numberWhichLine * LINETOP})
    }else if(!rightWhichLine && !errorOrComplete && !lastLine){
        newObj = getArgument(v,curTimeGap)
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
    if(v==="complete") {
        obj.data=v;obj.text='com';obj.background='#008f0f';obj.left=left+20;obj.color='lightgreen';obj.fontWeight='bold';obj.letterSpacing='-1.5px';
    } else if(v==="error") {
        obj.data=v;obj.text='err';obj.background='red';obj.left=left+20;obj.color='#fff';obj.fontWeight='bold';
    } else if(typeof v==='number') {
        obj.data=v;obj.text=v;obj.background='blue';obj.left=left;obj.top=LINETOP*2;obj.color='#fff';
    } else if(typeof v==='string') {
        obj.data=v;obj.text=v;obj.background='green';obj.left=left;obj.top=LINETOP*2;obj.color='#000';
    } else if(typeof v==='object' && ts.call(v).indexOf("Event")!==-1) {
        obj.data=v;obj.text='ev';obj.background='yellow';obj.left=left;obj.top=LINETOP;obj.color='#000';
    } else if(typeof v==='object' && ts.call(v)==='[object Object]') {
        obj.data=v;obj.text='obj';obj.background='purple';obj.left=left;obj.top=LINETOP;obj.color='#fff';
    } else if(typeof v==='object' && ts.call(v)==='[object Array]') {
        obj.data=v;obj.text='arr';obj.background='orange';obj.left=left;obj.top=LINETOP;obj.color='#fff';
    }
    return obj
}


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

export function checkDidAllunSub(unSubMarble,unSubResult){
    //console.time(1)
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
            const subArr=finalCode.match(new RegExp(e+'.subscribe.*','g')) ||[];
            const subStr=subArr.join('');
            const matchArr=subStr.match(/(^Rx[^.;=(),+\s]+\b).*showInMar\s*,?\s*'?(\d|last)?'?/) || [];
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