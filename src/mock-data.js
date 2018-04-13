
import Rx from 'rxjs/Rx';

let count=0
let _deepList=[];

export  const shallowList=[
    {shallowTitle:'最高点击',sort:'clicks',pathname:'hits'},
    {shallowTitle:'常用操作符',sort:'useful',pathname:'useful'}
    //{shallowTitle:'全部(字母顺序)',sort:'name'}
];



/*
 * 规则：
 * 一、this.unSubMarble 的命名 都要带上Rx，再以具体的Observable命名
 * 以事件名称命名例如：this.unSubMarble.RxClick
 * 自发数据命名例如：this.unSubMarble.RxInterval,this.unSubMarble.RxOf
 *
 *
 * 二、使用NEC(next,error,complete)方法创建回调，
 * 参数1 表示要显示的方法
 * 参数2 表示要显示的行数
 */


/*


* */


export const Data=[
    {
        name:'audit',
        title:'audit:等待时间由另一个observable决定，不会立刻发送第一个源',
        caption:'说明：'+'点击后会立刻输出最新值，此处是1秒内任意多次点击也只发出1次值，<font color="#8d8d8d">跟debounce很像，暂时未弄清楚区别?</font>' +
        '第二行为timer的行动（可以忽略），第三行为结果数据输出行，结合第二行可以更清楚的看出结果数据来源',
        clicks:762,
        useful:875,
        line:3,
        marbleText:'audit',
        code:`  //cut
               let RxTimer0_1000,RxClick,RxThrottle;
            RxTimer0_1000 =  Rx.Observable.timer(0,1000);
            RxClick =Rx.Observable.fromEvent(document,'click');
            RxThrottle = RxTimer0_1000.audit(()=>RxClick);
            //cut
         `,
        func:function(showRxjsInResult,showRxjsInMarble){
            let RxTimer0_1000,RxClick,RxAudit;
            RxTimer0_1000 =  Rx.Observable.timer(0,1000).take(13);
            RxClick =Rx.Observable.fromEvent(document,'click');
            RxAudit = RxTimer0_1000.audit(()=>RxClick);

            this.unSubResult.RxAudit=RxAudit.subscribe(NEC(showRxjsInResult))
            this.unSubMarble.RxClick=RxClick.subscribe(NEC(showRxjsInMarble,1));
            this.unSubMarble.RxTimer0_1000=RxTimer0_1000.subscribe(NEC(showRxjsInMarble,2));
            this.unSubMarble.RxAudit=RxAudit.subscribe(NEC(showRxjsInMarble,'last'));
        }
    },
    {
        name:'debounce',
        title:'debounce:等待时间由另一个observable决定，不会立刻发送第一个源',
        caption:'说明：'+'点击后会立刻输出最新值，而不像throttle等待下一次的最新值，此处是1秒内任意多次点击也只发出1次值，' +
        '第二行为timer的行动（可以忽略），第三行为结果数据输出行，结合第二行可以更清楚的看出结果数据来源',
        clicks:762,
        useful:875,
        line:3,
        marbleText:'debounce',
        code:`  //cut
               let RxTimer0_1000,RxClick,RxThrottle;
            RxTimer0_1000 =  Rx.Observable.timer(0,1000);
            RxClick =Rx.Observable.fromEvent(document,'click');
            RxThrottle = RxTimer0_1000.debounce(()=>RxClick);
            //cut
         `,
        func:function(showRxjsInResult,showRxjsInMarble){
            let RxTimer0_1000,RxClick,RxDebounce;
            RxTimer0_1000 =  Rx.Observable.timer(0,1000).take(13);
            RxClick =Rx.Observable.fromEvent(document,'click');
            RxDebounce = RxTimer0_1000.debounce(()=>RxClick);

            this.unSubResult.RxDebounce=RxDebounce.subscribe(NEC(showRxjsInResult))
            this.unSubMarble.RxClick=RxClick.subscribe(NEC(showRxjsInMarble,1));
            this.unSubMarble.RxTimer0_1000=RxTimer0_1000.subscribe(NEC(showRxjsInMarble,2));
            this.unSubMarble.RxDebounce=RxDebounce.subscribe(NEC(showRxjsInMarble,'last'));
        }
    },
    {
        name:'throttle',
        title:'throttle:等待时间由另一个observable决定，立刻发送第一个源',
        caption:'说明：'+'点击后不立刻发出，而是会等下一个发射源，再发射出去，此处是1秒内任意多次点击也只发出1次值，' +
        '第二行为timer的行动（可以忽略），第三行为结果数据输出行，结合第二行可以更清楚的看出结果数据来源',
        clicks:762,
        useful:875,
        line:3,
        marbleText:'throttle',
        code:`  //cut
               let RxTimer0_1000,RxClick,RxThrottle;
            RxTimer0_1000 =  Rx.Observable.timer(0,1000);
            RxClick =Rx.Observable.fromEvent(document,'click');
            RxThrottle = RxTimer0_1000.throttle(()=>RxClick);
            //cut
         `,
        func:function(showRxjsInResult,showRxjsInMarble){
            let RxTimer0_1000,RxClick,RxThrottle;
            RxTimer0_1000 =  Rx.Observable.timer(0,1000).take(13);
            RxClick =Rx.Observable.fromEvent(document,'click');
            RxThrottle = RxTimer0_1000.throttle(()=>RxClick);

            this.unSubResult.RxThrottle=RxThrottle.subscribe(NEC(showRxjsInResult))
            this.unSubMarble.RxClick=RxClick.subscribe(NEC(showRxjsInMarble,1));
            this.unSubMarble.RxTimer0_1000=RxTimer0_1000.subscribe(NEC(showRxjsInMarble,2));
            this.unSubMarble.RxThrottle=RxThrottle.subscribe(NEC(showRxjsInMarble,'last'));
        }
    },
    {
        name:'auditTime',
        title:'auditTime:类似throttleTime，收到第一个源不会立刻发送最新值，而是等待间隔时间后发送最新值',
        caption:'说明：'+'此处最后一行不论点击多少次会等1秒才会发送最新值',
        clicks:762,
        useful:875,
        line:2,
        marbleText:'auditTime',
        code:`  //cut
              let RxClick,RxDebounceTime;
                RxClick =Rx.Observable.fromEvent(document,'click');
                RxDebounceTime = RxClick.auditTime(1000);
            //cut
         `,
        func:function(showRxjsInResult,showRxjsInMarble){
            let RxClick,RxAuditTime;
            RxClick =Rx.Observable.fromEvent(document,'click');
            RxAuditTime = RxClick.auditTime(1000)
            this.unSubResult.RxAuditTime=RxAuditTime.subscribe(NEC(showRxjsInResult))
            this.unSubMarble.RxClick=RxClick.subscribe(NEC(showRxjsInMarble,1));
            this.unSubMarble.RxAuditTime=RxAuditTime.subscribe(NEC(showRxjsInMarble,'last'));
        }
    },
    {
        name:'throttleTime',
        title:'throttleTime:有click就取消上一次的，这里间隔时间最多1秒，收到第一个源立刻发送',
        caption:'说明：'+'此处最后一行一旦有点击立刻会发出一个事件',
        clicks:762,
        useful:875,
        line:2,
        marbleText:'throttleTime',
        code:`  //cut
              let RxClick,RxDebounceTime;
                RxClick =Rx.Observable.fromEvent(document,'click');
                RxDebounceTime = RxClick.throttleTime(1000);
            //cut
         `,
        func:function(showRxjsInResult,showRxjsInMarble){
            let RxClick,RxThrottleTime;
            RxClick =Rx.Observable.fromEvent(document,'click');
            RxThrottleTime = RxClick.throttleTime(1000)
            this.unSubResult.RxThrottleTime=RxThrottleTime.subscribe(NEC(showRxjsInResult))
            this.unSubMarble.RxClick=RxClick.subscribe(NEC(showRxjsInMarble,1));
            this.unSubMarble.RxThrottleTime=RxThrottleTime.subscribe(NEC(showRxjsInMarble,'last'));
        }
    },
    {
        name:'debounceTime',
        title:'debounceTime:有click就取消上一次的，间隔时间可超过1秒，最后发送最新值',
        caption:'说明：'+'最后一行为实际发出的事件',
        clicks:762,
        useful:875,
        line:2,
        marbleText:'debounceTime',
        code:`  //cut
              let RxClick,RxDebounceTime;
                RxClick =Rx.Observable.fromEvent(document,'click');
                RxDebounceTime = RxClick.debounceTime(1000);
            //cut
         `,
        func:function(showRxjsInResult,showRxjsInMarble){
            let RxClick,RxDebounceTime;
            RxClick =Rx.Observable.fromEvent(document,'click');
            RxDebounceTime = RxClick.debounceTime(1000)
            this.unSubResult.RxDebounceTime=RxDebounceTime.subscribe(NEC(showRxjsInResult))
            this.unSubMarble.RxClick=RxClick.subscribe(NEC(showRxjsInMarble,1));
            this.unSubMarble.RxDebounceTime=RxDebounceTime.subscribe(NEC(showRxjsInMarble,'last'));
        }
    },
    {
        name:'concatMap',
        title:'concatMap:先转换成高阶observable（map），再转换成一阶observable',
        caption:'说明：此处累计click的次数，然后按顺序依次执行',
        clicks:762,
        useful:875,
        line:2,
        marbleText:'concatMap',
        code:`  //cut
              let RxClick,RxInterval,RxConcatMap;
            RxClick = Rx.Observable.fromEvent(document,'click').take(3);
            RxInterval = Rx.Observable.interval(1000).take(3);
            RxConcatMap = RxClick.concatMap(ev=>RxInterval);
            //cut
         `,
        func:function(showRxjsInResult,showRxjsInMarble){
            let RxClick,RxInterval,RxConcatMap;
            RxClick = Rx.Observable.fromEvent(document,'click').take(3);
            RxInterval = Rx.Observable.interval(1000).take(3);
            RxConcatMap = RxClick.concatMap(ev=>RxInterval);
            this.unSubResult.RxConcatMap=RxConcatMap.subscribe(NEC(showRxjsInResult))
            this.unSubMarble.RxClick=RxClick.subscribe(NEC(showRxjsInMarble,1));
            this.unSubMarble.RxConcatMap=RxConcatMap.subscribe(NEC(showRxjsInMarble,'last'));
        }
    },
    {
        name:'concatAll',
        title:'concatAll：将高阶observable(类似obs1$.map(obs2$))转换成一阶observable',
        caption:'说明：此处所展示效果相当于使用了concatMap，此处用的是先map 后concatAll',
        clicks:762,
        useful:875,
        line:2,
        marbleText:'concatAll',
        code:`//cut
            let RxClick,RxInterval,highOrder,RxConcatAll;
            RxClick = Rx.Observable.fromEvent(document,'click');
            RxInterval = Rx.Observable.interval(1000).take(3);
            highOrder = RxClick.map(ev=>RxInterval);
            RxConcatAll = highOrder.concatAll();
                //cut`,

        func:function(showRxjsInResult,showRxjsInMarble){
            let RxClick,RxInterval,highOrder,RxConcatAll;
            RxClick = Rx.Observable.fromEvent(document,'click');
            RxInterval = Rx.Observable.interval(1000).take(3);
            highOrder = RxClick.map(ev=>RxInterval);
            RxConcatAll = highOrder.concatAll();
            this.unSubResult.RxConcatAll=RxConcatAll.subscribe(NEC(showRxjsInResult))
            this.unSubMarble.RxClick=RxClick.subscribe(NEC(showRxjsInMarble,1));
            this.unSubMarble.RxConcatAll=RxConcatAll.subscribe(NEC(showRxjsInMarble,'last'));
        }
    },
    {
        name:'concat',
        title:'concat:将2个源按顺序合并,点击3次鼠标后合并interval',
        caption:'',
        clicks:1235,
        useful:451,
        line:2,
        marbleText:'concat',
        code:` //cut
    let RxClick,RxInterval,RxConcat;
            RxClick = Rx.Observable.fromEvent(document,'click').take(3);
            RxInterval = Rx.Observable.interval(1000).take(3);
            RxConcat = RxClick.concat(RxInterval);
    //cut`,
        func:function(showRxjsInResult,showRxjsInMarble){
            let RxClick,RxInterval,RxConcat;
            RxClick = Rx.Observable.fromEvent(document,'click').take(3);
            RxInterval = Rx.Observable.interval(1000).take(3);
            RxConcat = RxClick.concat(RxInterval);
            this.unSubResult.RxConcat=RxConcat.subscribe(NEC(showRxjsInResult))
            this.unSubMarble.RxClick=RxClick.subscribe(NEC(showRxjsInMarble,1));
            this.unSubMarble.RxConcat=RxConcat.subscribe(NEC(showRxjsInMarble,'last'))
        }

    }
]
export const notFoundData={
    title:'无数据',
    name:'无数据',
    caption:'无数据',
    code:'无数据',
    line:0,
    marbleText:''
}


function fillDeepList(){
    for(var i=0;i<Data.length;i++){
        let deepObj={
            id:count++,
            name:Data[i].name,
            clicks:Data[i].clicks,
            useful:Data[i].useful
        }
        _deepList.push(deepObj)
    }
    return _deepList;
}
_deepList=fillDeepList()

/*
* deepList=[
*   {id:1,name:xxx,clicks:1,useful:1},
*   {id:2,name:xxx,clicks:5,useful:21},
*   {id:3,name:xxx,clicks:2341,useful:541}
* ]
*
*
*
*/


export let deepList=_deepList

function NEC(showInWhere,whichLine){
    return {
        next:(v)=>{showInWhere(v,whichLine)},
        error:()=>{showInWhere('error',whichLine)},
        complete:()=>{showInWhere('complete',whichLine)}
    }
}
