
import Rx from 'rxjs/Rx';

let count=0
let _deepList=[];

export  const shallowList=[
    {shallowTitle:'最高点击',sort:'clicks'},
    {shallowTitle:'常用操作符',sort:'useful'},
    {shallowTitle:'全部(字母顺序)',sort:'name'}
];

//export const deepList=[
//    {id:1,name:'concatAll',clicks:45,useful:999},
//    {id:2,name:'switchMap',clicks:43,useful:1},
//    {id:3,name:'mergeMap',clicks:644,useful:453},
//    {id:4,name:'distinct',clicks:425,useful:211},
//    {id:5,name:'throttleTime',clicks:123,useful:782}
//]



export const Data=[
    {
        name:'concatAll',
        title:'concatAll：将高阶observable(类似obs$.map(obs2$))转换成一阶observable',
        caption:'说明：少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所',
        clicks:762,
        useful:875,
        line:2,
        marbleText:'concatAll',
        code:`//cut
                let obs$,obs2$,ho,count;
                obs$ = Rx.Observable.fromEvent(document,'click');
                obs2$ = Rx.Observable.interval(1000).take(3);
                ho = obs$.map(ev=>obs2$);
                count = ho.concatAll();
                this.unSub.a=count.subscribe(v=>showRxjsInResult(v))
                //cut`,

        func:function(showRxjsInResult,showRxjsInMarble){
            let obs$,obs2$,ho,count;
            //obs$ = Rx.Observable.of(1,2,3,4,5);
            obs$ = Rx.Observable.fromEvent(document,'click');
            obs2$ = Rx.Observable.interval(1000).take(3);
            ho = obs$.map(ev=>obs2$);
            count = ho.concatAll();
            //count = Rx.Observable.of(1,2,3,4,5);
            this.unSubResult.result1=count.subscribe(v=>showRxjsInResult(v))
            this.unSubMarble.line1=obs$.subscribe(v=>showRxjsInMarble(v,1));
            this.unSubMarble.line2=count.subscribe(v=>showRxjsInMarble(v,2));
        }
    },
    {
        name:'mergeMap',
        title:'2、mergeMap:将高阶observable(类似obs$.map(obs2$))转换成一阶observable',
        caption:'',
        clicks:1235,
        useful:451,
        line:3,
        marbleText:'mergeMap',
        code:``,
        func:function(showRxjsInResult,showRxjsInMarble){

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

export let deepList=_deepList