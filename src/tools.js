import {Data,notFoundData,deepList} from './mock-data'
export function fetchData(operatorName){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            let findData=Data.find(obj=>obj.name===operatorName)
            if(!findData){return resolve(notFoundData)}

            return resolve(findData)
        },1000)
    })

}


export function fetchNav(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            return resolve(deepList)
        },1000)
    })
}


export function getArgument(v,timeStamp){
    let obj={};
    let curTimeStamp=new Date().getTime();
    let timeGap=250;
    let distanceEachSec=50;
    let curTimeGap=curTimeStamp-timeStamp;
    //curTimeGap=curTimeGap<timeGap?timeGap:curTimeGap
    //curTimeGap=needGap?(curTimeGap+timeGap):curTimeGap;
    let left=curTimeGap/1000*distanceEachSec;
    if(typeof v==='object' && Object.prototype.toString.call(v).indexOf("Event")!==-1){obj.timeStamp=curTimeStamp;obj.data=v;obj.text='ev';obj.background='yellow';obj.left=left;obj.top=50;obj.color='#000';}
    if(typeof v==='object' && Object.prototype.toString.call(v)==='[object Object]'){obj.timeStamp=curTimeStamp;obj.data=v;obj.text='obj';obj.background='red';obj.left=left;obj.top=50;obj.color='#fff';}
    if(typeof v==='object' && Object.prototype.toString.call(v)==='[object Array]'){obj.timeStamp=curTimeStamp;obj.data=v;obj.text='obj';obj.background='orange';obj.left=left;obj.top=50;obj.color='#fff';}
    if(typeof v==='number'){obj.timeStamp=curTimeStamp;obj.data=v;obj.text=v;obj.background='blue';obj.left=left;obj.top=100;obj.color='#fff';}
    if(typeof v==='string'){obj.timeStamp=curTimeStamp;obj.data=v;obj.text=v;obj.background='green';obj.left=left;obj.top=100;obj.color='#000';}
    return obj
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

export function code2Arr(code){
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
function createMinus(minus){
    var minusArr=  minus && minus.length>0?
        minus.map(function(e){
            return `<p class="minus">${e}</p>`
        }):''
    return minusArr?minusArr.join(''):minusArr;
}
function createPlus(plus){
    var plusArr=  plus && plus.length>0?
        plus.map(function(e){
            return `<p class="plus">${e}</p>`
        }):'';
    return plusArr?plusArr.join(''):plusArr;
}


function clearWhich(unSub){
    if(!unSub){return}
    unSub.unsubscribe? unSub.unsubscribe(): clearTimeout(unSub)

}
export function clearFunc(unSubObj){
    console.time('aaa')
        for(let i in unSubObj){
            clearWhich(unSubObj[i])
        }
    console.timeEnd('aaa')
}

/**
 * 返回值为true 则未订阅
 * 返回值为false 则已订阅
 * @param unSubObj
 * @returns {*}
 */
export function checkIsUnSub(unSubObj){
    for(let i in unSubObj){
        if(unSubObj[i]){
            if(unSubObj[i].isStopped!==unSubObj[i].closed){
                console.error('isStopped和closed属性不一致，检查unSub当前状态')
            }
           return unSubObj[i].isStopped
        }
    }
}